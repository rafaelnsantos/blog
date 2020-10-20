import { createElement, ReactNode, CSSProperties } from 'react';
import COLORS from 'content/colors.json';

type Color = keyof typeof COLORS;

interface TextProps {
  size?: number;
  color?: Color;
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
  color = 'text-primary',
  lineHeight = 1,
  weigth = 500,
  align,
  className,
}: TextProps) => {
  return createElement(variant, {
    children,
    style: {
      fontSize: `${size}rem`,
      color: `var(--${color})`,
      lineHeight: `${lineHeight}rem`,
      fontWeight: weigth,
      textAlign: align,
    },
    className,
  });
};
