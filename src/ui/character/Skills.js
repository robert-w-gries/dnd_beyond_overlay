import React from 'react';

function Skills() {
    return (
        <div className="Skills">
            <Skill name="Acrobatics" />
            <Skill name="Animal Handling" />
            <Skill name="Arcana" />
            <Skill name="Athletics" />
            <Skill name="Deception" />
            <Skill name="History" />
            <Skill name="Insight" />
            <Skill name="Intimidation" />
            <Skill name="Investigation" />
            <Skill name="Medicine" />
            <Skill name="Nature" />
            <Skill name="Perception" />
            <Skill name="Performance" />
            <Skill name="Persuasion" />
            <Skill name="Religion" />
            <Skill name="Sleight of Hand" />
            <Skill name="Stealth" />
            <Skill name="Survival" />
        </div>
    );
}

function Skill(props) {
    return (
        <div className="row Skill">
            <div className="box">Prof</div>
            <div className="box">Mod</div>
            <div className="box name">{props.name}</div>
            <div className="box">+0</div>
        </div>
    );
}

export default Skills;