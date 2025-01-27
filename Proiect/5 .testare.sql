--  ======      Vizualizarea datelor        ======

-- 1. Afisarea categoriilor si a produselor disponibile pentru fiecare categorie
SELECT c.denumire AS "Categorie", p.nume AS "Produs", p.pret AS "Pret", p.stoc AS "Stoc disponibil"
FROM categorii c
LEFT JOIN produse p ON c.id_categorie = p.id_categorie
ORDER BY c.denumire, p.nume;

-- 2. Afisarea clientilor si a detaliilor acestora
SELECT cl.nume AS "Nume", cl.prenume AS "Prenume", d.telefon AS "Telefon", d.email AS "Email", d.adresa AS "Adresa"
FROM clienti cl
JOIN detalii_clienti d ON cl.id_client = d.id_client
ORDER BY cl.nume;s

-- 3. Afisarea vanzarilor, a produselor incluse in acestea si a clientilor care au initiat vanzarea
SELECT v.data_vanzare AS "Data Vanzarii", cl.nume AS "Nume", cl.prenume AS "Prenume", p.nume AS "Produs", pv.id_produs AS "ID Produs"
FROM vanzari v
JOIN clienti cl ON v.id_client = cl.id_client
JOIN produse_vanzari pv ON v.id_vanzare = pv.id_vanzare
JOIN produse p ON pv.id_produs = p.id_produs
ORDER BY v.data_vanzare DESC;

-- 4. Afisarea produselor ce sunt in stoc si au pretul mai mare de 2000
SELECT p.nume AS "Produs", c.denumire AS "Categorie", p.pret AS "Pret", p.stoc AS "Stoc disponibil"
FROM produse p
INNER JOIN categorii c ON p.id_categorie = c.id_categorie
WHERE p.stoc > 0 AND p.pret > 1000;

-- 5. Afisarea produselor ce nu mai sunt in stoc
SELECT p.nume AS "Produs", c.denumire AS "Categorie", p.pret AS "Pret"
FROM produse p
INNER JOIN categorii c ON p.id_categorie = c.id_categorie
WHERE p.stoc = 0;

-- 6. Afisarea clientilor care au cumparat un set de tobe Mapex Mars Drum Set
SELECT c.nume AS "Nume", c.prenume AS "Prenume", v.data_vanzare AS "Data vanzare"
FROM clienti c
INNER JOIN vanzari v ON c.id_client = v.id_client
INNER JOIN produse_vanzari pv ON v.id_vanzare = pv.id_vanzare
INNER JOIN produse p ON pv.id_produs = p.id_produs
WHERE p.nume = 'Mapex Mars Drum Set';


--      ======      Validarea constrangerilor       ======

SET AUTOCOMMIT OFF;

--      Testare constrangere PK in tabela Clienti

 INSERT INTO clienti (id_client, nume, prenume) VALUES (500, 'Popescu', 'Ion');
--Error starting at line : 49 in command -
-- INSERT INTO clienti (id_client, nume, prenume) VALUES (500, 'Popescu', 'Ion')
--Error report -
--ORA-00001: unique constraint (BD026.CLIENTI_PK) violated

--      Testare constrangere PK in tabela Categorii

INSERT INTO categorii (id_categorie, denumire) VALUES (102, 'Acordeoane');
--Error starting at line : 56 in command -
--INSERT INTO categorii (id_categorie, denumire) VALUES (102, 'Acordeoane')
--Error report -
--ORA-00001: unique constraint (BD026.CATEGORII_PK) violated

--      Testare constrangere PK in tabela Produse

INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Chitara Benson', 145, 6, 104);
--Error starting at line : 56 in command -
--INSERT INTO categorii (id_categorie, denumire) VALUES (102, 'Acordeoane')
--Error report -
--ORA-00001: unique constraint (BD026.CATEGORII_PK) violated

--      Testare constrangere PK in tabela Vanzari

INSERT INTO vanzari(id_vanzare, data_vanzare, id_client) VALUES (1005, SYSDATE, 501);
--Error starting at line : 70 in command -
--INSERT INTO vanzari(id_vanzare, data_vanzare, id_client) VALUES (1005, SYSDATE, 501)
--Error report -
--ORA-00001: unique constraint (BD026.VANZARI_PK) violated

--      Testarea constrangerilor NN in tabela Categorii

INSERT INTO categorii (denumire) VALUES (NULL);
--Error starting at line : 77 in command -
--INSERT INTO categorii (denumire) VALUES (NULL)
--Error at Command Line : 77 Column : 42
--Error report -
--SQL Error: ORA-01400: cannot insert NULL into ("BD026"."CATEGORII"."DENUMIRE")

