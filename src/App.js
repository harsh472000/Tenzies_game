import './App.css';
import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Die from './Die';
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [Tenzies, setTenzies] = useState(false)

  React.useEffect(()=>{
    const allHeld = dice.every(die => die.isHeld) 
    const firstValue = dice[0].value
    const sameValue =  dice.every(die => die.value === firstValue)
    if(allHeld && sameValue){
      setTenzies(true)
      console.log("you won buddy!!")
    }
  },[dice])

  function generateNewDie(){
    return{
      id:nanoid(),
      value:Math.ceil(Math.random() * 6),
      isHeld:false
    }
  }

  function allNewDice(){
      const newDice = [];
      for(let i=0;i<10;i++){
        newDice.push(generateNewDie())
      }
      return newDice;
  }
function holdDice(id){
  setDice(oldDice => oldDice.map(die=>{
    return die.id === id ?
        {...die,isHeld : !die.isHeld} :
        die
  }))
}
const diceElements = dice.map(die => <Die key={die.id} values={die.value} isHeld={die.isHeld} holdDice={()=> holdDice(die.id)}/>)

function handleClick(){
  if(!Tenzies){
    setDice(oldDice => oldDice.map(die =>{
      return die.isHeld ?
        die :
        generateNewDie()
    }));
  }else{
    setTenzies(false);
    setDice(allNewDice())
  }
  
} 

  return (
    <main>
      {Tenzies && <Confetti />}
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <div className='dice-button'>
        <button onClick={handleClick} className='roll-dice'>
          {Tenzies ? "New Game" : "Roll"}
        </button>
      </div>
      
    </main>
  );
}

export default App;
