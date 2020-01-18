module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === '') {
    errors.username = 'Username is required ';
  }
  if (!username.match(/^[0-9A-Za-z\-\_]+$/)) {
    errors.username =
      'Username must contain letters, numbers, dashes, and underscores only';
    // }
  }
  if (email.trim() === '') {
    errors.email = 'Email is required ';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

    if (!email.match(regEx)) {
      errors.email = 'Email must be a valiid email address';
    }
  }
  if (!password.match(/.{6,}/)) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (password === '') {
    errors.password = 'Password is required';
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};

  if (username.trim() === '') {
    errors.username = 'Username is required ';
  }

  if (password.trim() === '') {
    errors.password = 'Password is required ';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};
