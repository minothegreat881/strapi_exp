# Strapi Tutorial (in Slovak)

Tento repozitár obsahuje krátky návod, ako vytvoriť jednoduchú webovú stránku pomocou Strapi,
ktorú je možné upravovať prostredníctvom administračného rozhrania.

## Požiadavky
- Node.js >= 18
- npx (súčasť Node.js)
- Docker (voliteľne pre jednoduché spustenie)

## 1. Vytvorenie projektu
1. Otvorte terminál a spustite:
   ```bash
   npx create-strapi-app my-strapi-app --quickstart
   ```
   Tento príkaz stiahne potrebné závislosti a spustí Strapi v režime *quickstart*.
2. Po spustení sa zobrazí stránka pre vytvorenie prvého administrátorského účtu
   (otvorí sa na `http://localhost:1337/admin`). Vytvorte si účet.
## Alternatívne spustenie s Dockerom
1. Uistite sa, že máte nainštalovaný Docker a Docker Compose.
2. V tomto repozitári spustite `docker-compose up`.
3. Strapi bude dostupné na `http://localhost:1337` a statický front-end na `http://localhost:8080`.
4. Pri prvom spustení vytvorte administrátorský účet na `/admin`.


## 2. Definovanie obsahu
1. V administračnom rozhraní prejdite na *Content-type Builder* a vytvorte nový
   obsahový typ (collection type) `Page`.
2. Pridajte aspoň dve polia:
   - `title` typu *Text*.
   - `content` typu *Rich Text* (alebo *Text*).
3. Uložte a Strapi automaticky reštartuje server.

## 3. Vytvorenie položiek
1. V menu *Content Manager* otvorte `Pages` a vytvorte novú položku s názvom a
   obsahom (napr. "Úvod" a krátky text).
2. Aktivujte publikovanie tejto položky (tlačidlo *Publish*).

## 4. Používanie API
Strapi automaticky sprístupňuje REST API. Publikované stránky môžete získať cez:
```bash
GET http://localhost:1337/api/pages
```
Odpoveď bude obsahovať JSON s názvom a obsahom stránky.

## 5. Jednoduchý front-end
Nižšie je jednoduchá HTML šablóna (`frontend/index.html`), ktorá načíta dáta z API a zobrazí ich:
```html
<!DOCTYPE html>
<html lang="sk">
<head>
  <meta charset="UTF-8" />
  <title>Moja Stránka</title>
</head>
<body>
  <div id="page"></div>
  <script>
    fetch('http://localhost:1337/api/pages')
      .then(res => res.json())
      .then(data => {
        const page = data.data[0].attributes;
        document.getElementById('page').innerHTML = `
          <h1>${page.title}</h1>
          <div>${page.content}</div>
        `;
      })
      .catch(err => console.error(err));
  </script>
</body>
</html>
```
Uložte tento kód ako `index.html` a otvorte v prehliadači. Po spustení Strapi
uvidíte obsah načítaný z API. Ak upravíte obsah v admin rozhraní a znova
načítate stránku, zmeny sa prejavia.

## 6. Záver
Tento návod demonštruje základnú prácu so Strapi: vytvorenie projektu, definovanie
obsahu, správa záznamov a využitie API na zobrazenie obsahu na webovej stránke.
