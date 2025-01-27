import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  TextField, Button, Paper, TableContainer, Checkbox, FormControlLabel, Box, Autocomplete
} from '@mui/material';
import { CustomTextField, StyledTableHead, StyledTableHeadCell, StyledTableRow, customFormatDate } from './CustomElements';


const Vanzari = () => {
  const [vanzari, setVanzari] = useState([]);
  const [produse, setProduse] = useState([]); 
  const [id_client, setIdClient] = useState('');
  const [dataVanzare, setDataVanzare] = useState('');
  const [selectedProduse, setSelectedProduse] = useState([]); 

  useEffect(() => {
    axios.get('http://localhost:5000/Vanzari')
      .then((response) => setVanzari(response.data))
      .catch((error) => console.error(error));

    axios.get('http://localhost:5000/produse')
      .then((response) => setProduse(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleProductSelection = (idProdus) => {
    if (selectedProduse.includes(idProdus)) {
      setSelectedProduse(selectedProduse.filter((id) => id !== idProdus));
    } else {
      setSelectedProduse([...selectedProduse, idProdus]);
    }
  };

  const handleAddVanzare = () => {
    axios.post('http://localhost:5000/vanzari', { id_client, produse: selectedProduse })
      .then((response) => {
        const newVanzareId = response.data.id_vanzare; // Folosește id-ul vanzarii returnat
        
        const produsePromises = selectedProduse.map((produs) =>
          axios.post('http://localhost:5000/vanzari', { id_produs: produs.id_produs, id_vanzare: newVanzareId })
        );
  
        return Promise.all(produsePromises);
      })
      .then(() => {
        return axios.get('http://localhost:5000/vanzari');
      })
      .then((response) => {
        setVanzari(response.data);
        setIdClient('');
        setSelectedProduse([]);
      })
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
  <div style={{ padding: '20px',paddingBottom:'60px', maxWidth: '1200px', margin: '0 auto' }}>
    <h1 style={{ textAlign: 'center', marginBottom: '20px',color: '#F7EFE5' }}>Adaugă vânzare</h1>

    <Box sx={{ marginBottom: '20px', paddingTop:'20px', gap: '30px' }}>
      <CustomTextField
        label="ID Client"
        value={id_client}
        onChange={(e) => setIdClient(e.target.value)}
        fullWidth
        sx={{ marginBottom: '30px' }}
      />

      <Autocomplete
        multiple
        options={produse}
        getOptionLabel={(option) => `${option[1]} -   ${option[2]} RON`} 
        value={selectedProduse}
        onChange={(event, newValue) => setSelectedProduse(newValue)}
        renderInput={(params) => <CustomTextField {...params} label="Selectează Produse" />}
        sx={{ marginBottom: '30px' }}
      />

      <Button variant="contained" onClick={handleAddVanzare} disabled={!id_client || selectedProduse.length === 0}>
        Adaugă Vânzare
      </Button>
    </Box>

    <TableContainer component={Paper} elevation={3}>
      <Table>
        <StyledTableHead>
          <TableRow>
            <StyledTableHeadCell>ID</StyledTableHeadCell>
            <StyledTableHeadCell>Data vânzare</StyledTableHeadCell>
            <StyledTableHeadCell>ID Client</StyledTableHeadCell>
            <StyledTableHeadCell>Produse</StyledTableHeadCell>
            <StyledTableHeadCell>Preț</StyledTableHeadCell>

          </TableRow>
        </StyledTableHead>
        <TableBody>
          {vanzari.map((vanzare, index) => (
            <StyledTableRow key={index}>
              <TableCell sx={{  textAlign: 'center'}} >{vanzare[0]}</TableCell>
              <TableCell sx={{  textAlign: 'center'}}>{customFormatDate(vanzare[1])}</TableCell>
              <TableCell sx={{  textAlign: 'center'}}>{vanzare[2]}</TableCell>
              <TableCell sx={{  textAlign: 'center', maxWidth:'300px'}}>{vanzare[3]}</TableCell>
              <TableCell sx={{  textAlign: 'center'}}>{vanzare[4]}</TableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
  </div>
);
};

export default Vanzari;