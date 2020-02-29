import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Selections />
      <Character />
    </div>
  );
}

function Selections() {
  return (
    <div className="selections">
      <SelectCampaign />
      <SelectCharacter />
    </div>
  )
}

function SelectCampaign() {
  return (
    <div>Campaigns</div>
  );
}

function SelectCharacter() {
  return (
    <div>Characters</div>
  );
}

function Character() {
  return (
    <h1>Character</h1>
  );
}

export default App;
