import React from 'react';

function SavingThrowsBlock() {
  return (
    <div>
      <h1>Saving Throws</h1>
      <div className="grid SavingThrows">
        <SavingThrow name="STR" />
        <SavingThrow name="DEX" />
        <SavingThrow name="CON" />
        <SavingThrow name="INT" />
        <SavingThrow name="WIS" />
        <SavingThrow name="CHA" />
      </div>
    </div>
  );
}
  
function SavingThrow(props) {
    return (
        <div className="row SavingThrow">
            <div className="SavingThrowTitle">{props.name}</div>
            <div className="SavingThrowStat">+0</div>
        </div>
    );
}

export default SavingThrowsBlock;
