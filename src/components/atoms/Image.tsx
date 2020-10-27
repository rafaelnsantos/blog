import { ComponentProps } from 'react';
import Img from 'next/image';

type ImageProps = ComponentProps<typeof Img>;

export const Image = ({ src, ...props }: ImageProps) => <Img {...props} src={`/${src}`} />;
