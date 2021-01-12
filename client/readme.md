# Vue 3.0 sablon vuex és vue-router támogatással

# Teendők:

1.  Node csomagok telepítése

```sh
npm i
```

2.  Változó adatok átírása:
    - package.json:
      - keywords: A projektre utaló szavak
      - author
      - repository
      - ESLint, prettier, babel és browserslist adatok személyreszabása, ha szükséges
    - vue.config.js:
      - Ha kell olyan scss file, ami minden oldalra kell, akkor itt kell importálni
3.  src mappa almappái:
    - assets: stylusok és képek
    - axios: esetleges axios fájloknak backend kommunikációra
    - components: A lapokon használt komponensek
      - Benne minden lap komponenseinek külön mappa
      - layout: Amiből csak egy van pl.: fejléc
      - UI: Amit több helyen is használsz pl.: gomb
    - router: vue-router adatai
    - store: vuex adatok
      - modules mappába, ha több is van
    - views: A főlapok
    