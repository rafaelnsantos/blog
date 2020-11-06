import { createElement, ReactNode, CSSProperties } from 'react';
import { ColorProps } from 'styled-system';

interface TextProps extends ColorProps {
  size?: number;
  lineHeight?: CSSProperties['lineHeight'];
  weigth?: CSSProperties['fontWeight'];
  variant?: 'h1' | 'h2' | 'h3' | 'p';

  align?: CSSProperties['textAlign'];

  children?: ReactNode;

  className?: string;
}

export const Text = ({
  variant = 'p',
  children,
  size = 1,
  lineHeight = 1,
  weigth = 400,
  align,
  color = 'text-primary',
  className,
  ...style
}: TextProps) => {
  const styles: CSSProperties = {
    fontSize: `${size}rem`,
    lineHeight: `${lineHeight}rem`,
    fontWeight: weigth,
    textAlign: align,
  };

  if (color) styles.color = `var(--${color})`;
  if (style.bg) styles.background = `var(--${style.bg})`;

  return createElement(variant, {
    children,
    style: {
      ...style,
      ...styles,
    },
    className,
  });
};
