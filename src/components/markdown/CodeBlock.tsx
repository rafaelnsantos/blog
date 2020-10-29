import { PrismAsyncLight } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockProps {
  children: string;
}

export function CodeBlock(props: CodeBlockProps) {
  // todo: detect language from props.children
  return (
    <PrismAsyncLight style={atomDark} language={'javascript'} showLineNumbers>
      {props.children}
    </PrismAsyncLight>
  );
}
