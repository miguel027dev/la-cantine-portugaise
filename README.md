# La Cantine Portugaise
Site React + Vite, avec Motion et Google Maps. Concept indépendant non officiel.

Site: https://miguel027dev.github.io/la-cantine-portugaise/

## Développement
npm ci
npm run dev

## Construction pour GitHub Pages
DEPLOY_BASE_URL=/la-cantine-portugaise/ npm run build

Le code source est sur main. La version compilée est sur gh-pages. Les images gastronomiques créées sont illustratives ; les photographies du lieu proviennent du restaurant.

## Languages
First visits open in French. The header offers English and European Portuguese (pt-PT), with the explicit preference stored under cantine-language. All site content and metadata are in src/translations.js; source prices stay in src/data.js. Page position, selected dish and selected category survive a language change. Arrow keys, Home, End and Escape are supported in the selector. If local storage is unavailable the language choice still works for the current visit.

## Facade and palette
The facade photograph is the user-supplied public Facebook photo https://www.facebook.com/photo.php?fbid=1469323468532801&type=3, by Cantine Portugaise, posted 14 November 2025. It is served locally as facade.webp and credited in the story section. The new green, cream, olive and muted yellow palette follows its lettering, walls and tiles. Original restaurant photographs are preserved.
