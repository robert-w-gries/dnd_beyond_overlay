import React, { useState } from 'react';

function Tabs(props) {
    const [currentTab, setCurrentTab] = useState(props.default);

    const tabs = React.Children.map(props.children, (content) => {
        return (
            <button onClick={() => setCurrentTab(content.props.tabTitle)}>
                {content.props.tabTitle}
            </button>
        );
    });

    const content = React.Children.toArray(props.children).filter((child) => {
        return currentTab === child.props.tabTitle;
    });

    return (
        <div>
            {tabs}
            {content}
        </div>
    );
}

export default Tabs;
