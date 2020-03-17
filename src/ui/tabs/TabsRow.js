import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/overlay.module.css';

function TabContent(props) {
  return props.children;
}

function TabsRow(props) {
  const { children, defaultTab } = props;
  const [currentTab, setCurrentTab] = useState(defaultTab);

  React.Children.forEach(children, (child) => {
    if (child.type !== TabContent) throw new Error(`Children of Tabs must be of type Tab, instead received a ${child.type}`);
  });

  const tabs = React.Children.map(children, (tab) => {
    const classes = [styles.Tab];
    if (currentTab === tab.props.title) classes.push(styles.selectedTab);

    return (
      <button
        type="button"
        className={classes.join(' ')}
        onClick={() => setCurrentTab(tab.props.title)}
      >
        {tab.props.title}
      </button>
    );
  });

  const content = React.Children.toArray(children).find((tab) => currentTab === tab.props.title);

  return (
    <div>
      <div className={styles.TabsRow}>
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
  defaultTab: PropTypes.string,
};

TabsRow.defaultProps = {
  defaultTab: '',
};

export {
  TabsRow,
  TabContent,
};
