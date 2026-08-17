"use client";

import React from "react";
import InlineSVG from "svg-inline-react";
import { PATH_DASHBOARD } from "@/routes/paths";
import { MainLayoutWrapper } from "@/styles/global/main.style";
import {
  AppsCard,
  AppsCardCta,
  AppsCardDescription,
  AppsCardIcon,
  AppsCardTitle,
  AppsMarketplace,
  AppsMarketplaceGrid,
  AppsMarketplaceHeader,
  AppsMarketplaceInner,
  AppsMarketplaceSubtitle,
  AppsMarketplaceTitle,
} from "@/styles/pages/apps.style";

const ICONS = {
  gift: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="64" height="64" rx="10" fill="#DFECF9"/>
<path d="M45.3359 32.0013V42.668C45.3359 43.3752 45.055 44.0535 44.5549 44.5536C44.0548 45.0537 43.3765 45.3346 42.6693 45.3346H21.3359C20.6287 45.3346 19.9504 45.0537 19.4503 44.5536C18.9502 44.0535 18.6693 43.3752 18.6693 42.668V32.0013C18.3156 32.0013 17.9765 31.8608 17.7265 31.6108C17.4764 31.3607 17.3359 31.0216 17.3359 30.668V26.668C17.3359 25.9607 17.6169 25.2824 18.117 24.7824C18.6171 24.2823 19.2954 24.0013 20.0026 24.0013H24.2293C24.0786 23.5729 24.0019 23.1221 24.0026 22.668C24.0026 21.6071 24.424 20.5897 25.1742 19.8395C25.9243 19.0894 26.9417 18.668 28.0026 18.668C29.3359 18.668 30.5093 19.3346 31.2426 20.3213V20.308L32.0026 21.3346L32.7626 20.308V20.3213C33.4959 19.3346 34.6693 18.668 36.0026 18.668C37.0635 18.668 38.0809 19.0894 38.831 19.8395C39.5812 20.5897 40.0026 21.6071 40.0026 22.668C40.0033 23.1221 39.9266 23.5729 39.7759 24.0013H44.0026C44.7098 24.0013 45.3881 24.2823 45.8882 24.7824C46.3883 25.2824 46.6693 25.9607 46.6693 26.668V30.668C46.6693 31.0216 46.5288 31.3607 46.2787 31.6108C46.0287 31.8608 45.6896 32.0013 45.3359 32.0013ZM21.3359 42.668H30.6693V32.0013H21.3359V42.668ZM42.6693 42.668V32.0013H33.3359V42.668H42.6693ZM28.0026 21.3346C27.649 21.3346 27.3098 21.4751 27.0598 21.7252C26.8097 21.9752 26.6693 22.3143 26.6693 22.668C26.6693 23.0216 26.8097 23.3607 27.0598 23.6108C27.3098 23.8608 27.649 24.0013 28.0026 24.0013C28.3562 24.0013 28.6954 23.8608 28.9454 23.6108C29.1955 23.3607 29.3359 23.0216 29.3359 22.668C29.3359 22.3143 29.1955 21.9752 28.9454 21.7252C28.6954 21.4751 28.3562 21.3346 28.0026 21.3346ZM36.0026 21.3346C35.649 21.3346 35.3098 21.4751 35.0598 21.7252C34.8097 21.9752 34.6693 22.3143 34.6693 22.668C34.6693 23.0216 34.8097 23.3607 35.0598 23.6108C35.3098 23.8608 35.649 24.0013 36.0026 24.0013C36.3562 24.0013 36.6954 23.8608 36.9454 23.6108C37.1955 23.3607 37.3359 23.0216 37.3359 22.668C37.3359 22.3143 37.1955 21.9752 36.9454 21.7252C36.6954 21.4751 36.3562 21.3346 36.0026 21.3346ZM20.0026 26.668V29.3346H30.6693V26.668H20.0026ZM33.3359 26.668V29.3346H44.0026V26.668H33.3359Z" fill="#295086"/>
</svg>
`,
  packages: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="64" height="64" rx="10" fill="#DFECF9"/>
<path d="M45.3307 25.3346L31.9974 18.668L18.6641 25.3346V38.668L31.9974 45.3346L45.3307 38.668V25.3346Z" stroke="#295086" stroke-width="2.66667" stroke-linejoin="round"/>
<path d="M18.6641 25.3333L31.9974 32M31.9974 32V45.3333M31.9974 32L45.3307 25.3333M38.6641 22L25.3307 28.6667" stroke="#295086" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  client: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="64" height="64" rx="10" fill="#DFECF9"/>
<path d="M37.3307 44.0012V41.3345C37.3307 39.9201 36.7688 38.5635 35.7686 37.5633C34.7684 36.5631 33.4119 36.0012 31.9974 36.0012H23.9974C22.5829 36.0012 21.2264 36.5631 20.2262 37.5633C19.226 38.5635 18.6641 39.9201 18.6641 41.3345V44.0012M37.3307 20.1719C38.4744 20.4684 39.4873 21.1362 40.2103 22.0706C40.9334 23.005 41.3257 24.1531 41.3257 25.3345C41.3257 26.516 40.9334 27.6641 40.2103 28.5985C39.4873 29.5329 38.4744 30.2007 37.3307 30.4972M45.3307 44.0012V41.3345C45.3298 40.1528 44.9365 39.0049 44.2126 38.071C43.4886 37.137 42.4749 36.47 41.3307 36.1745" stroke="#295086" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M27.9974 30.6667C30.9429 30.6667 33.3307 28.2789 33.3307 25.3333C33.3307 22.3878 30.9429 20 27.9974 20C25.0519 20 22.6641 22.3878 22.6641 25.3333C22.6641 28.2789 25.0519 30.6667 27.9974 30.6667Z" stroke="#295086" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  campaigns: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="64" height="64" rx="10" fill="#DFECF9"/>
<path d="M44.7597 20.2406C44.5832 20.1169 44.3788 20.0387 44.1648 20.0131C43.9508 19.9876 43.7337 20.0153 43.533 20.0939L26.4264 26.6673H21.3464C19.8797 26.6673 18.6797 27.8673 18.6797 29.3339V34.6673C18.6797 36.1339 19.8797 37.3339 21.3464 37.3339H26.4264L27.7597 37.8539L27.133 39.7206C26.693 41.0539 27.3597 42.5206 28.6664 43.0406L32.853 44.7206C33.173 44.8406 33.5064 44.9073 33.8397 44.9073C34.2264 44.9073 34.613 44.8273 34.9597 44.6539C35.6264 44.3473 36.133 43.7739 36.3597 43.0806L36.9197 41.3873L43.493 43.9206C43.653 43.9739 43.813 44.0139 43.973 44.0139C44.2397 44.0139 44.5064 43.9339 44.733 43.7739C45.093 43.5206 45.3064 43.1073 45.3064 42.6806V21.3339C45.3064 20.8939 45.093 20.4806 44.733 20.2406H44.7597ZM21.333 29.3339H25.333V34.6673H21.333V29.3339ZM33.853 42.2406L29.6664 40.5606L30.253 38.8006L34.453 40.4139L33.853 42.2273V42.2406ZM42.6664 40.7339L27.9997 35.0939V28.9206L42.6664 23.2806V40.7339Z" fill="#295086"/>
</svg>
`,
  offers: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="64" height="64" rx="10" fill="#DFECF9"/>
<path d="M44.5441 31.4413L32.5441 19.4413C32.0441 18.9454 31.3683 18.6674 30.6641 18.668H21.3307C20.6235 18.668 19.9452 18.9489 19.4451 19.449C18.945 19.9491 18.6641 20.6274 18.6641 21.3346V30.668C18.6638 31.0199 18.7332 31.3683 18.8682 31.6933C19.0032 32.0182 19.2012 32.3132 19.4507 32.5613L31.4507 44.5613C31.9507 45.0572 32.6265 45.3352 33.3307 45.3346C34.0368 45.3317 34.7129 45.0488 35.2107 44.548L44.5441 35.2146C45.0448 34.7168 45.3278 34.0407 45.3307 33.3346C45.331 32.9828 45.2616 32.6343 45.1266 32.3093C44.9916 31.9844 44.7936 31.6894 44.5441 31.4413ZM33.3307 42.668L21.3307 30.668V21.3346H30.6641L42.6641 33.3346M24.6641 22.668C25.0596 22.668 25.4463 22.7853 25.7752 23.005C26.1041 23.2248 26.3604 23.5372 26.5118 23.9026C26.6632 24.2681 26.7028 24.6702 26.6256 25.0582C26.5485 25.4461 26.358 25.8025 26.0783 26.0822C25.7986 26.3619 25.4422 26.5524 25.0542 26.6295C24.6663 26.7067 24.2641 26.6671 23.8987 26.5157C23.5332 26.3644 23.2209 26.108 23.0011 25.7791C22.7814 25.4502 22.6641 25.0635 22.6641 24.668C22.6641 24.1375 22.8748 23.6288 23.2498 23.2538C23.6249 22.8787 24.1336 22.668 24.6641 22.668Z" fill="#295086"/>
</svg>
`,
  payroll: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="64" height="64" rx="10" fill="#DFECF9"/>
<path d="M41.3333 44H25.3333C23.9188 44 22.5623 43.4381 21.5621 42.4379C20.5619 41.4377 20 40.0812 20 38.6667V22.6667C20 21.9594 20.281 21.2811 20.781 20.781C21.2811 20.281 21.9594 20 22.6667 20H36C36.7072 20 37.3855 20.281 37.8856 20.781C38.3857 21.2811 38.6667 21.9594 38.6667 22.6667V40C38.6667 42.2093 39.124 44 41.3333 44Z" stroke="#295086" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M43.9974 29.3346C43.9974 28.6274 43.7164 27.9491 43.2163 27.449C42.7162 26.9489 42.038 26.668 41.3307 26.668H38.6641V40.668C38.6641 42.508 39.4907 44.0013 41.3307 44.0013C43.1707 44.0013 43.9974 42.508 43.9974 40.668V29.3346Z" stroke="#295086" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M33.3359 30.6654H25.3359M33.3359 25.332H25.3359M29.3359 35.9987H25.3359" stroke="#295086" stroke-width="2.66667" stroke-linecap="round"/>
</svg>
`,
  membership: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="64" height="64" rx="10" fill="#DFECF9"/>
<path d="M41.5 22H22.5C20.567 22 19 23.567 19 25.5V38.5C19 40.433 20.567 42 22.5 42H41.5C43.433 42 45 40.433 45 38.5V25.5C45 23.567 43.433 22 41.5 22Z" stroke="#295086" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19 28H45M24 34.75H27V36H24V34.75Z" stroke="#295086" stroke-width="3.75" stroke-linejoin="round"/>
</svg>
`,
};

const MARKETPLACE_APPS = [
  {
    id: "gift-card",
    title: "Gift Card",
    description: "Create and track digital gift cards.",
    cta: "View Gift Cards",
    href: "#",
    icon: ICONS.gift,
  },
  {
    id: "packages",
    title: "Packages",
    description: "Bundle services with flexible pricing.",
    cta: "Manage Packages",
    href: "#",
    icon: ICONS.packages,
  },
  {
    id: "client",
    title: "Client",
    description: "Manage client profiles and history.",
    cta: "View Clients",
    href: PATH_DASHBOARD?.appsClients,
    icon: ICONS.client,
  },
  {
    id: "campaigns",
    title: "Campaigns",
    description: "Create and track marketing campaigns.",
    cta: "Open Campaigns",
    href: "#",
    icon: ICONS.campaigns,
  },
  {
    id: "offers",
    title: "Offers",
    description: "Launch targeted discounts and promotions.",
    cta: "View Offers",
    href: "#",
    icon: ICONS.offers,
  },
  {
    id: "payroll",
    title: "Payroll",
    description: "Manage payroll, salaries and payments.",
    cta: "Open Payroll",
    href: PATH_DASHBOARD?.appsPayroll,
    icon: ICONS.payroll,
  },
  {
    id: "membership",
    title: "Membership",
    description: "Create loyalty memberships and rewards.",
    cta: "Manage Memberships",
    href: "#",
    icon: ICONS.membership,
  },
];

export default function AppsMarketplacePage() {
  return (
    <MainLayoutWrapper>
      <AppsMarketplace>
        <AppsMarketplaceInner>
          <AppsMarketplaceHeader>
            <AppsMarketplaceTitle>App Marketplace</AppsMarketplaceTitle>
            <AppsMarketplaceSubtitle>
              Extend your spa with add-on modules and tools.
            </AppsMarketplaceSubtitle>
          </AppsMarketplaceHeader>

          <AppsMarketplaceGrid>
            {MARKETPLACE_APPS.map((app) => (
              <AppsCard key={app.id}>
                <AppsCardIcon >
                  <InlineSVG src={app.icon} />
                </AppsCardIcon>
                <AppsCardTitle>{app.title}</AppsCardTitle>
                <AppsCardDescription>{app.description}</AppsCardDescription>
                <AppsCardCta href={app.href}>{app.cta}</AppsCardCta>
              </AppsCard>
            ))}
          </AppsMarketplaceGrid>
        </AppsMarketplaceInner>
      </AppsMarketplace>
    </MainLayoutWrapper>
  );
}
