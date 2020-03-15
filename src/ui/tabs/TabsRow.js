import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TabContent(props) {
  return props.children;
}

function TabsRow(props) {
  const { children, className, defaultTab } = props;
  const [currentTab, setCurrentTab] = useState(defaultTab);

  React.Children.forEach(children, (child) => {
    if (child.type !== TabContent) throw new Error(`Children of Tabs must be of type Tab, instead received a ${child.type}`);
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
    <div className={`Tabs ${className}`}>
      <div className="row TabsRow">
        {tabs}
      </div>
      <div className="TabContent">
        {content}
      </div>
    </div>
  );
}

TabsRow.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string.isRequired,
  defaultTab: PropTypes.string,
};

TabsRow.defaultProps = {
  defaultTab: '',
};

export {
  TabsRow,
  TabContent,
};
