<template>
  <component :is="wrapperTag" v-bind="wrapperAttrs">
    <div class="link">
      <div :class="['link__label', { 'text--secondary': secondary }]">
        <p>{{ label }}</p>
        <svg
          v-if="external"
          class="link__icon"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4H6C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3H11.5C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5V9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
          />
        </svg>
        <slot v-else />
      </div>
      <div class="link__border"></div>
      <div class="link__border--hover"></div>
    </div>
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  href: {
    type: String,
    default: null
  },
  to: {
    type: [String, Object],
    default: null
  },
  label: {
    type: String,
    required: true
  },
  secondary: {
    type: Boolean,
    default: false
  },
  target: {
    type: String,
    default: null
  },
  rel: {
    type: String,
    default: null
  },
  external: {
    type: Boolean,
    default: false
  }
})

const wrapperTag = computed(() => {
  if (props.to) return RouterLink
  if (props.href) return 'a'
  return 'div'
})

const wrapperAttrs = computed(() => {
  if (props.to) {
    return {
      to: props.to,
      'data-link': true
    }
  }

  if (props.href) {
    const attrs = {
      href: props.href
    }

    if (props.external) {
      attrs.target = '_blank'
      attrs.rel = 'noreferrer noopener'
    } else {
      if (props.target) attrs.target = props.target
      if (props.rel) attrs.rel = props.rel
    }

    return attrs
  }

  return {
    role: 'link',
    tabindex: 0
  }
})
</script>

<style>
.link {
  overflow: hidden;

  & .link__label {
    display: flex;
    flex-direction: row;
    gap: 0.125rem;
    color: inherit;
    transition: color 0.4s ease;

    & p {
      color: inherit;
      transition: color 0.4s ease;
    }

    & .link__icon {
      width: 16px;
      height: 16px;
      fill: currentColor;
      transition: fill 0.4s ease;
    }
  }

  & .link__label.text--secondary {
    color: var(--secondary);
  }

  & .link__border {
    width: 100%;
    height: 1px;
    background-color: var(--inactive);
  }

  & .link__border--hover {
    width: 100%;
    height: 1px;
    background-color: var(--primary);
    transform: translateX(-100%) translateY(-1px);
    transition: transform 0.4s ease;
  }
}

.link:hover {
  & .link__label {
    color: var(--primary);
  }

  & .link__border--hover {
    transform: translateX(0) translateY(-1px);
  }
}
</style>
