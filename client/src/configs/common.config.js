import citizens_charter from "../assets/exhibit/citizens_charter.png";
import cmo_2015 from "../assets/exhibit/cmo_2015.png";
import instructional_mats from "../assets/exhibit/instructional_mats.png";
import univ_policies_guidelines from "../assets/exhibit/univ_policies_guidelines.png";
import university_code from "../assets/exhibit/university_code.png";
import syllabi from "../assets/exhibit/syllabi.png";
import student_handbook from "../assets/exhibit/student_handbook.png";
import admin_manual from "../assets/exhibit/admin_manual.png";
import folder_doc from "../assets/exhibit/folder_doc.webp";

const common = {};

common.roleOptions = [
  { id: 1, label: "Uploader" },
  { id: 2, label: "Viewer" },
  { id: 3, label: "Commenter" },
];

common.exhibitPaths = [
  {
    path: "/exhibit/citizens-charter",
    text: "Citizen's Charter",
    image: citizens_charter,
  },
  {
    path: "/exhibit/student-handbook",
    text: "Student Handbook",
    image: student_handbook,
  },
  {
    path: "/exhibit/university-code",
    text: "University Code",
    image: university_code,
  },
  {
    path: "/exhibit/university-policies-guidelines",
    text: "University Policies & Guidelines",
    image: univ_policies_guidelines,
  },
  {
    path: "/exhibit/administrative-manual",
    text: "Administrative Manual",
    image: admin_manual,
  },
  {
    path: "/exhibit/faculty-manual",
    text: "Faculty Manual",
  },
  { path: "/exhibit/syllabi", text: "Syllabi", image: syllabi },
  {
    path: "/exhibit/instructional-materials",
    text: "Instructional Materials",
    image: instructional_mats,
  },
  { path: "/exhibit/cmo", text: "CMO 2015", image: cmo_2015 },
];

// Map exhibit paths to nav items
const exhibitNavItems = common.exhibitPaths.map((item) => ({
  name: item.text,
  to: item.path,
}));

common.navItems = [
  { name: "Home", to: "/homepage", current: true },
  {
    name: "About PUP Lopez",
    to: "/aboutpage",
    dropdown: true,
    items: [
      { name: "Mission And Vision", to: "/missionvisionpage" },
      { name: "History", to: "/historypage" },
      { name: "Buildings and Facilities", to: "/facilitiespage" },
      { name: "Laboratory Videos", to: "/laboratorypage" },
      { name: "Offices Videos", to: "/officesvideopage" },
    ],
  },
  {
    name: "Certificate of Authenticity",
    to: "/certificate-of-authenticitypage",
  },
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
    items: exhibitNavItems,
  },
];

common.univ_policies_links = [
  {
    link: "https://drive.google.com/file/d/1eDLnFzQM4-SSOmd6rxJg0s4Szpo0vUC2/view?usp=sharing",
    text: "Office of the President",
    image: folder_doc,
  },
  {
    link: "https://drive.google.com/file/d/1hasc_sNDreo9EkB-9o0dW1INqklT7abc/view?usp=sharing",
    text: "Office of the Executive Vice President",
    image: folder_doc,
  },
  {
    link: "https://drive.google.com/file/d/1Ie3aTmgvigFiKpgZZE6lQu4WTEuKeLiS/view?usp=sharing",
    text: "Office of the Vice President for Academic Affairs",
    image: folder_doc,
  },
  {
    link: "https://drive.google.com/file/d/1KnfF3VxS_Aljhtfy_eht_aA7ZhCv9hrS/view?usp=sharing",
    text: "Office of the Vice President for Administration",
    image: folder_doc,
  },
  {
    link: "https://drive.google.com/file/d/1F0xypQ5co2D-x3GnTLcmL2zSRRdAyKk3/view?usp=sharing",
    text: "Office of the Vice President for Student Affairs and Services",
    image: folder_doc,
  },
  {
    link: "https://drive.google.com/file/d/1ag9waXBkPoXbZDrNPBkvunzloh5048aN/view?usp=sharing",
    text: "Office of the Vice President for Finance",
    image: folder_doc,
  },
  {
    link: "https://drive.google.com/file/d/1MDXPNZR_GhL7RVF-cH7_tVI1l47OWMUm/view?usp=sharing",
    text: "Office of the Vice President for Branches and Satellite Campuses",
    image: folder_doc,
  },
];

export default common;
