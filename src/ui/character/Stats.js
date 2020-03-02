import React from 'react';

function Attributes() {
    return (
        <div className="grid Attributes">
            <Attribute name="STR" />
            <Attribute name="DEX" />
            <Attribute name="CON" />
            <Attribute name="INT" />
            <Attribute name="WIS" />
            <Attribute name="CHA" />
        </div>
    );
}

function Attribute(props) {
    return (
        <div className="Attribute">{props.name}</div>
    );
}

function SavingThrows() {
    return (
        <div className="SavingThrows">
            <h1 className="blockHeader">Saving Throws</h1>
            <div className="grid">
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

function StatBlock(props) {
    return (
        <div className="block">
            {props.children}
        </div>
    );
}

export {
    Attributes,
    SavingThrows,
    StatBlock,
};
