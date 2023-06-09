function formValidator() {
    // Make quick references to our fields
    var firstName = document.getElementById('firstName');
    var lastName = document.getElementById('lastName');
    var email = document.getElementById('email');
  
    if (notEmpty(firstName, "Please enter your first name")) {
      if (isAlphabet(firstName, "First name must contain letters only")) {
        if (notEmpty(lastName, "Please enter your last name")) {
          if (isAlphabet(lastName, "Last name must contain letters only")) {
            if (emailValidator(email, "Please enter a valid email address")) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  
  // If the length of the element's string is 0 then display helper message
  function notEmpty(elem, helperMsg) {
    if (elem.value.length == 0) {
      alert(helperMsg);
      elem.focus(); // set the focus to this input
      return false;
    }
    return true;
  }
  
  // If the element's string matches the regular expression it is all letters
  function isAlphabet(elem, helperMsg) {
    var alphaExp = /^[a-zA-Z]+$/;
    if (elem.value.match(alphaExp)) {
      return true;
    } else {
      alert(helperMsg);
      elem.focus();
      return false;
    }
  }
  
  function emailValidator(elem, helperMsg) {
    var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
    if (elem.value.match(emailExp)) {
      return true;
    } else {
      alert(helperMsg);
      elem.focus();
      return false;
    }
  }
  