import dynamic from 'next/dynamic';

interface CodeBlockProps {
  value: string;
  language?: string;
}

const SyntaxHighlighter = dynamic<CodeBlockProps>(async () => {
  const PrismAsyncLight = await import('react-syntax-highlighter').then((a) => a.PrismAsyncLight);
  const atomDark = await import('react-syntax-highlighter/dist/cjs/styles/prism').then(
    (a) => a.atomDark
  );

  const Highlighter = (props: CodeBlockProps) => (
    <PrismAsyncLight style={atomDark} showLineNumbers language={props.language || 'jsx'}>
      {props.value}
    </PrismAsyncLight>
  );

  return Highlighter;
});

export function CodeBlock(props: CodeBlockProps) {
  return <SyntaxHighlighter language={props.language || 'jsx'} value={props.value} />;
}
