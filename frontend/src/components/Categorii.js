import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Button, Paper, TableContainer} from '@mui/material';
import { CustomTextField, StyledTableHead, StyledTableHeadCell, StyledTableRow , Layout} from './CustomElements';
import theme from './theme';


const Categorii = () => {
  
  const [categorii, setCategorii] = useState([]);
  const [denumire, setDenumire] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/categorii')
      .then((response) => setCategorii(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleAddCategorie = () => {
    axios.post('http://localhost:5000/categorii', { denumire })
      .then((response) => {
        setCategorii([...categorii, response.data]);
        setDenumire('');
        return axios.get('http://localhost:5000/categorii');
      })
      .then( (response) => setCategorii(response.data))
      .catch((error) => console.error(error));
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
      <h1 style = {{ textAlign: 'center', marginBottom: '20px', color: '#F7EFE5'}}>Adaugă Categorie</h1>
      <div style = {{ paddingTop: '20px',display: 'flex', gap: '10px', marginBottom: '20px', color: '#F7EFE5'}}>
        <CustomTextField
          label="Denumire categorie"
          value={denumire}
          onChange={(e) => setDenumire(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleAddCategorie}>
          Adaugă
        </Button>
      </div>

      <TableContainer component = {Paper} elevation = {3}>
      <Table>
        <StyledTableHead>
          <TableRow>
            <StyledTableHeadCell>ID</StyledTableHeadCell>
            <StyledTableHeadCell>Denumire</StyledTableHeadCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {categorii.map((categorie, index) => (
            <StyledTableRow key={index}>
              <TableCell sx = {{textAlign: 'center'}}>{categorie[0]}</TableCell>
              <TableCell sx = {{textAlign: 'center'}}>{categorie[1]}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </div>
    </div>
  );
};

export default Categorii;
