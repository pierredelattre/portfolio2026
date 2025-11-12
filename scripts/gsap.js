if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

window.addEventListener("load", () => {
  setTimeout(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.clearScrollMemory();
    ScrollTrigger.refresh(true);

    gsap.set("#works > *", { opacity: 0, y: 40 });
    gsap.set("#playground > h3", { opacity: 0, y: 40 });
    gsap.set("#playground .col > *", { opacity: 0, y: 40 });

    const header = document.querySelector("header");
    const headerItems = header.querySelectorAll(
      ".header__title, .header__cities, .header__services, .header__email, .header__intro, .header__links"
    );

    gsap.set(header, { height: 0, overflow: "hidden", opacity: 0, paddingTop: 0, paddingBottom: 0 });
    gsap.set(headerItems, { opacity: 0, y: 20 });

    const tl = gsap.timeline({ delay: 0.4 });

    tl.to(header, {
      height: "auto",
      opacity: 1,
      paddingTop: "32px",
      paddingBottom: "32px",
      duration: 1.4,
      ease: "power4.inOut"
    });

    tl.to(headerItems, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power2.out"
    }, "-=0.5");

    tl.to("#works > *", {
      opacity: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.2");

    gsap.to("#playground > h3", {
      scrollTrigger: {
        trigger: "#playground",
        start: "top 80%",
        toggleActions: "play none none none",
        once: true
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    });

    gsap.to("#playground .col > *", {
      scrollTrigger: {
        trigger: "#playground",
        start: "top 75%",
        toggleActions: "play none none none",
        once: true
      },
      opacity: 1,
      y: 0,
      stagger: 0.08,
      duration: 1.2,
      ease: "power3.out"
    });
  }, 10);
});