import React from "react"
import DOMPurify from "dompurify"


export function RichText({ data, className }) {
  const sanitizedHtml = DOMPurify.sanitize(data)

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  )
}