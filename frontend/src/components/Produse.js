import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Button, Paper, TableContainer} from '@mui/material';
import { CustomTextField, StyledTableHeadCell, StyledTableRow,StyledTableHead } from './CustomElements';

//import { styled } from '@mui/system';

//import theme from './theme';

const Produse = () => {
  const [produse, setProduse] = useState([]);
  const [nume, setNume] = useState('');
  const [pret, setPret] = useState('');
  const [stoc, setStoc] = useState('');
  const [id_categorie, setCategorieId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/produse')
      .then((response) => setProduse(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleAddProdus = () => {
    axios.post('http://localhost:5000/produse', { nume, pret, stoc, id_categorie:id_categorie })
      .then(() => {
        setProduse([...produse, { nume, pret, stoc, id_categorie: id_categorie }]);
        setNume('');
        setPret('');
        setStoc('');
        setCategorieId('');
        return axios.get('http://localhost:5000/produse');
      })
      .then ( (response) => setProduse(response.data) )
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

    <div style = {{ padding: '20px', paddingBottom: '60px', maxWidth: '800px', margin: '0 auto'}}>
      <h1 style = {{ textAlign: 'center', marginBottom: '20px', color: '#F7EFE5'}} >Adaugă Produs</h1>
      <div style = {{ paddingTop: '20px',display: 'flex', gap: '10px', marginBottom: '20px', color: '#F7EFE5'}}>
        <CustomTextField
          label="Nume produs"
          value={nume}
          onChange={(e) => setNume(e.target.value)}
          fullWidth
        />
        <CustomTextField
          label="Preț"
          value={pret}
          onChange={(e) => setPret(e.target.value)}
          fullWidth
        />
        <CustomTextField
          label="Stoc"
          value={stoc}
          onChange={(e) => setStoc(e.target.value)}
          fullWidth
        />
        <CustomTextField
          label = "ID Categorie"
          value = {id_categorie}
          onChange={(e) => setCategorieId(e.target.value)}
          fullWidth
          />
        <Button 
          variant="contained" 
          onClick={handleAddProdus}
          style={{ whiteSpace: 'nowrap', height: '56px', width: '300px'}}>
          Adaugă
        </Button>
      </div>
      <TableContainer component={Paper} elevation = {3}>
        <Table>
          <StyledTableHead>
            <TableRow>
              <StyledTableHeadCell>ID</StyledTableHeadCell>
              <StyledTableHeadCell>Nume</StyledTableHeadCell>
              <StyledTableHeadCell>Preț</StyledTableHeadCell>
              <StyledTableHeadCell>Stoc</StyledTableHeadCell>
              <StyledTableHeadCell>ID Categorie</StyledTableHeadCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {produse.map((produs, index) => (
              <StyledTableRow key={index}>
                <TableCell sx={{  textAlign: 'center'}} >{produs[0]}</TableCell>
                <TableCell sx={{  textAlign: 'center'}}>{produs[1]}</TableCell>
                <TableCell sx={{  textAlign: 'center'}}>{produs[2]}</TableCell>
                <TableCell sx={{  textAlign: 'center'}}>{produs[3]}</TableCell>
                <TableCell sx={{  textAlign: 'center'}}>{produs[4]}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </div>
  );
};

export default Produse;
