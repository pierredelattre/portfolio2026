export const resolveOptimizedImageSrc = (asset) => {
  if (!asset) return ''

  if (typeof asset === 'string') {
    return asset
  }

  if (typeof asset === 'object') {
    if (asset?.img?.src) {
      return asset.img.src
    }

    if (asset?.src) {
      return asset.src
    }
  }

  return ''
}
