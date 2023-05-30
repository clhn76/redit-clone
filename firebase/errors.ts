const FIREBASE_ERRORS = {
  "Firebase: Password should be at least 6 characters (auth/weak-password).":
    "Password should be at least 6 characters!",
  "Firebase: Error (auth/email-already-in-use).":
    "User with that email already exists!",
  "Firebase: Error (auth/user-not-found).": "Invalid email or password",
  "Firebase: Error (auth/wrong-password).": "Invalid email or password",
};

export function filterFirebaseErrors(errorMessage: string | undefined) {
  return (
    FIREBASE_ERRORS[errorMessage as keyof typeof FIREBASE_ERRORS] ||
    errorMessage
  );
}
