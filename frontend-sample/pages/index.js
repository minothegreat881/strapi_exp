import axios from 'axios';

export default function Home({ pages }) {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Moja Strapi stránka</h1>
      <ul>
        {pages.map((p) => (
          <li key={p.id}>
            <a href={`/${p.attributes.slug}`}>{p.attributes.title}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}

export async function getStaticProps() {
  const res = await axios.get('http://localhost:1337/api/pages');
  return { props: { pages: res.data.data }, revalidate: 10 };
}
