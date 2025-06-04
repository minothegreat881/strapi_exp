# Simple Strapi + Next.js Tutorial

This guide walks you through building a minimal website where all content is editable via the Strapi admin interface. We create the backend from scratch, set up a small Next.js frontend and show how they connect.

## Prerequisites

- Node.js 16 or newer
- npm or yarn
- Git
- (optional) Docker if you prefer containerized setup

## 1. Create a Strapi project

1. Open a terminal and run:

   ```bash
   npx create-strapi-app@latest my-strapi-backend --quickstart
   ```

   After the installation finishes, Strapi starts on `http://localhost:1337` and prompts you to create the first admin user at `http://localhost:1337/admin`.

2. Sign up in the admin UI. Strapi is now running locally using SQLite.

## 2. Explore the project structure

Inside `my-strapi-backend` you will find the `src` folder containing your future APIs and configuration. The `config` directory holds settings such as CORS and database connection.

## 3. Create a content type

1. In the admin panel open **Content-type Builder** and create a new **collection type** named `Page`.
2. Add the following fields:
   - **Title** – text (required)
   - **Slug** – UID populated from Title
   - **Content** – rich text
3. Save; Strapi rebuilds and the new type appears under **Content Manager**.

## 4. Add some data

Open **Content Manager → Pages → Create new Page** and create entries such as `Home` and `About`. After saving you can fetch them via the API.

Enable read permissions for the public role:

1. Settings → Roles & Permissions → Public
2. Under **Page** check **find** and **findOne**, then save.

Now `GET http://localhost:1337/api/pages` returns your pages.

## 5. Simple Next.js frontend

Create a new app next to the backend:

```bash
npx create-next-app@latest my-strapi-frontend
cd my-strapi-frontend
npm install axios
```

Replace `pages/index.js` with:

```javascript
import axios from 'axios';

export default function Home({ pages }) {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>My Strapi-Powered Site</h1>
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
```

Create `pages/[slug].js`:

```javascript
import axios from 'axios';

export default function Page({ page }) {
  if (!page) return <p>Loading...</p>;
  const { title, content } = page.attributes;
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
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
```

Run the frontend with `npm run dev` and visit `http://localhost:3000`. The pages list is generated from Strapi. Editing any page in the admin updates the site after revalidation.

## 6. Optional Docker setup

This repository includes a minimal `docker-compose.yml` showing how you might run Strapi alongside a static frontend served via Nginx. Execute `docker-compose up` to try it.

## 7. Deploying

Deploy Strapi to a host like Heroku or DigitalOcean and push the Next.js site to Vercel. Remember to adjust CORS settings in `my-strapi-backend/config/middlewares.js` to allow your production frontend URL.

With these steps you have a basic website editable from the Strapi admin.
