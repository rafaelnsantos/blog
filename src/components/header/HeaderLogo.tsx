interface HeaderLogoProps {
  text: string;
}

export function HeaderLogo({ text }: HeaderLogoProps) {
  return (
    <>
      <div style={{ fontFamily: 'Handlee', fontSize: '2rem', fontWeight: 800 }}>{text}</div>
    </>
  );
}
