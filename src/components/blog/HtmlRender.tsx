import parse from 'html-react-parser';

interface HtmlRenderProps {
  source: string;
  renderers: {
    [key: string]: (props: any) => JSX.Element;
  };
}

export function HtmlRender(props: HtmlRenderProps) {
  return (
    <div>
      {parse(props.source, {
        replace: (node) => {
          if (node.type === 'tag') {
            if (Object.keys(props.renderers).includes(node.name)) {
              const Component = props.renderers[node.name];
              return <Component {...node.attribs}>{node.children[0].data}</Component>;
            }
          }
        },
      })}
    </div>
  );
}
