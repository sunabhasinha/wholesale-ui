
export function mapCurrencyToSign(currency) {
  switch (currency) {
    case "INR":
      return "₹"
    case "USD":
      return "$"

    default:
      return currency
  }
}
