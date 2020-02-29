import React from 'react';

function StatBlock() {
    return (
      <div className="grid StatBlock">
        <Stat name="STR" />
        <Stat name="DEX" />
        <Stat name="CON" />
        <Stat name="INT" />
        <Stat name="WIS" />
        <Stat name="CHA" />
      </div>
    );
  }
  
  function Stat(props) {
    return (
      <div className="Stat">{props.name}</div>
    );
  }

export default StatBlock;
