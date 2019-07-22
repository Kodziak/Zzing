const REGEX_NUMBERS = /^[0-9]{1,2}([,.][0-9]{1,2})?$/;

const Utils = {
  capitalizeFirstLetter: function(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  },

  listID: function() {
    let id = document.querySelectorAll("#savings li");
    return id.length;
  },

  onlyNumbersTest: function(value) {
    if (REGEX_NUMBERS.test(value)) {
      return value;
    }
  }
};

export default Utils;
