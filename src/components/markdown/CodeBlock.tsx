import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockProps {
  value: string;
  language?: string;
}

export function CodeBlock(props: CodeBlockProps) {
  return (
    <SyntaxHighlighter showLineNumbers language={props.language} style={atomDark}>
      {props.value}
    </SyntaxHighlighter>
  );
}
