import React, { useMemo } from 'react';

function flatten(text: any, child: any): any {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

function HeadingRenderer(props: any) {
  return React.createElement('h' + props.level, { name: props.text }, props.children);
}

export function Heading(props: any) {
  const [children, text] = useMemo(() => {
    const children = React.Children.toArray(props.children);
    const text = children.reduce(flatten, '');
    return [children, text];
  }, []);

  return (
    <HeadingRenderer level={props.level} text={text}>
      {children}
    </HeadingRenderer>
  );
}
