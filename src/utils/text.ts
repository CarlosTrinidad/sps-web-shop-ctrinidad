/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} text - The input string.
 * @returns {string} The string with the first letter capitalized.
 */
export function capitalizeFirstLetter(text: string): string {
    if (!text) {
      return text;
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  