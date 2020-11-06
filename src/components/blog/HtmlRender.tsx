import parse, { domToReact } from 'html-react-parser';
import toStyle from 'css-to-style';
interface HtmlRenderProps {
  source: string;
  renderers: {
    [key: string]: (props: any) => JSX.Element;
  };
}

export function HtmlRender(props: HtmlRenderProps) {
  return (
    <>
      {parse(props.source, {
        replace: (node: any) => {
          if (node.type === 'tag') {
            const tags = Object.keys(props.renderers);

            if (tags.includes(node.name)) {
              const Component = props.renderers[node.name];

              const style = toStyle(node.attribs.style || '');

              if (node.children.length === 0) return <Component {...node.attribs} style={style} />;
              return (
                <Component {...node.attribs} style={style}>
                  {domToReact(node.children)}
                </Component>
              );
            }

            if (tags.includes('heading') && node.name.startsWith('h') && node.name.length === 2) {
              const Component = props.renderers.heading;
              const style = toStyle(node.attribs.style || '');
              node.attribs.level = parseInt(node.name[1]);

              return (
                <Component {...node.attribs} style={style}>
                  {domToReact(node.children)}
                </Component>
              );
            }
          }
        },
      })}
    </>
  );
}
