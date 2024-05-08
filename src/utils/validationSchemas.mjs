export const createUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage:
        "username must be at least 5 characters with a max of 32 characters",
    },
    notEmpty: {
      errorMessage: "Username cannot be empty!",
    },
    isString: {
      errorMessage: "Username must be string!",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "password cannot be empty!",
    },
    isString: {
      errorMessage: "password must be string!",
    },
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage:
        "password must be at least 5 characters with a max of 32 characters",
    },
  },
  displayName: {
    notEmpty: {
      errorMessage: "displayName cannot be empty!",
    },
  },
};
