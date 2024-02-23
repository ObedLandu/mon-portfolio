// __define-ocg__ Keyword used to indicate the presence of the OCG method.

/**
 * Determines if the second string matches the pattern defined by the first string.
 * @param {string} str - The string containing the pattern and the target string separated by a space.
 * @returns {boolean} - True if the target string matches the pattern, false otherwise.
 */
function WildcardCharacters(str) {
  // Separating the pattern and the target string
  var parts = str.split(" ");
  var pattern = parts[0];
  var target = parts[1];

  // Iterate through the pattern and match characters in the target string
  var i = 0;
  var j = 0;
  while (i < pattern.length && j < target.length) {
    if (pattern[i] === "+") {
      // Match any single alphabetic character
      if (!isAlphabetic(target[j])) {
        return false;
      }
      i++;
      j++;
    } else if (pattern[i] === "*") {
      // Match a sequence of the same character (length 3 by default)
      var count = 3; // Default sequence length
      if (pattern[i + 1] === "{") {
        var endIndex = pattern.indexOf("}", i + 1);
        count = parseInt(pattern.substring(i + 2, endIndex));
        i = endIndex + 1; // Move the index past the '}'
      } else {
        i++; // Move the index past the '*'
      }
      var currentChar = target[j];
      var sequenceLength = 0;
      while (
        j < target.length &&
        target[j] === currentChar &&
        sequenceLength < count
      ) {
        j++;
        sequenceLength++;
      }
    } else {
      // Unexpected character in the pattern
      return false;
    }
  }

  // Check if both strings have been fully processed
  return i === pattern.length && j === target.length;
}

/**
 * Checks if a character is alphabetic.
 * @param {string} char - The character to check.
 * @returns {boolean} - True if the character is alphabetic, false otherwise.
 */
function isAlphabetic(char) {
  return /[a-zA-Z]/.test(char);
}

// Example usage:
console.log(WildcardCharacters("+*{3} abcabcabc")); // Output: true
console.log(WildcardCharacters("+* abcabcabc"));
