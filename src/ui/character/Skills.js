import React from 'react';

function Skills() {
    return (
        <div className="Skills">
            <Skill name="Acrobatics" attribute="DEX" />
            <Skill name="Animal Handling" attribute="WIS" />
            <Skill name="Arcana" attribute="INT" />
            <Skill name="Athletics" attribute="STR" />
            <Skill name="Deception" attribute="CHA" />
            <Skill name="History" attribute="INT" />
            <Skill name="Insight" attribute="WIS" />
            <Skill name="Intimidation" attribute="CHA" />
            <Skill name="Investigation" attribute="INT" />
            <Skill name="Medicine" attribute="WIS" />
            <Skill name="Nature" attribute="INT" />
            <Skill name="Perception" attribute="WIS" />
            <Skill name="Performance" attribute="CHA" />
            <Skill name="Persuasion" attribute="CHA" />
            <Skill name="Religion" attribute="INT" />
            <Skill name="Sleight of Hand" attribute="DEX" />
            <Skill name="Stealth" attribute="DEX" />
            <Skill name="Survival" attribute="WIS" />
        </div>
    );
}

function Skill(props) {
    return (
        <div className="row Skill">
            <div className="box">o</div>
            <div className="box attribute">{props.attribute}</div>
            <div className="box name">{props.name}</div>
            <div className="box">+0</div>
        </div>
    );
}

export default Skills;