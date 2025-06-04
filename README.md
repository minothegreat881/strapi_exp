# Ukážka Strapi + Next.js

Tento repozitár obsahuje stručný návod, ako si vytvoriť veľmi jednoduchú webovú stránku s admin rozhraním v Strapi a malou ukážkou frontendu v Next.js. Cieľom je ukázať, ako môže administrátor upravovať obsah a zmeny sa následne prejavia na stránke.

## 1. Inštalácia nástrojov

Potrebujete mať nainštalovaný **Node.js** (verzia 16 alebo novšia), **npm** a **git**. Ak chcete použiť Docker, stačí mať aj Docker Desktop.

## 2. Vytvorenie Strapi projektu

1. V termináli spustite
   ```bash
   npx create-strapi-app@latest backend --quickstart
   ```
   Po nainštalovaní sa Strapi spustí na `http://localhost:1337` a vyzve vás na vytvorenie administrátorského účtu.
2. Po prihlásení v administračnom rozhraní otvorte **Content-type Builder** a vytvorte kolekčný typ `Page` s poľami:
   - **Title** – text (povinné)
   - **Slug** – UID generovaný z Title
   - **Content** – rich text
3. Strapi sa po uložení reštartuje a v **Content Manager** uvidíte novú položku `Page`.
4. Aby bolo možné čítať obsah bez prihlásenia, choďte do **Settings → Roles & Permissions → Public** a povoľte akcie **find** a **findOne** pre typ `Page`.

V tomto momente môžete pridávať stránky v admin rozhraní a API je dostupné na `http://localhost:1337/api/pages`.

## 3. Jednoduchý Next.js frontend

Vedľa backendu vytvorte nový priečinok a inicializujte projekt:

```bash
npx create-next-app frontend
cd frontend
npm install axios
```

V repozitári nájdete priečinok **frontend-sample** s ukážkovými súbormi. Ich obsah môžete skopírovať do svojho projektu. Najdôležitejšie sú dva súbory:

- `pages/index.js` – vypíše zoznam stránok
- `pages/[slug].js` – dynamicky zobrazí detail stránky

Spustite frontend príkazom `npm run dev` a otvorte `http://localhost:3000`. Zobrazí sa zoznam stránok uložených v Strapi. Po kliknutí na niektorú sa načíta jej obsah.

Ak v administrácii upravíte text a stránku znovu načítate, uvidíte zmenu (Next.js stránky sa v intervale `revalidate` prerenderujú).

## 4. CORS nastavenia

Ak bude frontend bežať na inom hoste ako Strapi, upravte `backend/config/middlewares.js` a pridajte povolené domény do časti `origin` v middleware `strapi::cors`.

## 5. Docker (voliteľné)

Súčasťou repozitára je súbor `docker-compose.yml`, ktorý ilustruje spustenie Strapi kontajnera spolu s jednoduchým statickým webserverom. Stačí spustiť:

```bash
docker-compose up
```

## 6. Nasadenie

Strapi môžete nasadiť napríklad na Heroku alebo DigitalOcean. Frontend je vhodné umiestniť na Vercel. Nezabudnite nastaviť `NEXT_PUBLIC_STRAPI_API_URL` vo vašom frontende na URL, kde beží produkčný Strapi a zároveň pridať túto doménu do povolených CORS.

Po nasadení budete môcť upravovať obsah v produkčnom Strapi admin rozhraní a zmeny sa po chvíli prejavia aj na verejnom webe.

