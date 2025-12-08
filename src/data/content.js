import septiemeCover from '@/assets/septiemeseance/002.jpg?optimized&w=1600;1920;2560;3200&quality=96&lossless=true'
import alpinePlaceholder from '@/assets/alpine/visu-alpine.jpg?optimized'
import projetPlaceholder from '@/assets/placeholder.png?optimized'
import talkiePlaceholder from '@/assets/talkie/banner.jpg?optimized'

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

import nehomia from '@/assets/playground/nehomia.jpg?optimized'
import nehomiaMobile from '@/assets/playground/mobile-nehomia.jpg?optimized'

import photo from '@/assets/playground/photo.jpg?optimized'
import photoMobile from '@/assets/playground/mobile-photo.jpg?optimized'
import photo2 from '@/assets/playground/photo2.jpg?optimized'
import photo2Mobile from '@/assets/playground/mobile-photo2.jpg?optimized'

import gayaMobile from '@/assets/playground/gaya-mobile.jpg?optimized'
import gayaDesktop from '@/assets/playground/gaya-desk.jpg?optimized'

import flim from '@/assets/playground/flim.jpg?optimized'
import flimMobile from '@/assets/playground/mobile-flim.jpg?optimized'
import flimLive from '@/assets/playground/flim-live.jpg?optimized'

import baron from '@/assets/playground/baron-1.jpg?optimized'
import baronDesk from '@/assets/playground/desk-baron-1.jpg?optimized'
import baron2 from '@/assets/playground/baron-2.jpg?optimized'
import baron2Desk from '@/assets/playground/desk-baron-2.jpg?optimized'
import baron3 from '@/assets/playground/baron-3.jpg?optimized'
import baron3Mobile from '@/assets/playground/mobile-baron-3.jpg?optimized'
import baron4 from '@/assets/playground/baron-4.jpg?optimized'
import baron4Mobile from '@/assets/playground/mobile-baron-4.jpg?optimized'


import rvrs from '@/assets/playground/rvrs.jpg?optimized'
import rvrsMobile from '@/assets/playground/mobile-rvrs.jpg?optimized'

import anki from '@/assets/playground/anki.jpg?optimized'
import ankiMobile from '@/assets/playground/mobile-anki.jpg?optimized'
import ankiDesk from '@/assets/playground/desk-anki.jpg?optimized'

import mag from '@/assets/playground/magazine.jpg?optimized'
import mag2 from '@/assets/playground/magazine-2.jpg?optimized'
import magMobile from '@/assets/playground/mobile-magazine.jpg?optimized'
import mag2Mobile from '@/assets/playground/mobile-magazine-2.jpg?optimized'

export const playgroundColumns = [
  [
    {
      title: 'Camera App',
      image: photo,
      color: 'dark',
      media: [
        {
          type: 'image',
          src: photo,
          mobileSrc: photoMobile,
          alt: 'Camera app & Bibliothèque'
        },
        {
          type: 'image',
          src: photo2,
          mobileSrc: photo2Mobile,
          alt: 'Landscape'
        }
      ]
    },
    {
      title: 'RVRS',
      image: rvrs,
      color: 'dark',
      modalText: 'École - Conception & intégration d\'un site e-commerce via Framer pour un produit fictif',
      media: [
        {
          type: 'image',
          src: rvrs,
          mobileSrc: rvrsMobile,
          alt: 'Site RVRS'
        }
      ]
    },
  ],
  [
    {
      title: 'Au Baron',
      image: baron2,
      color: 'dark',
      modalText: 'Proposition d\'une solution e-commerce pour la brasserie Au Baron. Page produit, cross-sells, upsells, préférences gustatives...',
      media: [
        {
          type: 'image',
          src: baron2Desk,
          mobileSrc: baron2,
          alt: 'Sommaire de la page produit'
        },
        {
          type: 'image',
          src: baron4,
          mobileSrc: baron4Mobile,
          alt: 'Page produit mobile'
        },
        {
          type: 'image',
          src: baronDesk,
          mobileSrc: baron,
          alt: 'Cross-sells'
        },
        {
          type: 'image',
          src: baron3,
          mobileSrc: baron3Mobile,
          alt: 'Up-sells & questionnaire des préférences'
        }
      ]
    },
    {
      title: 'Flim',
      image: flim,
      color: 'dark',
      modalText: 'Application de réservation de séances cinéma',
      media: [
        {
          type: 'image',
          src: flim,
          mobileSrc: flimMobile,
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
      color: 'dark',
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
    },
    {
      title: 'Magazine',
      image: mag,
      color: 'dark',
      modalText: 'École - Conception d\'une application de moodboard propulsé par IA - Avec Adrien BAELEN',
      media: [
        {
          type: 'image',
          src: mag,
          mobileSrc: magMobile,
          alt: 'Site RVRS'
        },
        {
          type: 'image',
          src: mag2,
          mobileSrc: mag2Mobile,
          alt: 'Site RVRS'
        }
      ]
    }
  ],
  [
    {
      title: 'Youtube to Anki',
      image: anki,
      color: 'dark',
      modalText: 'Concept d\'extension navigateur - Sauvegarder du vocabulaire issu de Youtube sur une flashcard Anki',
      media: [
        {
          type: 'image',
          src: ankiDesk,
          mobileSrc: ankiMobile,
          alt: 'Concept d\'extension navigateur - Sauvegarder du vocabulaire issu de Youtube sur une flashcard Anki'
        }
      ]
    },
    {
      title: 'Nehomia',
      image: nehomia,
      modalText: 'Homepage concept for Nehomia',
      color: 'dark',
      media: [
        {
          type: 'image',
          src: nehomia,
          mobileSrc: nehomiaMobile,
          alt: 'Homepage Nehomia'
        }
      ]
    }
  ]
]
