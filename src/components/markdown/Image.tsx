import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

type ImageProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

export const Image = ({ src, ...props }: ImageProps) => <img {...props} src={`/${src}`} />;
