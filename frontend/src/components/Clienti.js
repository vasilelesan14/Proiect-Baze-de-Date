import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Button, Paper, TableContainer, Alert } from '@mui/material';
import { CustomTextField, StyledTableHeadCell, StyledTableRow, StyledTableHead, customFormatDate } from './CustomElements';

const Clienti = () => {
  const [clienti, setClienti] = useState([]);
  const [nume, setNume] = useState('');
  const [prenume, setPrenume] = useState('');
  const [telefon, setTelefon] = useState('');
  const [email, setEmail] = useState('');
  const [adresa, setAdresa] = useState('');
  const [id_client, setClientId] = useState('');
  const [error, setError] = useState(null);

  //Obtinerea datelor strict din tabela clienti
  /*useEffect(() => {
    axios.get('http://localhost:5000/clienti')
      .then(response => setClienti(response.data))
      .catch(error => console.error(error));
  }, []);*/

  // Obtinerea datelor din tabela clienti si din tabela detalii_clienti
  useEffect(() => {
    axios.get('http://localhost:5000/Detalii_Clienti')
      .then((response) => setClienti(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Handle client addition
  const handleAddClient = () => {
    if (!nume || !prenume || !telefon || !email) {
      setError('Toate câmpurile trebuie completate.');
      return;
    }

    const newClient = { nume, prenume, telefon, email, adresa };

    axios.post('http://localhost:5000/Detalii_Clienti',{nume, prenume, telefon, email, adresa, id_client:id_client})
      .then((response) => {
        setClienti([...clienti, { nume, prenume, telefon, email, adresa, id_client:id_client}]);
        setNume('');
        setPrenume('');
        setTelefon('');
        setEmail('');
        setAdresa('');
        setError(null);
        return axios.get('http://localhost:5000/Detalii_Clienti');
      })
      .then ((response) => setClienti(response.data))
      .catch((error) => {
        if (error.response && error.response.data.error) {
          alert(error.response.data.error); 
        } else {
          console.error(error);
        }
      });
  };

  return (
    <div
    style={{
      minHeight: '100vh',
      background: 'repeating-linear-gradient(to right, #D4ADFC 0%, #1D267D 100%)',
      padding: '20px',
      color: '#fff',
    }}>

    <div style={{ padding: '20px',paddingBottom: '60px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px',color: '#F7EFE5' }}>Adaugă Client</h1>
      {error && <Alert severity="error" style={{ marginBottom: '20px' }}>{error}</Alert>}
      <div style={{ paddingTop:'20px',display: 'flex', flexWrap: 'wrap', gap: '30px', marginBottom: '20px' }}>
        <CustomTextField 
          label="Nume" 
          value={nume} 
          onChange={(e) => setNume(e.target.value)} 
          fullWidth
        />
        <CustomTextField 
          label="Prenume" 
          value={prenume} 
          onChange={(e) => setPrenume(e.target.value)} 
          fullWidth 
        />
        <CustomTextField 
          label="Telefon" 
          value={telefon} 
          onChange={(e) => setTelefon(e.target.value)} 
          fullWidth 
        />
        <CustomTextField 
          label="Email" value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          fullWidth 
        />
        <CustomTextField 
          label="Adresă" 
          value={adresa} 
          onChange={(e) => setAdresa(e.target.value)} 
          fullWidth
        />
        <Button 
          variant="contained" 
          onClick={handleAddClient} 
          style={{ whiteSpace: 'nowrap', 
          height: '56px' }}>
          Adaugă Client
        </Button>
      </div>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <StyledTableHead>
            <TableRow>
              <StyledTableHeadCell>ID</StyledTableHeadCell>
              <StyledTableHeadCell>Nume</StyledTableHeadCell>
              <StyledTableHeadCell>Prenume</StyledTableHeadCell>
              <StyledTableHeadCell>Telefon</StyledTableHeadCell>
              <StyledTableHeadCell>Email</StyledTableHeadCell>
              <StyledTableHeadCell>Adresă</StyledTableHeadCell>
              <StyledTableHeadCell>Data înregistrării</StyledTableHeadCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {clienti.map((client, index) => (
              <StyledTableRow key={index}>
                <TableCell sx={{  textAlign: 'center'}}>{client[0]}</TableCell>
                <TableCell sx={{  textAlign: 'center'}}>{client[1]}</TableCell>
                <TableCell sx={{  textAlign: 'center'}}>{client[2]}</TableCell>
                <TableCell sx={{  textAlign: 'center'}}>{client[3]}</TableCell>
                <TableCell sx={{  textAlign: 'center'}}>{client[4]}</TableCell>
                <TableCell sx={{  textAlign: 'center'}}>{client[5]}</TableCell>
                <TableCell sx={{  textAlign: 'center'}}>{customFormatDate(client[6])}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </div>
  );
};

export default Clienti;
