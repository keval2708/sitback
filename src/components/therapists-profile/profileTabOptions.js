export const NOTIFICATION_DEFAULTS = {
  smsOnlineBookings: true,
  smsOtherBookings: true,
  emailOnlineBookings: true,
  desktopPhoneCall: false,
  desktopWebsiteChat: false,
};

export const NOTIFICATION_SECTIONS = [
  {
    titleKey: "sendSmsWhen",
    items: [
      {
        key: "smsOnlineBookings",
        labelKey: "notifSmsOnlineBookings",
      },
      {
        key: "smsOtherBookings",
        labelKey: "notifSmsOtherBookings",
      },
    ],
  },
  {
    titleKey: "sendEmailWhen",
    items: [
      {
        key: "emailOnlineBookings",
        labelKey: "notifEmailOnlineBookings",
      },
    ],
  },
  {
    titleKey: "sendDesktopNotificationWhen",
    items: [
      {
        key: "desktopPhoneCall",
        labelKey: "notifDesktopPhoneCall",
        disabled: true,
        helperTextKey: "notifDesktopUserSettingsHint",
      },
      {
        key: "desktopWebsiteChat",
        labelKey: "notifDesktopWebsiteChat",
        disabled: true,
        helperTextKey: "notifDesktopUserSettingsHint",
      },
    ],
  },
];

export const PERMISSION_DEFAULTS = {
  changeAppointmentStatus: true,
  bookChangeOwnAppointments: false,
  viewOthersCalendar: true,
  bookChangeOthersAppointments: true,
  createChangeOwnTimeBlocks: false,
  createChangeOthersTimeBlocks: true,
  manageWaitlist: true,
};

export const PERMISSION_SECTIONS = [
  {
    titleKey: "calendar",
    items: [
      {
        key: "changeAppointmentStatus",
        labelKey: "permChangeAppointmentStatus",
        descriptionKey: "permChangeAppointmentStatusDesc",
      },
      {
        key: "bookChangeOwnAppointments",
        labelKey: "permBookChangeOwnAppointments",
        descriptionKey: "permBookChangeOwnAppointmentsDesc",
      },
      {
        key: "viewOthersCalendar",
        labelKey: "permViewOthersCalendar",
        descriptionKey: "permViewOthersCalendarDesc",
      },
      {
        key: "bookChangeOthersAppointments",
        labelKey: "permBookChangeOthersAppointments",
        descriptionKey: "permBookChangeOthersAppointmentsDesc",
      },
      {
        key: "createChangeOwnTimeBlocks",
        labelKey: "permCreateChangeOwnTimeBlocks",
        descriptionKey: "permCreateChangeOwnTimeBlocksDesc",
      },
      {
        key: "createChangeOthersTimeBlocks",
        labelKey: "permCreateChangeOthersTimeBlocks",
        descriptionKey: "permCreateChangeOthersTimeBlocksDesc",
      },
      {
        key: "manageWaitlist",
        labelKey: "permManageWaitlist",
        descriptionKey: "permManageWaitlistDesc",
      },
    ],
  },
];
