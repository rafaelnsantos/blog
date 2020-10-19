import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

type ImageProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

export const Image = ({ src, ...props }: ImageProps) => (
  <img {...props} src={`${process.env.NEXT_PUBLIC_URL}/${src}`} />
);
