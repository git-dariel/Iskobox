const common = {};

common.roleOptions = [
  { id: 1, label: "Uploader" },
  { id: 2, label: "Viewer" },
  { id: 3, label: "Commenter" },
];

common.navItems = [
  { name: "Home", to: "/", current: true },
  {
    name: "About PUP Lopez",
    to: "#",
    dropdown: true,
    items: [
      { name: "Dashboard", to: "/dashboard" },
      { name: "Settings", to: "/settings" },
      { name: "Earnings", to: "/earnings" },
      { name: "Sign out", to: "/signout" },
    ],
  },
  { name: "Certificate of Authenticity", to: "/certificate-of-authenticity" },
  {
    name: "Programs Under Survey",
    to: "/programs-under-survey",
    dropdown: true,
    items: [{ name: "BSIT", to: "/bsit" }],
  },
  {
    name: "Exhibit",
    to: "/exhibit",
    dropdown: true,
    items: [{ name: "Exhibit", to: "/exhibit" }],
  },
];
export default common;