INSERT INTO categorii (id_categorie, denumire) VALUES (NULL,'Acordeoane');
--Error starting at line : 83 in command -
--INSERT INTO categorii (id_categorie, denumire) VALUES (NULL,'Acordeoane')
--Error at Command Line : 83 Column : 56
--Error report -
--SQL Error: ORA-01400: cannot insert NULL into ("BD026"."CATEGORII"."ID_CATEGORIE")

--      Testarea constrangerilor NN in tabela Produse

INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES (NULL, 21289, 10, 100);
--Error starting at line : 154 in command -
--INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES (NULL, 21289, 10, 100)
--Error at Command Line : 154 Column : 62
--Error report -
--SQL Error: ORA-01400: cannot insert NULL into ("BD026"."PRODUSE"."NUME")

INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Yamaha Recording Drum Set', NULL, 10, 100);
--Error starting at line : 161 in command -
--INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Yamaha Recording Drum Set', NULL, 10, 100)
--Error at Command Line : 161 Column : 91
--Error report -
--SQL Error: ORA-01400: cannot insert NULL into ("BD026"."PRODUSE"."PRET")

INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Yamaha Recording Drum Set', 21289, NULL, 100);
--Error starting at line : 168 in command -
--INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Yamaha Recording Drum Set', 21289, NULL, 100)
--Error at Command Line : 168 Column : 98
--Error report -
--SQL Error: ORA-01400: cannot insert NULL into ("BD026"."PRODUSE"."STOC")

INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Yamaha Recording Drum Set', 21289, 10, NULL);
--Error starting at line : 175 in command -
--INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Yamaha Recording Drum Set', 21289, 10, NULL)
--Error at Command Line : 175 Column : 102
--Error report -
--SQL Error: ORA-01400: cannot insert NULL into ("BD026"."PRODUSE"."ID_CATEGORIE")

INSERT INTO produse (id_produs, nume, pret, stoc, id_categorie) VALUES (NULL,'Yamaha Recording Drum Set', 21289, 10, 100);
--Error starting at line : 182 in command -
--INSERT INTO produse (id_produs, nume, pret, stoc, id_categorie) VALUES (NULL,'Yamaha Recording Drum Set', 21289, 10, 100)
--Error at Command Line : 182 Column : 73
--Error report -
--SQL Error: ORA-01400: cannot insert NULL into ("BD026"."PRODUSE"."ID_PRODUS")

--      Testarea Cinstrangerilor NN in tabela Clienti

 INSERT INTO clienti (id_client, nume, prenume) VALUES (NULL, 'Popescu', 'Ion');
-- Error starting at line : 92 in command -
-- INSERT INTO clienti (id_client, nume, prenume) VALUES (NULL, 'Popescu', 'Ion')
--Error at Command Line : 92 Column : 57
--Error report -
--SQL Error: ORA-01400: cannot insert NULL into ("BD026"."CLIENTI"."ID_CLIENT")

 INSERT INTO clienti (nume, prenume) VALUES (NULL, 'Ion');
--Error starting at line : 98 in command -
-- INSERT INTO clienti (nume, prenume) VALUES (NULL, 'Ion')
--Error at Command Line : 98 Column : 46
--Error report -
--SQL Error: ORA-01400: cannot insert NULL into ("BD026"."CLIENTI"."NUME")

 INSERT INTO clienti (nume, prenume) VALUES ('Popescu', NULL);
--Error starting at line : 104 in command -
-- INSERT INTO clienti (nume, prenume) VALUES ('Popescu', NULL)
--Error at Command Line : 104 Column : 57
--Error report -
--SQL Error: ORA-01400: cannot insert NULL into ("BD026"."CLIENTI"."PRENUME")

--      Testarea constrangerilor NN in tabel DETALII_CLIENTI

INSERT INTO detalii_clienti (email, adresa, data_inregistrarii, id_client) 
    VALUES ('craciun.rodica@yahoo.com', 'Strada Lalelelor, nr. 12', SYSDATE, 500);
--Error starting at line : 153 in command -
--INSERT INTO detalii_clienti (email, adresa, data_inregistrarii, id_client) 
--    VALUES ('craciun.rodica@yahoo.com', 'Strada Lalelelor, nr. 12', SYSDATE, 500)
--Error report -
--ORA-01400: cannot insert NULL into ("BD026"."DETALII_CLIENTI"."TELEFON")

