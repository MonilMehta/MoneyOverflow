import React from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

const sampleQuestions = {
  savings: [
    { id: 1, text: 'What is a savings account?', options: ['A place to save money', 'A type of investment', 'A loan service'] },
    { id: 2, text: 'How to create an emergency fund?', options: ['Save 6 months of expenses', 'Invest in stocks', 'Open a credit card'] },
  ],
  retirement: [
    { id: 1, text: 'What is the best retirement age?', options: ['60', '65', '70'] },
    { id: 2, text: 'What is a 401k plan?', options: ['Retirement savings plan', 'Insurance plan', 'Stock trading plan'] },
  ],
  investing: [
    { id: 1, text: 'What is stock investing?', options: ['Buying shares of a company', 'Saving money in a bank', 'Trading bonds'] },
    { id: 2, text: 'What are mutual funds?', options: ['Investment vehicles', 'Bank loans', 'Insurance policies'] },
  ],
  budgeting: [
    { id: 1, text: 'How to create a monthly budget?', options: ['List income and expenses', 'Invest in stocks', 'Save money'] },
    { id: 2, text: 'What is zero-based budgeting?', options: ['Assign every dollar a purpose', 'Save for emergencies', 'Invest all your savings'] },
  ],
};

const Questions = ({ category }) => {
  const questions = sampleQuestions[category] || [];

  return (
    <div id="questions" style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Questions` : 'Select a Category'}
      </Typography>
      <Grid container spacing={2}>
        {questions.map(q => (
          <Grid item xs={12} sm={6} md={4} key={q.id}>
            <Card variant="outlined" style={{ borderRadius: '10px', padding: '10px', cursor: 'pointer', transition: '0.3s' }}>
              <CardContent>
                <Typography variant="h6">{q.text}</Typography>
                <div style={{ marginTop: '10px' }}>
                  {q.options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outlined"
                      color="primary"
                      fullWidth
                      style={{ margin: '5px 0' }}
                      onClick={() => alert(`You selected: ${option}`)} // Handle option selection
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Questions;
