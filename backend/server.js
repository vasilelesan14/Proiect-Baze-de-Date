const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexiunea la baza de date
async function getConnection() {
  return await oracledb.getConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECT_STRING,
  });
}

// Ruta pentru toate categoriile
app.get('/categorii', async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute(
      'SELECT * FROM categorii ORDER BY id_categorie DESC'
    );
    res.json(result.rows);
    await connection.close();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Ruta pentru adaugare categorie
app.post('/categorii', async (req, res) => {
  try {
    const { denumire } = req.body;
    const connection = await getConnection();
    const result = await connection.execute(
      `INSERT INTO categorii (denumire) 
      VALUES (:denumire) 
      RETURNING id_categorie INTO :id`,
      {denumire, id: {type: oracledb.NUMBER, dir: oracledb.BIND_OUT} },
      { autoCommit: true }
    );

    const newCategorie = {
      id: result.outBinds.id[0],
      denumire
    }

    res.status(201).json(newCategorie);
    await connection.close();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta pentru toate produsele
app.get('/produse', async(req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute(
      'SELECT * FROM produse ORDER BY id_categorie');
    res.json(result.rows);
    await connection.close();
  } catch(err){
    res.status(500).json({error: err.message});
  }
});
// Ruta pentru adaugare produs
app.post('/produse', async (req, res) => {
  try {
    const { nume, pret, stoc, id_categorie } = req.body;
    const connection = await getConnection();

    // Verifica daca ID-ul categoriei exista
    const categorieCheck = await connection.execute(
      `SELECT COUNT(*) AS COUNT FROM categorii WHERE id_categorie = :id`,
      [id_categorie]
    );

    if (categorieCheck.rows[0][0] === 0) {
      res.status(400).json({ error: 'ID-ul categoriei nu este valid.' });
      await connection.close();
      return;
    }

    // Adauga produsul daca ID-ul categoriei este valid
    await connection.execute(
      `INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES (:nume, :pret, :stoc, :id_categorie)`,
      { nume, pret, stoc, id_categorie },
      { autoCommit: true }
    );

    res.status(201).json({ message: 'Produs adaugat cu succes!' });
    await connection.close();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta pentru obtinerea tuturor clientilor si a detaliilor acestora
app.get('/Detalii_Clienti', async (req, res) => {
  try {
    const connection = await getConnection();
    const query = `
      SELECT c.id_client, c.nume, c.prenume, d.telefon, d.email, d.adresa, d.data_inregistrarii
      FROM clienti c
      LEFT JOIN detalii_clienti d ON c.id_client = d.id_client
      ORDER BY id_client DESC
    `;
    const result = await connection.execute(query);
    res.json(result.rows);
    await connection.close();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Ruta pentru adaugarea unui nou client si a detaliilor aferente
app.post('/Detalii_Clienti', async (req, res) => {
  try {
    const { nume, prenume, telefon, email, adresa } = req.body;
    const connection = await getConnection();

    // Verifica daca clientul exista exista
    const clientCheck = await connection.execute(
      `SELECT COUNT(*) AS COUNT FROM clienti WHERE nume = :nume AND prenume = :prenume`,
      [nume, prenume]
    );

    if (clientCheck.rows[0][0] > 0) {
      res.status(400).json({ error: 'Exista deja un client cu acest nume si acest prenume.' });
      await connection.close();
      return;
    }

    // Adauga clientul
    const clientResult = await connection.execute(
      `INSERT INTO clienti (nume, prenume) VALUES (:nume, :prenume) RETURNING id_client INTO :id_client`,
      { nume, prenume, id_client: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER } },
      { autoCommit: false }
    );

    const id_client = clientResult.outBinds.id_client[0];

    // Insereaza detaliile clientului folosind id-ul generat
    await connection.execute(
      `INSERT INTO detalii_clienti (telefon, email, adresa, data_inregistrarii, id_client) 
       VALUES (:telefon, :email, :adresa, SYSDATE, :id_client)`,
      { telefon, email, adresa, id_client },
      { autoCommit: true }
  );

    res.status(201).json({ message: 'Client adaugat cu succes!' });
    await connection.close();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta pentru obtinerea tuturor vanzarilor
app.get('/Vanzari', async (req, res) => {
  try {
    const connection = await getConnection();
    const query = `
      SELECT v.id_vanzare, v.data_vanzare, v.id_client,
             LISTAGG(p.nume, ', ') WITHIN GROUP (ORDER BY p.nume) AS produse_nume,
             LISTAGG(p.pret, ', ') WITHIN GROUP (ORDER BY p.nume) AS produse_pret
      FROM vanzari v
      LEFT JOIN produse_vanzari pv ON v.id_vanzare = pv.id_vanzare
      LEFT JOIN produse p ON pv.id_produs = p.id_produs
      GROUP BY v.id_vanzare, v.data_vanzare, v.id_client
      ORDER BY v.data_vanzare DESC
    `;

    const result = await connection.execute(query);
    
    //console.log(result.rows);

    if (result.rows && result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).json({ error: 'Nu s-au găsit vânzări.' });
    }
    
    await connection.close();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/vanzari', async (req, res) => {
  try {
    const { id_client, produse } = req.body;

    if (!id_client || !Array.isArray(produse) || produse.length === 0) {
      return res.status(400).json({ error: 'ID client si lista de produse sunt necesare.' });
    }

    const connection = await getConnection();

    // Adaug vanzarea si iau id-ul vanzarii
    const result = await connection.execute(
      `INSERT INTO vanzari (data_vanzare, id_client) VALUES (SYSDATE, :id_client) RETURNING id_vanzare INTO :id_vanzare`,
      { id_client, id_vanzare: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER } },
      { autoCommit: true }
    );

    const id_vanzare = result.outBinds.id_vanzare[0];

    // Inserează produsele asociate vânzării
    const produsePromises = produse.map((id_produs) =>
      connection.execute(
        `INSERT INTO produse_vanzari (id_produs, id_vanzare) VALUES (:id_produs, :id_vanzare)`,
        { id_produs: { val: id_produs, type: oracledb.NUMBER },
          id_vanzare: { val: id_vanzare, type: oracledb.NUMBER }},
        { autoCommit: true }
      )
    );

    await Promise.all(produsePromises);

    res.status(201).json({ message: 'Vanzare adaugata cu succes!', id_vanzare });

    await connection.close();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(process.env.PORT, () => {
  console.log(`Server pornit pe portul ${process.env.PORT}`);
});