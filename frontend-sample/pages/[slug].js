import axios from 'axios';

export default function Page({ page }) {
  if (!page) return <p>Načítavam...</p>;
  const { title, content } = page.attributes;
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <p style={{ marginTop: '1rem' }}>
        <a href="/">&#8592; Späť</a>
      </p>
    </main>
  );
}

export async function getStaticPaths() {
  const res = await axios.get('http://localhost:1337/api/pages');
  const paths = res.data.data.map((p) => ({ params: { slug: p.attributes.slug } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const res = await axios.get(`http://localhost:1337/api/pages?filters[slug][$eq]=${slug}`);
  const data = res.data.data;
  if (!data.length) return { notFound: true };
  return { props: { page: data[0] }, revalidate: 10 };
}
