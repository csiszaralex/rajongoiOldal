# Jonas Brothers rajongói oldal

Iskolai project M.E.V.N.-ben megvalósítva.

## Leírás

## Használat

### Adatbázis:

Root könvtárból:

```bash
db/start.bat
```

### Backend:

```bash
npm start
```

Fejlesztéshez:

```bash
nodemon
```

### Frontend

## Telepítés

### Adatbázis telepítése:

Root könyvtárból

```bash
db/import.bat
```

### Backend:

Node csomagok telepítése:

```bash
npm i
```

TypeScript fájlok átkonvertálása JavaScript fájlokká:

```bash
npm run compile
```

### Frontend:

## Közreműködők

## Csomagok

- Backend:
  - [Node][node] - Csomagkezelő
  - [Express][express] - Webszerver
  - [Mongoose][mongoose] - MongoDB szerverrel való kommunikáció
- Backend Dev:
  - [TypeScript][ts]
  - [Nodemon][nodemon]
  - [ESLint][eslint] - Kód validátor
  - [Prettier][prettier] - Kód formázó
- Frontend:
- Frontend Dev:

## API
### GET:
/api?asd=5 -> Szűri, ahol az asd értéke 5
/api?limit=2 -> csak 2 értéket jelení meg
/api?page=2&limit=3 -> A 2. 3 értéket jeleníti meg, csak limittel használható, első oldal page=1-nél
/api?_=tipus|hossz -> Csak a tipus és hossz azonosítójú mezőket írja ki
/api?_hossz=-1 -> A hossz alapján csökkenő sorrendben mutatja



## Tesztek

## License

A projekt és annak tartalma az [MIT license][license] alatt van, beleértve minden forráskódot és megjelenítéshez használt kódot.

[express]: https://expressjs.com/
[mongoose]: https://mongoosejs.com/
[node]:https://nodejs.org/en/about/
[ts]: https://www.typescriptlang.org/
[nodemon]: https://nodemon.io/
[eslint]: https://eslint.org/
[prettier]: https://prettier.io/
[license]: https://github.com/csiszaralex/rajongoiOldal/blob/master/LICENSE.md