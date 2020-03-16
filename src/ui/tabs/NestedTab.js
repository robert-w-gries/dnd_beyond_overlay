import React from 'react';
import PropTypes from 'prop-types';

function NestedTab(props) {
  const {
    active, children, onClick, parentTabs, title,
  } = props;

  if (!active) {
    throw new Error('At least one NestedTab must be active');
  }

  if (!children) {
    return null;
  }

  const nestedTabs = (
    <span className="row">
      {parentTabs}
      {parentTabs ? <span>{' > '}</span> : null}
      <div role="button" tabIndex={0} onClick={onClick} onKeyPress={onClick}>{title}</div>
    </span>
  );

  const nestedContent = () => {
    const content = [nestedTabs];
    const childrenArray = React.Children.toArray(props.children);
    for (let i = 0; i < childrenArray.length; i += 1) {
      const child = childrenArray[i];
      if (child.type === NestedTab && child.props.active) {
        child.props.parentTabs = nestedTabs;
        return child;
      }
      if (child.type !== NestedTab) {
        content.push(child);
      }
    }
    return content;
  };

  return (
    <div>
      {nestedContent()}
    </div>
  );
}

NestedTab.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
  parentTabs: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
};

export default NestedTab;
