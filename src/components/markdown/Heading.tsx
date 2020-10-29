import React, { ReactNode } from 'react';
import { CSSProperties } from 'styled-components';
import { slugfy } from '~/utils/slugfy';

function flatten(text: any, child: any): any {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

interface HeadingProps {
  children: ReactNode;
  level: number;
  style?: CSSProperties;
}

export function Heading({ level, children, ...props }: HeadingProps) {
  const Children = React.Children.toArray(children);
  const text = Children.reduce(flatten, '');

  return React.createElement('h' + level, { name: text, ...props, id: slugfy(text) }, Children);
}