INSERT INTO detalii_clienti (telefon, email, adresa, data_inregistrarii, id_client) 
    VALUES ('0726578758', NULL, 'Strada Lalelelor, nr. 12', SYSDATE, 500);
--Error starting at line : 161 in command -
--INSERT INTO detalii_clienti (telefon, email, adresa, data_inregistrarii, id_client) 
--    VALUES ('0726578758', NULL, 'Strada Lalelelor, nr. 12', SYSDATE, 500)
--Error at Command Line : 162 Column : 27
--Error report -
--SQL Error: ORA-01400: cannot insert NULL into ("BD026"."DETALII_CLIENTI"."EMAIL")

INSERT INTO detalii_clienti (telefon, email, adresa, data_inregistrarii, id_client) 
    VALUES ('0726578758', 'craciun.rodica@yahoo.com', 'Strada Lalelelor, nr. 12', NULL, 500);
--Error starting at line : 171 in command -
--INSERT INTO detalii_clienti (telefon, email, adresa, data_inregistrarii, id_client) 
--    VALUES ('0726578758', 'craciun.rodica@yahoo.com', 'Strada Lalelelor, nr. 12', NULL, 500)
--Error at Command Line : 172 Column : 83
--Error report -
--SQL Error: ORA-01400: cannot insert NULL into ("BD026"."DETALII_CLIENTI"."DATA_INREGISTRARII")

INSERT INTO detalii_clienti (telefon, email, adresa, data_inregistrarii, id_client) 
    VALUES ('0726578758', 'craciun.rodica@yahoo.com', 'Strada Lalelelor, nr. 12', SYSDATE,NULL);
--    Error starting at line : 142 in command -
--INSERT INTO detalii_clienti (telefon, email, adresa, data_inregistrarii, id_client) 
--    VALUES ('0726578758', 'craciun.rodica@yahoo.com', 'Strada Lalelelor, nr. 12', SYSDATE,NULL)
--Error at Command Line : 143 Column : 91
--Error report -
--SQL Error: ORA-01400: cannot insert NULL into ("BD026"."DETALII_CLIENTI"."ID_CLIENT")

--          Testarea constrangerilor NN in tabela Vanzari

INSERT INTO vanzari (id_vanzare,data_vanzare, id_client) VALUES (NULL, SYSDATE, 510);
--Error starting at line : 190 in command -
--INSERT INTO vanzari (id_vanzare,data_vanzare, id_client) VALUES (NULL, SYSDATE, 510)
--Error at Command Line : 190 Column : 66
--Error report -
--SQL Error: ORA-01400: cannot insert NULL into ("BD026"."VANZARI"."ID_VANZARE")

INSERT INTO vanzari (data_vanzare, id_client) VALUES ( NULL, 510);
--Error starting at line : 197 in command -
--INSERT INTO vanzari (data_vanzare, id_client) VALUES ( NULL, 510)
--Error at Command Line : 197 Column : 56
--Error report -
--SQL Error: ORA-01400: cannot insert NULL into ("BD026"."VANZARI"."DATA_VANZARE")

INSERT INTO vanzari (data_vanzare, id_client) VALUES (SYSDATE, NULL);
--Error starting at line : 204 in command -
--INSERT INTO vanzari (data_vanzare, id_client) VALUES (SYSDATE, NULL)
--Error at Command Line : 204 Column : 64
--Error report -
--SQL Error: ORA-01400: cannot insert NULL into ("BD026"."VANZARI"."ID_CLIENT")

--      Testarea constrangerilor NN in tabela Produse_Vanzari

INSERT INTO produse_vanzari (id_produs, id_vanzare) VALUES (NULL, 1010);
--Error starting at line : 213 in command -
--INSERT INTO produse_vanzari (id_produs, id_vanzare) VALUES (NULL, 1010)
--Error at Command Line : 213 Column : 61
--Error report -
--SQL Error: ORA-01400: cannot insert NULL into ("BD026"."PRODUSE_VANZARI"."ID_PRODUS")

INSERT INTO produse_vanzari (id_produs, id_vanzare) VALUES (202, NULL);
--Error starting at line : 219 in command -
--INSERT INTO produse_vanzari (id_produs, id_vanzare) VALUES (202, NULL)
--Error at Command Line : 219 Column : 66
--Error report -
--SQL Error: ORA-01400: cannot insert NULL into ("BD026"."PRODUSE_VANZARI"."ID_VANZARE")


--      Testarea constrangeilor UK in tabela Detalii_Clienti

