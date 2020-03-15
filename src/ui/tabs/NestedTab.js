import React from 'react';

function NestedTab(props) {
  const {
    active, children, parentTitle, title
  } = props;

  if (!active) {
    throw new Error('At least one NestedTab must be active');
  }

  if (!children) {
    return null;
  }

  let formedTitle;
  const nestedTitle = () => {
    if (formedTitle) return formedTitle;

    let pre = '';
    if (parentTitle) {
      pre = `${parentTitle} > `;
    }
    formedTitle = `${pre}${title}`;
    return formedTitle;
  };

  const test = () => {
    const content = [<span>{nestedTitle()}</span>];
    const childrenArray = React.Children.toArray(props.children);
    for (let i = 0; i < childrenArray.length; i += 1) {
      const child = childrenArray[i];
      if (child.type === NestedTab && child.props.active) {
        child.props.parentTitle = nestedTitle();
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
      {test()}
    </div>
  );
}

export default NestedTab;
