interface AuthorProps {
  author: string;
}

export const Author = ({ author }: AuthorProps) => (
  <a target="_blank" rel="noreferrer" key={author} href={`https://github.com/${author}`}>
    <img
      alt={`${author}'s github`}
      style={{ borderRadius: 20, margin: 10 }}
      src={`https://github.com/${author}.png?size=40`}
    />
  </a>
);
