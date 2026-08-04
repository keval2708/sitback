export const TOAST_ALERTS = {
  LOGIN_SUCCESS: "Login Successfully",
  LOGOUT_SUCCESS: "Logout Successfully",
  OTP_SENT_SUCCESS: "OTP Sent Successfully",
  PASSWORD_CHANGE_SUCCESS: "Password changed successfully",
  PASSWORD_RESET_SUCCESS: "Password reset successfully",

  VIDEO_UPLOAD_SUCCESS: "Video uploaded successfully!",
  VIDEO_SIZE_ALERT: "Video size must be less than 200 MB!",
  VIDEO_LENGTH_ALERT: "Video duration must be less than 5 minutes",

  COMMENT_ADDED_SUCCESS: "Comment added successfully",
  COMMENT_DELETE_SUCCESS: "Comment deleted successfully",

  PROFILE_UPDATE_SUCCESS: "Profile updated successfully",

  NOTIFICATION_UPDATE_SUCCESS: "Notification updated successfully!",
  NOTIFICATION_DELETED_SUCCESS: "Notification deleted successfully!",

  GENERAL_ERROR: "Oops! Something went wrong",

  SUBSCRIPTION_ERROR: "You have reached the maximum number of services based on your current subscription.",
};

export const TOAST_TYPES = {
  SUCCESS: "success",
  WARN: "warn",
  INFO: "info",
  ERROR: "error",
};

export const STORAGE_KEYS = {
  FORGET_EMAIL: "forget_email",
};

export const SECURE_KEYS = {
  FORGET_EMAIL: "@forget_email",
};

export const userDummyImage = `${process.env.S3_BUCKET_URL}/dummyImage/userDummyImage.png`;

export const SUBSCRIPTION_VALUE = {
  "Testing Plan": 5,
  Basic: 10,
  Pro: 20,
  Premium: 30,
  "Dashboard Access": 150,
  "Video Spotlight": 49.99,
  "Featured Spa": 199,

}

export const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      backgroundColor: "transparent", // Set the background color
      fontSize: '16px',
      color: '#295086', // Text color
      '::placeholder': {
        color: '#29508699', // Placeholder text color
      },
    },
    invalid: {
      color: '#fa755a', // Styling for invalid input
    },
  },
};

export const CARD_CVC_OPTIONS = {
  style: {
    base: {
      backgroundColor: "transparent", // Set the background color
      fontSize: '16px',
      color: '#295086', // Text color
      '::placeholder': {
        color: '#29508699', // Placeholder text color
      },
    },
    invalid: {
      color: '#fa755a', // Styling for invalid input
    },
  },
  placeholder: "CVV"
};
