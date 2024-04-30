export function formatMoney(money) {
  // Check if money is not a number or is null/undefined
  if (isNaN(money) || money == null) {
    return "N/A"; // Return a default value or handle accordingly
  }

  // Convert money to a string
  const moneyString = money.toString();

  // Use regular expression to insert commas
  return moneyString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
