import React from 'react';

function NestedTab(props) {
  const {
    active, children, onClick, parentTabs, title
  } = props;

  if (!active) {
    throw new Error('At least one NestedTab must be active');
  }

  if (!children) {
    return null;
  }

  const nestedTitle = () => {

    return (
      <span className="row">
        {parentTabs}
        {parentTabs ? <span>{' > '}</span> : null}
        <div role="button" tabIndex={0} onClick={onClick} onKeyPress={onClick}>{title}</div>
      </span>
    );
  };

  const nestedContent = () => {
    const header = nestedTitle();
    const content = [header];
    const childrenArray = React.Children.toArray(props.children);
    for (let i = 0; i < childrenArray.length; i += 1) {
      const child = childrenArray[i];
      if (child.type === NestedTab && child.props.active) {
        child.props.parentTabs = header;
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

export default NestedTab;
