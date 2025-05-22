export const formatCurrency = (
  value: number,
  locale = "en-US",
  currency = "USD"
) => {
  return (value / 100).toLocaleString(locale, {
    style: "currency",
    currency,
  });
};
