// Define the type for the state object
type AuthState = {
  userName: string;
  email: string;
  password: string;
  repassword: string;
};

// Define the type for the error object
type ValidationError = {
  userName?: string;
  email?: string;
  password?: string;
  repassword?: string;
};

const AuthValidator = (
  state: AuthState,
  form = "register"
): ValidationError => {
  const error: ValidationError = {};

  if (form === "login") {
    if (!state.userName.trim()) {
      error.userName = "Please fill in the username";
    }
    if (!state.password.trim()) {
      error.password = "Please fill in the password";
    }
  } else {
    // Validate username
    if (!state.userName.trim()) {
      error.userName = "Please fill in the username";
    }

    // Validate email
    if (!state.email.trim()) {
      error.email = "Please fill in the email";
    } else if (!/^\S+@\S+\.\S+$/.test(state.email)) {
      error.email = "Please enter a valid email address";
    }

    // Validate password
    if (!state.password.trim()) {
      error.password = "Please fill in the password";
    } else if (state.password.length < 6) {
      error.password = "Password must be at least 6 characters long";
    }

    // Validate password confirmation
    if (!state.repassword.trim()) {
      error.repassword = "Please confirm your password";
    } else if (state.password !== state.repassword) {
      error.repassword = "Passwords do not match";
    }
  }

  return error;
};

export default AuthValidator;
