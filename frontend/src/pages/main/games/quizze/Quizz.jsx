import React, { useState } from 'react';
import { Card, CardContent, Button, Typography, Grid } from '@mui/material';

const Quizz = ({ onSelectCategory }) => {
  const [quizCounters, setQuizCounters] = useState({
    savings: { solved: 2, total: 20 },
    retirement: { solved: 5, total: 20 },
    investing: { solved: 8, total: 20 },
    budgeting: { solved: 3, total: 20 },
  });

  const handleSelectCategory = (category) => {
    onSelectCategory(category);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' , marginTop:'70px'}}>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>
        Select a Quiz
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {Object.keys(quizCounters).map((category) => (
          <Grid item xs={12} sm={6} md={6} key={category}>
            <Card
              variant="outlined"
              style={{
                cursor: 'pointer',
                transition: 'transform 0.3s',
                height: '200px', 
                '&:hover': { transform: 'scale(1.05)' },
              }}
              onClick={() => handleSelectCategory(category)}
            >
              <CardContent>
                <Typography variant="h5" style={{ marginBottom: '10px' }}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '20px' }}>
                  {quizCounters[category].solved}/{quizCounters[category].total} solved
                </Typography>
                <Button
                  variant="contained"
                  color={
                    category === 'savings'
                      ? 'primary'
                      : category === 'retirement'
                      ? 'secondary'
                      : category === 'investing'
                      ? 'success'
                      : 'warning'
                  }
                  style={{ marginTop: 'auto', width: '100%' }}
                >
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Quizz;
