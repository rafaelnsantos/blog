import data from 'content/landingPage.json';

export default function Index() {
  return (
    <div>
      <h1>{data.title}</h1>
      <h2>{data.subtitle}</h2>
    </div>
  );
}
