import React from 'react';
import { Grid, Button, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import StoreIcon from '@mui/icons-material/Store';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import background from '../image/chitara.jpg'

function Home() {
  return (
    <div
      style={{
        minHeight: '86vh',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        padding: '20px',
      }}
    >
      <h1 
        style = 
        {{  textAlign: 'center',
            marginBottom: '20px',
            marginTop: '-20px',
            color: '#F7EFE5',
            position: 'relative',
            top: '-100px', 
            fontSize: '2.5rem',
            //textShadow: '0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.7), 0 0 30px rgba(255, 255, 255, 0.7)'
        }}
            
            >Bun venit la magazinul de instrumente!
      </h1>
      <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ marginTop: '-80px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ backgroundColor: '#5C469C', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CardContent>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/categorii"
                startIcon={<CategoryIcon />}
                style={{
                  fontWeight: 'bold',
                  height: '150px',
                  width: '150px',
                  fontSize: '18px',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'center', // Centrează textul și iconițele
                  alignItems: 'center' // Centrează pe verticală
                }}
              >
                Categorii
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ backgroundColor: '#5C469C', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CardContent>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/produse"
                startIcon={<StoreIcon />}
                style={{
                  fontWeight: 'bold',
                  height: '150px',
                  width: '150px',
                  fontSize: '18px',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                Produse
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ backgroundColor: '#5C469C', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CardContent>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/clienti"
                startIcon={<PeopleIcon />}
                style={{
                  fontWeight: 'bold',
                  height: '150px',
                  width: '150px',
                  fontSize: '18px',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                Clienți
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ backgroundColor: '#5C469C', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CardContent>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/vanzari"
                startIcon={<AttachMoneyIcon />}
                style={{
                  fontWeight: 'bold',
                  height: '150px',
                  width: '150px',
                  fontSize: '18px',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                Vânzări
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
