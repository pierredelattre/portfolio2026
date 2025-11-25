import septiemeCover from '@/assets/septiemeseance/002.jpg'
import alpinePlaceholder from '@/assets/alpine/visu-alpine.jpg'
import projetPlaceholder from '@/assets/placeholder.png'
import talkiePlaceholder from '@/assets/talkie/banner.jpg'

export const works = [
  {
    id: 'septiemeseance',
    title: 'Septième Séance',
    intro:
      'Plateforme en ligne permettant de consulter rapidement les séances de cinéma autour de soi et de parcourir les films actuellement à l’affiche.',
    description:
      'Septième Séance est une plateforme qui permet de trouver rapidement les séances de cinéma autour de soi et d’explorer les films à l’affiche. L’objectif est de proposer une expérience simple, rapide et adaptée au mobile, loin de la complexité des services existants.',
    services: ['Recherche utilisateur', 'UI Design', 'UI Kit', 'Front-end'],
    team: [{ label: 'Mathieu Lefebvre', href: 'https://bento.me/matlfb', external: true }],
    links: [{ label: 'septiemeseance.fr', href: 'https://septiemeseance.fr', secondary: true, external: true }],
    tags: ['Freelance', 'UX/UI Design', 'Front-end'],
    cover: septiemeCover,
    route: '/projet/septiemeseance',
    type: 'freelance'
  },
  {
    id: 'projet',
    title: 'Projet',
    intro:
      'Lorem ipsum dolor sit amet consectetur. Tellus sit odio duis mattis enim ipsum. Lorem placerat amet augue arcu curabitur duis non eu.',
    description:
      'Lorem ipsum dolor sit amet consectetur. Enim integer sapien erat bibendum cursus lacus nec. Augue sit elit morbi consectetur lacus leo ullamcorper. Ornare proin viverra malesuada phasellus leo rhoncus. Egestas natoque condimentum massa pellentesque.',
    services: ['UX Research', 'UI Design'],
    team: [{ label: 'Freelance', href: '#', external: true }],
    links: [{ label: 'Lien d\'exemple', href: '#', secondary: true, external: true }],
    tags: ['UI Design'],
    cover: projetPlaceholder,
    route: '/projet/projet',
    type: 'freelance'
  },
  {
    id: 'talkie',
    title: 'Talkie',
    intro:
      'Talkie est une application d’apprentissage des langues pensée pour rendre la progression plus ludique, personnalisée et immersive grâce à des cours interactifs, des quêtes, du multijoueur et un design system complet.',
    description:
      'Nous avons imaginé Talkie comme une alternative moderne aux applications classiques de langue : plus vivante, plus flexible et ancrée dans des scénarios réels, avec une dimension sociale forte. Le projet inclut l’UX research complète, l’architecture produit, les maquettes, ainsi que la création d’un design system documenté.',
    services: ['Recherche utilisateur', 'UI Design', 'Design system'],
    team: [{ label: 'Grégoire De Gaiffier', href: 'https://gregoiredegaiffier.be/', external: true }],
    links: [{ label: 'Design system', href: 'https://zeroheight.com/638c688b2/p/946500-talkie', secondary: true, external: true }],
    tags: ['École', 'UX/UI Design', 'Design system'],
    cover: talkiePlaceholder,
    route: '/projet/talkie',
    type: 'school'
  },
  {
    id: 'alpine',
    title: 'Alpine Infotainment',
    intro:
      'Conception d’un infodivertissement complet pour une Alpine A110 électrique fictive, pensé pour refléter l’identité de la marque et accompagner le conducteur.',
    description:
      'Réalisation d’une interface complète dédiée à une voiture fictive : l’Alpine A110 électrique. Proposition d’un infodivertissement adapté au conducteur de la voiture & à la marque. L’interface possède des accès aux fonctionnalités de base : GPS, gestion voiture, climatisation, réglages, téléphonie, musique, connectivité & un bouton warning obligatoire. Trois scénarios sont travaillés : le paramétrage d’un trajet sur le GPS, passer un appel & mettre de la musique, choisir une playlist ou encore sélectionner un album.',
    services: ['UI Design', 'UI Kit'],
    team: [],
    links: [],
    tags: ['École', 'UI Design'],
    cover: alpinePlaceholder,
    route: '/projet/alpine',
    type: 'school'
  }
]

export const playgroundColumns = [
  [
    { title: 'Item', date: 'Date', image: 'https://placehold.co/400x600/EEE/31343C', type: 'freelance' },
    { title: 'Item', date: 'Date', image: 'https://placehold.co/400x600/EEE/31343C' },
    { title: 'Item', date: 'Date', image: 'https://placehold.co/400x600/EEE/31343C' }
  ],
  [
    { title: 'Item', date: 'Date', image: 'https://placehold.co/400x600/EEE/31343C' },
    { title: 'Item', date: 'Date', image: 'https://placehold.co/400x600/EEE/31343C', type: 'freelance' }
  ],
  [
    { title: 'Item', date: 'Date', image: 'https://placehold.co/400x600/EEE/31343C' },
    { title: 'Item', date: 'Date', image: 'https://placehold.co/400x600/EEE/31343C' },
    { title: 'Item', date: 'Date', image: 'https://placehold.co/400x600/EEE/31343C', type: 'freelance' }
  ],
  [
    { title: 'Item', date: 'Date', image: 'https://placehold.co/400x600/EEE/31343C' }
  ]
]
