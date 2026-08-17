// function path(root, sublink) {
//   return `${root}${sublink}`;
// }


const ROOT = "/";

export const PATH_AUTH = {
  root: ROOT,
  logIn: "/login",
  signIn: "/signin",
  signUp: "/signup",
  verify: "/verify",
  forgotPassword: "/forgot-password",
  otp: "/otp",
  resetNewPassword: "/reset-new-password",
  resetPassword: "/reset-password",
  privacyPolicy: "/privacy-policy",
  termsAndConditions: "/terms-and-condition",
  blog: "/blog",
  spas: "/spas",
  spasLocation: "/spas/location",
  services: "/services",
  aboutUs: "/about-us",
  contactUs: "/contact-us",
  comingSoonTo: "/coming-soon-to",
  howItWork: "/how-it-work",
  forBusinesses: "/for-businesses",
  faqs: "/faqs",
  reviews: "/reviews",

};

export const PATH_DASHBOARD = {
  profileService: "/profile-services",
  selectProfile: "/select-profile",
  therapistsProfile: "/therapists-profile",
  therapistManagement: "/therapists-profile/:id",
  serviceProvider: "/service-provider",
  employeeHours: "/employee-hours",
  subscriptions: "/subscriptions",
  appointments: "/appointments",
  faq: "/faq",
  insights: "/insights",
  notification: "/notification",
  blog: "/blog",
  spas: "/spas",
  services: "/services",
  seeOtherCities: "/see-other-cities",
  getStarted: "/get-started",
  apps: "/apps",
  appsPayroll: "/apps/payroll",
  appsClients: "/apps/clients",
  // privacyPolicy: "/privacyPolicy",
};

export const PATH_POS = {
  checkout: "/checkout",
  list: "/pos-list",
  add: "/add",
  pos: "/pos",
  inventory: "/pos-inventory",
};

export const PATH_SCHEDULER = {
  scheduler: '/scheduler'
};

export const PATH_QUICKBOOKING = {
  quickbooking: "/quickbooking/start-booking",
  completebooking: "/quickbooking/end-booking",
};


export const NEW_DASHBOARD_PATH = {
  dashboard: "/dashboard",
  profile: "/profile",
  notification: "/notifications",
  // privacyPolicy: "/privacyPolicy",
};
