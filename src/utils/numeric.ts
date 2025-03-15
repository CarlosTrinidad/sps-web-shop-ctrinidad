/**
 * Formats a number as a currency string.
 *
 * @param {number} amount - The amount to format.
 * @param {string} currencyCode - The currency code (e.g., 'USD', 'EUR', 'GBP').
 * @param {string} locale - The locale to use for formatting (e.g., 'en-US', 'es-ES').
 * @param {Intl.NumberFormatOptions} options - Optional formatting options.
 * @returns {string} The formatted currency string.
 */
export function formatCurrency(
  amount: number,
  currencyCode: string,
  locale: string,
  options?: Intl.NumberFormatOptions
): string {
  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      ...options, // Allow overriding default options
    });
    return formatter.format(amount);
  } catch (error) {
    console.error("Error formatting currency:", error);
    return amount.toFixed(2); // Fallback to a basic format in case of errors
  }
}
