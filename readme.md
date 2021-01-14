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

```bash
npm i
```

```bash
npm run serve
```

## Közreműködők

- [Borbély Bálint][bálint]
- [Csiszár Alex Gergő][alex]
- [Kardos Raul][raul]

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
  - [Axios][axios] - Backenddel való kommunikáció
  - [Vue][vue]
  - [Bootstrap][bootstrap]
- Frontend Dev:
  - [ESLint][eslint] - Kód validátor
  - [Prettier][prettier] - Kód formázó

## API

A `db` mappába található data.json fájl alapján.

### Útvonalak:

```
GET     /api
GET     /api/ID
POST    /api
PATCH   /api
PATCH   /api/ID
DELETE  /api
DELETE  /api/ID
```

A `DELETE` és a `PATCH` kizárólag szűrő, vagy ID megadásával használható, ezzel elkerülve, hogy véletlenül az összes adatot töröljük, vagy módosítsuk.

### Szűrés

Használd a mező nevét, valamint a keresendő értéket.

```
GET     /api?tipus=0
GET     /api?tipus=0&tipus=1
GET     /api?tipus=0&hossz=199
PATCH   /api?tipus=1
DELETE  /api?hossz=199
```

### Lapszámozás

Használd a `_limit`-et annak beállítására, hogy mennyi rekord jelenlen meg a képernyőn.

A `_page`-el beállíthatod, hogy hányadik oldal adatát jelenítse meg. A `_limit` megadása nélkül annak alap értéke 10 lesz.

```
GET  /api?_limit=3
GET  /api?_limit=3&_page=2
```

Az oldalak számozása 1-el kezdődik.

### Rendezés

Használd a mező nevét, előtte egy \_-al a rendezéshez.

Elfogadott értékek:

- Csökken sorrend: `-1`, `asc`, `ascending`
- Növekvő sorrend: `1`, `desc`, `descending`

```
GET  /api?_tipus=asc
GET  /api?_tipus=-1&_hossz=1
```

Több rendezési érték esetén egymás után lesznek rendezve.

### Megjelenő mezők szűrése

A `_`-nak értékként megadható, hogy a lekérdezésben mely mezők jelenlenjenek meg.

Ha több mezőt akarunk visszakapni, akkor a mezőneveket vesszővel elválasztva kaphatjuk meg azokat.

```
GET  /api?_=hossz
GET  /api?_=hossz,cim
GET  /api/ID?_=hossz
```

Az \_id értékét minden esetben mutatja.

## License

A projekt és annak tartalma az [MIT license][license] alatt van, beleértve minden forráskódot és megjelenítéshez használt kódot.

<!-- Dependecies -->

[express]: https://expressjs.com/
[mongoose]: https://mongoosejs.com/
[node]: https://nodejs.org/en/about/
[ts]: https://www.typescriptlang.org/
[nodemon]: https://nodemon.io/
[eslint]: https://eslint.org/
[prettier]: https://prettier.io/
[js]: https://www.javascript.com/
[vue]: https://vuejs.org/
[axios]: https://www.npmjs.com/package/axios
[bootstrap]: https://getbootstrap.com/

<!-- Licensz -->

[license]: https://github.com/csiszaralex/rajongoiOldal/blob/master/LICENSE.md

<!-- Közreműködők -->

[bálint]: https://github.com/thisisjustaguy
[alex]: https://github.com/csiszaralex
[raul]: https://github.com/krdsrl
