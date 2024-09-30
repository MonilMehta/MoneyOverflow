import React from 'react'
import Quizz from './quizze/Quizz'
import Daily from './dailyq/Daily'
const Games = () => {
  return (
    <>
    <h1>Games Page</h1>
    <div style={{
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      gap: '20px',
      flexDirection:'row',
      border: '1px solid black',
      padding: '20px',
      borderRadius: '10px',
      width: '90%',
      margin: 'auto',
      height: '100vh'

    }}>
      <div style={{
        width: '45%',
        height: '400px',
        border: '1px solid black',
        borderRadius: '10px',
        padding: '20px',
        backgroundColor: 'lightgray',

      }}>
      <Quizz />
      </div>
      <Daily />
    
    
    </div>
    
    </>
  )
}

export default Games
