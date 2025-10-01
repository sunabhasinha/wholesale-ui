export function getCookie(name) {
  let cookieValue = " " + document.cookie
  let cookieStart = cookieValue.indexOf(" " + name + "=")
  if (cookieStart === -1) {
    cookieValue = null
  } else {
    cookieStart = cookieValue.indexOf("=", cookieStart) + 1
    let cookieEnd = cookieValue.indexOf(";", cookieStart)
    if (cookieEnd === -1) {
      cookieEnd = cookieValue.length
    }
    cookieValue = unescape(cookieValue.substring(cookieStart, cookieEnd))
  }
  return cookieValue
}
