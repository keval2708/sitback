"use client";

import React from "react";

const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
};

export const MyDetailsIcon = () => (
  <svg {...iconProps}>
    <path
      d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
      stroke="#295086"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 22C20 17.5817 16.4183 14 12 14C7.58172 14 4 17.5817 4 22"
      stroke="#295086"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const NotificationsIcon = () => (
  <svg {...iconProps} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
    <path stroke="#295086" strokeLinecap="round" strokeLinejoin="round" d="M13.065 5.65a5.084 5.084 0 0 0-10.13 0l-.16 1.863A5.3 5.3 0 0 1 2 9.858l-.49.795c-.493.797-.224 1.622.705 1.745 1.063.142 2.837.269 5.785.269s4.722-.127 5.785-.268c.93-.124 1.198-.948.706-1.746L14 9.858a5.3 5.3 0 0 1-.775-2.345z"/><path stroke="#295086" strokeLinecap="round" strokeLinejoin="round" d="M13.065 5.65a5.084 5.084 0 0 0-10.13 0l-.16 1.863A5.3 5.3 0 0 1 2 9.858l-.49.795c-.493.797-.224 1.622.705 1.745 1.063.142 2.837.269 5.785.269s4.722-.127 5.785-.268c.93-.124 1.198-.948.706-1.746L14 9.858a5.3 5.3 0 0 1-.775-2.345z"/><path stroke="#295086" strokeLinecap="round" strokeLinejoin="round" d="M5.35 12.626a2.667 2.667 0 0 0 5.3 0m-9.645-6.96C.95 4.779 1.338 2.6 3.333 1m11.662 4.667c.055-.89-.333-3.067-2.328-4.667"/>
  </svg>
);

export const PermissionsIcon = () => (
  <svg {...iconProps} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
    <g stroke="#295086" strokeLinejoin="round" strokeWidth="1.333" clipPath="url(#a)">
    <path d="m2 3.085 6.003-1.752L14 3.085v3.593A8.77 8.77 0 0 1 8.001 15 8.77 8.77 0 0 1 2 6.676z"/>
    <path strokeLinecap="round" d="M5 7.667 7.333 10l4-4"/></g><defs><clipPath id="a">
    <path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs>
  </svg>
);

export const WorkHoursIcon = () => (
  <svg {...iconProps} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
    <path stroke="#295086" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.333" d="M2.457 10.296a6 6 0 1 1 11.086-4.592 6 6 0 0 1-11.086 4.592"/>
    <path stroke="#295086" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.333" d="M8 4.667V8l2 2"/>
  </svg>
);
