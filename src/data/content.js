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
    {
      title: 'Exploration Septième Séance',
      date: '2024',
      image: 'src/assets/talkie/apprentissage.jpg',
      type: 'freelance',
      modalText: 'Moodboard photo et traitements d’images autour de Septième Séance.',
      media: [
        {
          type: 'image',
          src: 'src/assets/talkie/apprentissage.jpg',
          alt: 'Exploration visuelle Septième Séance'
        },
        {
          type: 'image',
          src: 'https://placehold.co/1400x900/262626/f5f5f5?text=Septieme+Shot+2',
          alt: 'UI secondaire Septième Séance'
        }
      ]
    },
    {
      title: 'Prototype Alpine HUD',
      date: '2023',
      image: 'https://placehold.co/400x600/0a2740/ffffff?text=Alpine',
      modalText: 'Essais d’animations tête haute pour l’Alpine A110 fictive.',
      media: [
        {
          type: 'video',
          src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
          alt: 'Prototype Alpine HUD'
        },
        {
          type: 'image',
          src: 'https://placehold.co/1400x900/143d66/ffffff?text=HUD+State',
          alt: 'Variation du HUD Alpine'
        }
      ]
    },
    {
      title: 'Set de pictos',
      date: '2022',
      image: 'https://placehold.co/400x600/333333/eeeeee?text=Icons',
      modalText: 'Petite série de pictogrammes pour un design system interne.',
      media: [
        {
          type: 'image',
          src: 'https://placehold.co/1400x900/222222/f9f9f9?text=Pictos',
          alt: 'Planche de pictogrammes'
        }
      ]
    }
  ],
  [
    {
      title: 'Talkie Cards',
      date: '2024',
      image: 'https://placehold.co/400x600/6a00ff/ffffff?text=Talkie',
      modalText: 'Exploration d’un format de cartes interactives pour Talkie.',
      type: 'freelance',
      media: [
        {
          type: 'image',
          src: 'https://placehold.co/1400x900/4400aa/ffffff?text=Talkie+1',
          alt: 'Carte Talkie 1'
        },
        {
          type: 'image',
          src: 'https://placehold.co/1400x900/6a00ff/ffffff?text=Talkie+2',
          alt: 'Carte Talkie 2'
        },
        {
          type: 'video',
          src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
          alt: 'Interaction Talkie'
        }
      ]
    },
    {
      title: 'Typo Study',
      date: '2023',
      image: 'https://placehold.co/400x600/000000/ffffff?text=Typo',
      modalText: 'Recherche typographique sur une grille variable.',
      media: [
        {
          type: 'image',
          src: 'https://placehold.co/1400x900/000000/ffffff?text=Typo+Study',
          alt: 'Set typographique'
        }
      ]
    }
  ],
  [
    {
      title: 'Nehomia',
      date: '2025',
      image: 'src/assets/playground/nehomia.jpg',
      modalText: 'Webdesign',
      media: [
        {
          type: 'image',
          src: 'src/assets/playground/nehomia.jpg',
          alt: 'Webdesign'
        }
      ]
    },
    {
      title: 'Palette Talkie',
      date: '2024',
      image: 'https://placehold.co/400x600/fad400/111111?text=Palette',
      modalText: 'Palette secondaire imaginée pour Talkie.',
      media: [
        {
          type: 'image',
          src: 'https://placehold.co/1400x900/fad400/1c1c1c?text=Palette',
          alt: 'Palette colorée'
        }
      ]
    },
    {
      title: 'Affiche perso',
      date: '2021',
      image: 'https://placehold.co/400x600/ff5a5f/ffffff?text=Affiche',
      type: 'freelance',
      modalText: 'Affiche perso imprimée en risographie.',
      media: [
        {
          type: 'image',
          src: 'https://placehold.co/1400x900/ff5a5f/ffffff?text=Affiche+1',
          alt: 'Affiche version 1'
        },
        {
          type: 'image',
          src: 'https://placehold.co/1400x900/bb1a1f/ffffff?text=Affiche+detail',
          alt: 'Détail affiche'
        }
      ]
    }
  ],
  [
    {
      title: 'Shot caméra',
      date: '2020',
      image: 'https://placehold.co/400x600/151515/eeeeee?text=Shot',
      modalText: 'Testing photo et colorimétrie sur une scène interior design.',
      media: [
        {
          type: 'image',
          src: 'https://placehold.co/1400x900/151515/eeeeee?text=Shot',
          alt: 'Shot caméra'
        }
      ]
    }
  ]
]
