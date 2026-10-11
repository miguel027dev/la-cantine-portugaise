// Content grounded in the restaurant's public pages and TheFork, checked 2026-10-11.
// Image URLs remain on their original hosts in this prototype. Permission is required before commercial publication.
export const CONTACT = {
  name: 'La Cantine Portugaise',
  address: '57 Quai Magellan, 44000 Nantes, France',
  phone: '+33 7 45 13 57 50',
  phoneHref: 'tel:+33745135750',
  email: 'latable-rondeportugaise@outlook.com',
  booking: 'https://www.la-cantine-portugaise-restaurant-nantes.fr/booking-restopro',
  menu: 'https://www.thefork.fr/restaurant/la-cantine-portugaise-r859494/menu',
  directions: 'https://www.google.com/maps/search/?api=1&query=La+Cantine+Portugaise+57+Quai+Magellan+Nantes',
};

export const ASSETS = {
  // Original establishment photos. Do not hotlink in a commercial site without owner permission.
  room: 'https://cdn.website.dish.co/media/b5/c1/9489572/LA-CANTINE-PORTUGAISE-LA-CANTINE-SALLE-3-jpg.jpg',
  roomWide: 'https://cdn.website.dish.co/media/04/73/9489562/LA-CANTINE-PORTUGAISE-LA-CANTINE-SALLE-1-jpg.jpg',
  roomDetail: 'https://cdn.website.dish.co/media/47/4f/9489567/LA-CANTINE-PORTUGAISE-LA-CANTINE-SALLE-2-jpg.jpg',
  pastel: 'https://cdn.website.dish.co/media/47/5c/9489592/LA-CANTINE-PORTUGAISE-LA-CANTINE-PLAT-4-jpg.jpg',
  francesinha: 'https://cdn.thefork.com/tf-lab/image/upload/w_500%2Ch_500%2Cc_fill%2Cq_auto%2Cf_jpg/restaurant/638c2293-ee08-4fef-98d6-521b68a3794d/6ecf824d-f28a-4564-90c7-98abc5bc2f4f.webp',
  chicken: 'https://cdn.thefork.com/tf-lab/image/upload/w_500%2Ch_500%2Cc_fill%2Cq_auto%2Cf_jpg/restaurant/638c2293-ee08-4fef-98d6-521b68a3794d/73371185-5b1f-4e57-9cea-af3143744f3c.webp',
  salmon: 'https://cdn.thefork.com/tf-lab/image/upload/w_500%2Ch_500%2Cc_fill%2Cq_auto%2Cf_jpg/restaurant/638c2293-ee08-4fef-98d6-521b68a3794d/55d3a1ed-3dce-4af1-a852-70c952e72287.webp',
  appetizers: 'https://cdn.website.dish.co/media/5f/c5/9489582/LA-CANTINE-PORTUGAISE-LA-CANTINE-PLAT-1-jpg.jpg',
};

export const FEATURED = [
  { id:'francesinha', kicker:'SPÉCIALITÉ DE PORTO', title:'La Francesinha', description:'Un incontournable portugais, généreux et réconfortant, nappé de sauce et servi avec des frites.', price:'19,95 €', image:ASSETS.francesinha, label:'Photographie du restaurant via TheFork' },
  { id:'pastel', kicker:'UN PEU DE DOUCEUR', title:'Pastel de nata', description:'Une douceur du Portugal : pâte feuilletée délicate et crème fondante caramélisée.', price:'3,50 €', image:ASSETS.pastel, label:'Photographie fournie par le restaurant' },
  { id:'chicken', kicker:'SELON LE MARCHÉ', title:'Poulet grillé', description:'Le goût des grillades traditionnelles. Proposition de plat du jour, selon disponibilité.', price:'Plat du jour', image:ASSETS.chicken, label:'Photographie du restaurant via TheFork' },
];

export const MENU = {
  'Les spécialités': [
    { name: 'Poulpe grillé', price:'30 €', description:'Une spécialité de la mer' },
    { name: 'Morue maison', price:'23 €', description:'La morue à la façon de la maison' },
    { name: 'Morue grillée', price:'23 €', description:'La tradition portugaise' },
    { name: 'Francesinha', price:'19,95 €', description:'Veau, chorizo, saucisses, jambon, fromage, œuf, sauce et frites' },
  ],
  'Les viandes': [
    { name: 'Bitoque', price:'19,95 €', description:'Bœuf, jambon, œuf au plat, riz, frites et salade' },
    { name: 'Brochette de picanha', price:'25 €', description:'Haricots noirs, riz et légumes' },
    { name: 'Brochette de filet mignon', price:'26 €', description:'Pommes de terre maison et légumes' },
    { name: 'Faux-filet', price:'23 €', description:'Avec légumes et frites' },
  ],
  'Le midi': [
    { name: 'Plat du jour', price:'14,95 €', description:'Selon la sélection du jour' },
    { name: 'Entrée + plat', price:'16,95 €', description:'Formule déjeuner' },
    { name: 'Plat + dessert', price:'16,95 €', description:'Formule déjeuner' },
    { name: 'Entrée + plat + dessert', price:'19,95 €', description:'Formule complète' },
  ],
  'Les douceurs': [
    { name: 'Pastel de nata', price:'3,50 €', description:'La petite tartelette portugaise' },
    { name: 'Gâteau aux biscuits', price:'3,50 €', description:'Douceur maison' },
    { name: 'Pudding', price:'3,50 €', description:'Un classique gourmand' },
  ],
};

export const HOURS = [
  ['Lundi', 'Fermé'],
  ['Mardi', '11h30 — 14h30'],
  ['Mercredi', '11h30 — 14h30'],
  ['Jeudi', '11h30 — 14h30'],
  ['Vendredi', '11h30 — 14h30 · 19h00 — 22h00'],
  ['Samedi', '12h00 — 15h00 · 19h00 — 22h00'],
  ['Dimanche', '12h00 — 15h00'],
];
