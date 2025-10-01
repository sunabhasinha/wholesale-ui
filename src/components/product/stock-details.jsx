import React from "react"


export function ProductStock({product }) {

  return (
    <div className="mt-2 flex items-center gap-2 text-sm">
  {product.available && product.quantity > 0 ? (
    <>
      <span className="inline-flex items-center text-green-600 font-medium">
        <svg
          className="w-4 h-4 mr-1 text-green-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#22c55e" />
          <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        In Stock
      </span>
      <span className="text-gray-500">({product.quantity} available)</span>
    </>
  ) : (
    <span className="inline-flex items-center text-red-600 font-medium">
      <svg
        className="w-4 h-4 mr-1 text-red-500"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#ef4444" />
        <line x1="9" y1="9" x2="15" y2="15" stroke="#fff" strokeWidth="2" />
        <line x1="15" y1="9" x2="9" y2="15" stroke="#fff" strokeWidth="2" />
      </svg>
      Out of Stock
    </span>
  )}
</div>
  )
}