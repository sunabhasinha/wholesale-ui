
export function removeOptionsFromUrl(pathname) {
  const colorPattern = /-color_([0-9a-zA-Z\s]+)/i

  return decodeURIComponent(pathname).replace(colorPattern, "")
}
