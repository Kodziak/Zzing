const REGEX_NUMBERS = /^[0-9]{1,99999999}([,.][0-9]{1,2})?$/;

const Utils = {
  capitalizeFirstLetter: function(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  },

  listID: function() {
    let id = document.querySelectorAll("#savings tr");
    return id.length - 1;
  },

  onlyNumbersTest: function(value) {
    if (REGEX_NUMBERS.test(value)) {
      return value;
    } else {
      return null;
    }
  }
};

export default Utils;
