import React from 'react';

function Actions() {
    return (
        <table className="Actions">
            <tr>
                <th>Action</th>
                <th>Range</th>
                <th>Hit</th>
                <th>Damage</th>
            </tr>
            <Action title="Example Action" />
            <Action title="Example Action" />
            <Action title="Example Action" />
        </table>
    );
}

function Action(props) {
    return (
        <tr>
            <td>{props.title}</td>
            <td>30</td>
            <td>+10</td>
            <td>1d6+5</td>
        </tr>
    )
}

export default Actions;
