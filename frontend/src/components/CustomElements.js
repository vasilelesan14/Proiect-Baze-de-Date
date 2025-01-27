import React from 'react';
import { TextField, TableRow, TableHead,TableCell } from '@mui/material';
import { styled, textAlign } from '@mui/system';
import theme from './theme';
  
export const StyledTableHead = styled (TableHead) ({
  backgroundColor: '#1D267D',
  color: '#FBFBFB',
})

export const StyledTableHeadCell = styled(TableCell)({
  color: '#FBFBFB', // Culoare text pentru antet (exemplu: portocaliu)
  fontWeight: 'bold', // Text îngroșat
  fontSize: '16px', // Dimensiune text
  textAlign: 'center', // Text centrat
});
  
  export const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#D4ADFC',
    },
    '&:hover': {
        backgroundColor: '#e0e0e0', // Efect de hover la trecerea cursorului
    },
  }));

  export const CustomTextField = styled(TextField)({
    '& .MuiInputBase-input': {
        color: theme.colors.textDefault, // Culoare text introdus
    },

    '& .MuiInputBase-root': {
        backgroundColor: theme.colors.background, // Fundalul câmpului de input
        borderRadius: '5px', // Marginile rotunjite
    },

    '& .MuiInputLabel-root': {
        color: theme.colors.labelDefault, // Culoarea etichetei (default)
        transition: 'all 0.3s ease', // Tranziție lină pentru migrarea etichetei
        fontWeight: 'bold', // Face eticheta mai groasă
    },

    '& .MuiInputLabel-shrink': {
        color: theme.colors.labelFocused, // Culoare etichetă când câmpul are focus
        transform: 'translate(0, -1.5em) scale(0.75)', // Mărește eticheta și o mută în sus
    },

    '& .MuiOutlinedInput-root': {
        transition: 'box-shadow 0.3s ease', // Adaugă tranziție pentru efectul de glow
        '&:hover fieldset': {
            borderColor: theme.colors.labelFocused,
            boxShadow: '0 0 10px rgba(212, 173, 252, 0.8)', // Efectul de glow
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.colors.labelFocused,
            boxShadow: '0 0 15px rgba(0, 123, 255, 0.85)', // Glow mai intens când e focus
        },
    },

    '& .MuiInputBase-root.Mui-focused .MuiInputBase-input': {
        color: theme.colors.textDefault, // Asigură-te că textul rămâne vizibil în focus
    },
});

export const customFormatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return dateString; // Returnează data originală dacă nu este validă
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Lunile sunt indexate de la 0
  const year = date.getFullYear();
  return `${day}.${month}.${year}`; // Format: DD.MM.YYYY
};

export const Layout = ({ children }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'repeating-linear-gradient(to right, #D4ADFC 0%, #1D267D 100%)',
        padding: '20px',
        color: '#fff',
      }}
    >
      {children}
    </div>
  );
};