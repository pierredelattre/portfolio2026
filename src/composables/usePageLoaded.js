import { nextTick, onMounted, watch } from 'vue'

export function usePageLoaded(projectBgRef) {
  if (typeof window === 'undefined') return

  let dispatchedOnce = false

  const dispatch = async () => {
    await nextTick()

    document.dispatchEvent(
      new CustomEvent('pageLoaded', {
        detail: {
          projectBg: projectBgRef?.value || ''
        }
      })
    )
  }

  const runDispatch = () => {
    dispatchedOnce = true
    dispatch()
  }

  onMounted(() => {
    if (document.readyState === 'complete') {
      runDispatch()
    } else {
      window.addEventListener(
        'load',
        () => {
          runDispatch()
        },
        { once: true }
      )
    }
  })

  if (projectBgRef) {
    watch(
      projectBgRef,
      () => {
        if (!dispatchedOnce) return
        dispatch()
      },
      { flush: 'post' }
    )
  }
}
