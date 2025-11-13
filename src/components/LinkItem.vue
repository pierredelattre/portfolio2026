<template>
  <component :is="wrapperTag" v-bind="wrapperAttrs">
    <div class="link">
      <div :class="['link__label', { 'text--secondary': secondary }]">
        <p>{{ label }}</p>
        <slot />
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

    if (props.target) attrs.target = props.target
    if (props.rel) attrs.rel = props.rel

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

    & svg {
      width: 16px;
      height: 16px;
      fill: var(--primary);
      transition: fill 0.4s ease;
    }

    & p {
      transition: color 0.4s ease;
    }
  }

  & .link__label.text--secondary {
    & p {
      color: var(--secondary);
    }

    & svg {
      fill: var(--secondary);
    }
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
    & p {
      color: var(--primary);
    }

    & svg {
      fill: var(--primary);
    }
  }

  & .link__border--hover {
    transform: translateX(0) translateY(-1px);
  }
}
</style>
