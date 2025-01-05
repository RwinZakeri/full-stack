const validateUserFields = (data, type) => {
  const errors = [];

  if (type === 1) {
    if (
      !data.userName ||
      typeof data.userName !== "string" ||
      data.userName.trim() === ""
    ) {
      errors.push("Invalid username: must be a non-empty string.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      errors.push("Invalid email: must be a valid email address.");
    }

    if (
      !data.password ||
      typeof data.password !== "string" ||
      data.password.length < 8
    ) {
      errors.push("Invalid password: must be at least 8 characters long.");
    }

    if (data.password !== data.respassword) {
      errors.push("Passwords do not match.");
    }
  }else if (type === 2){
    
  }

  return errors;
};

module.exports = validateUserFields;
