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
    id: 'talkie',
    title: 'Talkie',
    intro:
      'Talkie est une application d’apprentissage des langues pensée pour rendre la progression plus ludique, personnalisée et immersive grâce à des cours interactifs, des quêtes, du multijoueur et un design system complet.',
    description:
      'Nous avons imaginé Talkie comme une alternative moderne aux applications classiques de langue : plus vivante, plus flexible et ancrée dans des scénarios réels, avec une dimension sociale forte. Le projet inclut l’UX research complète, l’architecture produit, les maquettes, ainsi que la création d’un design system documenté.',
    services: ['Recherche utilisateur', 'UI Design', 'Design system'],
    team: [{ label: 'Grégoire De Gaiffier', href: 'https://gregoiredegaiffier.be/', external: true }],
    links: [],
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

import nehomia from '@/assets/playground/nehomia.jpg'

import gayaMobile from '@/assets/playground/gaya-mobile.jpg'
import gayaDesktop from '@/assets/playground/gaya-desk.jpg'

import flim from '@/assets/playground/flim.jpg'
import flimLive from '@/assets/playground/flim-live.jpg'

import baron from '@/assets/playground/baron-1.jpg'
import baron2 from '@/assets/playground/baron-2.jpg'
import baron3 from '@/assets/playground/baron-3.jpg'
import baron4 from '@/assets/playground/baron-4.jpg'


import rvrs from '@/assets/playground/rvrs.jpg'

import mag from '@/assets/playground/magazine.jpg'
import mag2 from '@/assets/playground/magazine-2.jpg'

export const playgroundColumns = [
  [
    {
      title: 'Flim',
      image: flim,
      color: 'surface',
      modalText: 'Application de réservation de séances cinéma',
      media: [
        {
          type: 'image',
          src: flim,
          alt: 'Flim - Réservations de séances de films'
        },
        {
          type: 'image',
          src: flimLive,
          alt: 'Flim - Live Activity iOS'
        }
      ]
    }
  ],
  [
    {
      title: 'Gayacoin',
      image: gayaMobile,
      modalText: 'Gayacoin App & section web',
      media: [
        {
          type: 'image',
          src: gayaMobile,
          alt: 'Gayacoin App'
        },
        {
          type: 'image',
          src: gayaDesktop,
          alt: 'Gayacoin Website section'
        }
      ]
    }
  ],
  [
    {
      title: 'Au Baron',
      image: baron2,
      color: 'surface',
      modalText: 'École – Proposition d\'une solution e-commerce pour la brasserie Au Baron. Page produit, cross-sells, upsells, préférences gustatives...',
      media: [
        {
          type: 'image',
          src: baron2,
          alt: 'Sommaire de la page produit'
        },
        {
          type: 'image',
          src: baron4,
          alt: 'Page produit mobile'
        },
        {
          type: 'image',
          src: baron,
          alt: 'Cross-sells'
        },
        {
          type: 'image',
          src: baron3,
          alt: 'Up-sells & questionnaire des préférences'
        }
      ]
    },
    {
      title: 'Nehomia',
      image: nehomia,
      modalText: 'Homepage concept for Nehomia',
      color: 'surface',
      media: [
        {
          type: 'image',
          src: nehomia,
          alt: 'Homepage Nehomia'
        }
      ]
    }
  ],
  [
    {
      title: 'RVRS',
      image: rvrs,
      color: 'surface',
      modalText: 'École - Conception & intégration d\'un site e-commerce via Framer pour un produit fictif',
      media: [
        {
          type: 'image',
          src: rvrs,
          alt: 'Site RVRS'
        }
      ]
    },
    {
      title: 'Magazine',
      image: mag,
      color: 'surface',
      modalText: 'École - Conception d\'une application de moodboard propulsé par IA - Avec Adrien BAELEN',
      media: [
        {
          type: 'image',
          src: mag,
          alt: 'Site RVRS'
        },
        {
          type: 'image',
          src: mag2,
          alt: 'Site RVRS'
        }
      ]
    }
  ]
]
