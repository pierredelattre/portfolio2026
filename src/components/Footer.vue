<template>
  <footer>
    <div class="projects">
      <a href="#">
        <div class="project--previous">
          <div class="overlay"></div>
          <img src="/src/assets/Frame3288.png" alt="Alt de l'image">
          <p>Projet précédent</p>
          <h3>Projet</h3>
        </div>
      </a>
      <a href="#">
        <div class="project--next">
          <div class="overlay"></div>
          <img src="/src/assets/Frame3288.png" alt="Alt de l'image">
          <p>Projet suivant</p>
          <h3>Projet</h3>
        </div>
      </a>
    </div>
    <div class="footer__infos">
      <div class="footer__liens">
        <h3>Liens</h3>
        <div class="links">
          <LinkItem href="#" label="CV" secondary external />
          <LinkItem href="#" label="Cosmos" secondary external />
          <LinkItem href="#" label="Are.na" secondary external />
        </div>
      </div>
      <div class="footer__email">
        <h3>Email</h3>
        <LinkItem href="mailto:hello@pierredelattre.fr" label="hello@pierredelattre.fr" external />
      </div>
      <p class="copyright text--secondary">Portfolio 2025</p>
    </div>
  </footer>
</template>

<script setup>
import LinkItem from './LinkItem.vue'
</script>

<style scoped lang="css">

body:has(.home) footer {
  display: none!important;
}

footer {
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  grid-template-rows: auto auto;
  row-gap: 4rem;
  gap: 4rem;
  padding-bottom: 4rem;

  & .footer__liens,
  & .footer__liens .links,
  & .footer__email {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: .25rem;
  }

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  & .projects {
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    grid-template-rows: auto;
    grid-column: 1 / 17;
    grid-row: 1;

    @media screen and (max-width: 768px) {
      display: flex;
      flex-direction: column;
    }

    &>a {
      color: oklch(88% 0 271);
      
      &:hover {
        img {
          transform: scale(1.05);
        }
      }

      &>div {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: .5rem;
        height: 440px;
        overflow: hidden;

        @media screen and (max-width: 768px) {
          height: 280px;
        }

        & .overlay {
          z-index: 1;
          position: absolute;
          object-fit: cover;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background: linear-gradient(0turn, #090909, #09090900);
        }

        & img {
          z-index: 0;
          position: absolute;
          object-fit: cover;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          transition: transform .4s ease;
        }

        &>p,
        &>h3 {
          z-index: 2;
        }

        &>p {
          font-size: .875rem;
        }

        &>h3 {
          font-size: 1.25rem;
        }
      }
    }

    & a:has(.project--previous) {
      grid-column: 1 / 9;
    }

    & a:has(.project--next) {
      grid-column: 9 / 17;
    }
  }

  & .footer__infos {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    grid-column: 9 / 17;

    &>div {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    @media screen and (max-width: 768px) {
      padding: 1rem;
    }
  }
}
</style>