INSERT INTO detalii_clienti (telefon, email, adresa, data_inregistrarii, id_client) 
VALUES ('0726578758', 'craciun.rodica@yahoo.com', 'Strada Lalelelor, nr. 12', SYSDATE, 500);
--Error starting at line : 229 in command -
--INSERT INTO detalii_clienti (telefon, email, adresa, data_inregistrarii, id_client) 
--VALUES ('0726578758', 'craciun.rodica@yahoo.com', 'Strada Lalelelor, nr. 12', SYSDATE, 500)
--Error report -
--ORA-00001: unique constraint (BD026.DETALII_CLIENTI__IDX) violated

--      Testarea constrangerilor UK in tabela Clienti

INSERT INTO clienti (nume, prenume) VALUES ('Craciun', 'Valeriu');  -- -> functioneaza
INSERT INTO clienti (nume, prenume) VALUES ('Mintoiu', 'Rodica');   -- -> functioneaza

INSERT INTO clienti (nume, prenume) VALUES ('Craciun', 'Rodica'); 
--Error starting at line : 243 in command -
--INSERT INTO clienti (nume, prenume) VALUES ('Craciun', 'Rodica')
--Error report -
--ORA-00001: unique constraint (BD026.CLIENTI_NUME_UK) violated

--      Testarea constrangerilor UK in tabela Produse

INSERT INTO produse (nume, pret, stoc, id_categorie) 
VALUES ('Mapex Mars Drum Set', 4900, 50, 1);
--Error starting at line : 251 in command -
--INSERT INTO produse (nume, pret, stoc, id_categorie) 
--VALUES ('Mapex Mars Drum Set', 4900, 50, 1)
--Error report -
--ORA-00001: unique constraint (BD026.PRODUSE_NUME) violated

--      Testarea constrangerilor CK in tabela Produse

INSERT INTO produse (nume, pret, stoc, id_categorie) 
VALUES ('Invalid Product', -100, 10, 1);
--Error starting at line : 261 in command -
--INSERT INTO produse (nume, pret, stoc, id_categorie) 
--VALUES ('Invalid Product', -100, 10, 1)
--Error report -
--ORA-02290: check constraint (BD026.PRODUSE_PRET_CK) violated

UPDATE produse 
SET stoc = -5 
WHERE nume = 'Mapex Mars Drum Set';
--Error starting at line : 269 in command -
--UPDATE produse 
--SET stoc = -5 
--WHERE nume = 'Mapex Mars Drum Set'
--Error report -
--ORA-02290: check constraint (BD026.PRODUSE_STOC_CK) violated

--      Testarea constrangerilor CK in tabela Detalii_Clienti

INSERT INTO detalii_clienti (telefon, email, adresa, data_inregistrarii, id_client) 
VALUES ('123456789', 'test.email@yahoo.com', 'Strada Test, nr. 1', SYSDATE, 1);
--Error starting at line : 281 in command -
--INSERT INTO detalii_clienti (telefon, email, adresa, data_inregistrarii, id_client) 
--VALUES ('123456789', 'test.email@yahoo.com', 'Strada Test, nr. 1', SYSDATE, 1)
--Error report -
--ORA-02290: check constraint (BD026.DETALII_CLIENTI_TELEFON_CK) violated

INSERT INTO detalii_clienti (telefon, email, adresa, data_inregistrarii, id_client) 
VALUES ('0728471058', 'test.email.com', 'Strada Test, nr. 1', SYSDATE, 1);
--Error starting at line : 289 in command -
--INSERT INTO detalii_clienti (telefon, email, adresa, data_inregistrarii, id_client) 
--VALUES ('0728471058', 'test.email.com', 'Strada Test, nr. 1', SYSDATE, 1)
--Error report -
--ORA-02290: check constraint (BD026.DETALII_CLIENTI_EMAIL_CK) violated

INSERT INTO detalii_clienti (telefon, email, adresa, data_inregistrarii, id_client) 
VALUES ('0728471058', 'test.email@yahoo.com', 'Strada Test, nr. 1', SYSDATE+1, 1);
--Error starting at line : 297 in command -
--INSERT INTO detalii_clienti (telefon, email, adresa, data_inregistrarii, id_client) 
--VALUES ('0728471058', 'test.email@yahoo.com', 'Strada Test, nr. 1', SYSDATE+1, 1)
--Error at Command Line : 297 Column : 13
--Error report -
--SQL Error: ORA-20001: Data invalida: 10.12.2024 01:21:13 trebuie sa fie mai mica decat data curenta.
--ORA-06512: at "BD026.TRG_DETALII_VANZARI_BRIU", line 4
--ORA-04088: error during execution of trigger 'BD026.TRG_DETALII_VANZARI_BRIU'

