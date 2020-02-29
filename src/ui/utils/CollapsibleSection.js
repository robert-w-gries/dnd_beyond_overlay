import React, { useState } from 'react';

function CollapsibleSection(props) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <h1 onClick={() => setOpen(!open)}>
                {props.title}
            </h1>
            {open ? props.children : null}
        </div>
    );
}

export default CollapsibleSection;
