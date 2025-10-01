export const ProductTitle = ({ title, currency, price, className }) => {
  return (
    <div className={className}>
      <h1 className="text-3xl font-semibold tracking-tight lg:text-4xl">{title}</h1>
      {!!price && (
        <p className="mt-2 text-xl">
          {currency}
          {price}
        </p>
      )}
    </div>
  )
}
