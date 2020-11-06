import borderWidths from './borderWidths.json';
import colors from './colors.json';
import delays from './delays.json';
import durations from './durations.json';
import easings from './easings.json';
import fontFamilies from './fontFamilies.json';
import fontSizes from './fontSizes.json';
import fontWeights from './fontWeights.json';
import letterSpacings from './letterSpacings.json';
import lineHeights from './lineHeights.json';
import mediaQueries from './mediaQueries.json';
import opacities from './opacities.json';
import radii from './radii.json';
import shadows from './shadows.json';
import spacing from './spacing.json';
import zIndices from './zIndices.json';

type Colors = {
  [key in keyof typeof colors]: string;
};

export const tokens = {
  borderWidths,
  colors: Object.keys(colors).reduce((prev, color) => {
    prev[color] = `var(--${color})`;
    return prev;
  }, {} as any) as Colors,
  delays,
  durations,
  easings,
  fontFamilies,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  mediaQueries,
  opacities,
  radii,
  shadows,
  spacing,
  zIndices,
};

export type Tokens = typeof tokens;
