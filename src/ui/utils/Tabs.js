import React, { useState } from 'react';

function Tabs(props) {
    const [currentTab, setCurrentTab] = useState(props.default);

    React.Children.forEach(props.children, child => {
        if (child.type !== Tab) throw new Error(`Children of Tabs must be of type Tab, instead received a ${child.type}`);
    });

    const tabs = React.Children.map(props.children, (tab) => {
        return (
            <button className="Tab" onClick={() => setCurrentTab(tab.props.title)}>
                {tab.props.title}
            </button>
        );
    });

    const content = React.Children.toArray(props.children).find((tab) => {
        return currentTab === tab.props.title;
    });

    return (
        <div className="Tabs">
            <div className="row TabsRow">
                {tabs}
            </div>
            <div className="TabContent">
                {content}
            </div>
        </div>
    );
}

function Tab(props) {
    return props.children;
}

export {
    Tabs,
    Tab
};
