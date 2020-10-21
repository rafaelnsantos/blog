interface HeaderLogoProps {
  text: string;
}

export function HeaderLogo({ text }: HeaderLogoProps) {
  return <div>{text}</div>;
}
