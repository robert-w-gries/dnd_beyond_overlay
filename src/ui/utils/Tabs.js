import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Tab(props) {
  return props.children;
}

function Tabs(props) {
  const { children, defaultTab } = props;
  const [currentTab, setCurrentTab] = useState(defaultTab);

  React.Children.forEach(children, (child) => {
    if (child.type !== Tab) throw new Error(`Children of Tabs must be of type Tab, instead received a ${child.type}`);
  });

  const tabs = React.Children.map(children, (tab) => {
    const selectedStyle = {
      background: 'red',
      color: 'white',
      fontWeight: 'bold',
    };

    return (
      <button type="button" className="Tab" style={currentTab === tab.props.title ? selectedStyle : null} onClick={() => setCurrentTab(tab.props.title)}>
        {tab.props.title}
      </button>
    );
  });

  const content = React.Children.toArray(children).find((tab) => currentTab === tab.props.title);

  return (
    <div className={`Tabs ${props.className}`}>
      <div className="row TabsRow">
        {tabs}
      </div>
      <div className="TabContent">
        {content}
      </div>
    </div>
  );
}

Tabs.propTypes = {
  children: PropTypes.element.isRequired,
  defaultTab: PropTypes.string,
};

Tabs.defaultProps = {
  defaultTab: '',
};

export {
  Tabs,
  Tab,
};