--      Testarea constrangerilor CK in tabela Clienti

 INSERT INTO clienti (nume, prenume) 
    VALUES ('N', 'Rodica');
--Error starting at line : 310 in command -
-- INSERT INTO clienti (nume, prenume) 
--    VALUES ('N', 'Rodica')
--Error report -
--ORA-02290: check constraint (BD026.CLIENTI_NUME_CK) violated

 INSERT INTO clienti (nume, prenume) 
    VALUES ('B0scu', 'Rod7ca');
--    Error starting at line : 310 in command -
-- INSERT INTO clienti (nume, prenume) 
--    VALUES ('N', 'Rodica')
--Error report -
--ORA-02290: check constraint (BD026.CLIENTI_NUME_CK) violated

--      Testarea constrangerilor CK in tabela Produse

INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Millenium Drum Set', 0, 20, 100);
--Error starting at line : 328 in command -
--INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Millenium Drum Set', 0, 20, 100)
--Error report -
--ORA-02290: check constraint (BD026.PRODUSE_PRET_CK) violated

INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Millenium Drum Set', 6000, -20, 100);
--Error starting at line : 334 in command -
--INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Millenium Drum Set', 6000, -20, 100)
--Error report -
--ORA-02290: check constraint (BD026.PRODUSE_STOC_CK) violated

--      Testarea constrangerilor CK in tabela Vanzari

INSERT INTO vanzari (data_vanzare, id_client) VALUES (SYSDATE+2, 510);
--Error starting at line : 342 in command -
--INSERT INTO vanzari (data_vanzare, id_client) VALUES (SYSDATE+2, 510)
--Error at Command Line : 342 Column : 13
--Error report -
--SQL Error: ORA-20001: Data invalida: 11.12.2024 01:27:51 trebuie sa fie mai mica decat data curenta.
--ORA-06512: at "BD026.TRG_VANZARI_BRIU", line 4
--ORA-04088: error during execution of trigger 'BD026.TRG_VANZARI_BRIU'

--      Testarea constrangerilor FK in tabela Produse

INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Chitara Hora', 298, 15, 200);
--Error starting at line : 358 in command -
--INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Chitara Hora', 298, 15, 200)
--Error report -
--ORA-02291: integrity constraint (BD026.CATEGORII_PRODUSE_FK) violated - parent key not found

--      Testarea constrangerilor FK in tabela Detalii_Clienti

INSERT INTO detalii_clienti (telefon, email, adresa, data_inregistrarii, id_client) 
    VALUES ('0726578798', 'craciun.daniel@yahoo.com', 'Strada Trandafirilor, nr. 12', SYSDATE, 400);
--Error starting at line : 368 in command -
--INSERT INTO detalii_clienti (telefon, email, adresa, data_inregistrarii, id_client) 
--    VALUES ('0726578798', 'craciun.daniel@yahoo.com', 'Strada Trandafirilor, nr. 12', SYSDATE, 400)
--Error report -
--ORA-02291: integrity constraint (BD026.CLIENTI_DETALII_CLIENTI_FK) violated - parent key not found

--      Testarea constrangerilor FK in tabela Vanzari

INSERT INTO vanzari (data_vanzare, id_client) VALUES (SYSDATE,400);
--Error starting at line : 374 in command -
--INSERT INTO vanzari (data_vanzare, id_client) VALUES (SYSDATE,400)
--Error report -
--ORA-02291: integrity constraint (BD026.CLIENTI_VANZARI_FK) violated - parent key not found

--      Testarea constrangerilor FK in tabela Produse_Vanzari

INSERT INTO produse_vanzari (id_produs, id_vanzare) VALUES (400,1005);
--Error starting at line : 384 in command -
--INSERT INTO produse_vanzari (id_produs, id_vanzare) VALUES (400,1005)
--Error report -
--ORA-02291: integrity constraint (BD026.PRODUSE_VANZARI_PRODUSE_FK) violated - parent key not found

INSERT INTO produse_vanzari (id_produs, id_vanzare) VALUES (202,1000);
--Error starting at line : 390 in command -
--INSERT INTO produse_vanzari (id_produs, id_vanzare) VALUES (202,1000)
--Error report -
--ORA-02291: integrity constraint (BD026.PRODUSE_VANZARI_VANZARI_FK) violated - parent key not found

SELECT * FROM VANZARI;
