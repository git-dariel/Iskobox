import citizens_charter from "../assets/exhibit/citizens_charter.png";
import cmo_2015 from "../assets/exhibit/cmo_2015.png";
import instructional_mats from "../assets/exhibit/instructional_mats.png";
import univ_policies_guidelines from "../assets/exhibit/univ_policies_guidelines.png";
import university_code from "../assets/exhibit/university_code.png";
import syllabi from "../assets/exhibit/syllabi.png";
import student_handbook from "../assets/exhibit/student_handbook.png";
import admin_manual from "../assets/exhibit/admin_manual.png";
import folder_doc from "../assets/exhibit/folder_doc.webp";
import OrgPic from "../assets/prog-und-survey/OrgPic.jpg";
import PUSLogo from "../assets/prog-und-survey/PUSLogo.png";

const common = {};

common.roleOptions = [
  { id: 1, label: "Uploader" },
  { id: 2, label: "Viewer" },
  { id: 3, label: "Commenter" },
];

common.PUS = {
  span1: "PROGRAMS",
  span2: "UNDER",
  span3: "SURVEY",

  icon: OrgPic,
}

common.BSIT = {
  span1: "BACHELOR OF SCIENCE",
  span2: "IN",
  span3: "INFORMATION TECHNOLOGY",

  icon: OrgPic,
}

common.programDescription = {
  title: "Program Description",
  content: "  The Bachelor of Science in Information Technology (BSIT) program is a four-year degree program which focuses on the study of computer utilization and computer software to plan, install, customize, operate, manage, administer and maintain information technology infrastructure. It likewise deals with the design and development of computer-based information systems for real-world business solutions. The program prepares students to become IT professionals with primary competencies in the areas of systems analysis and design, applications development, database administration, network administration, and systems implementation and maintenance. The program also requires a Capstone project. It should be in the form of an IT applications development as a business solution for an industry need. "
}

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
  { name: "Certificate of Authenticity", to: "/certificate-of-authenticitypage" },
  {
    name: "Programs Under Survey",
    to: "/programs-under-survey",
    dropdown: true,
    items: [{ name: "BSIT", to: "/programs-under-survey/bsit" }],
  },
  {
    name: "Exhibit",
    to: "/exhibit",
    dropdown: true,
    items: [{ name: "Exhibit", to: "/exhibit" }],
  },
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

common.PUScontents =
{
  pg: "PROGRAM DESCRIPTION",
  op: "OBJECTIVES OF THE PROGRAM",
  aus: "AREAS UNDER SURVEY",
  pvp: "Program Video Promotion"
}

common.objOfTheProgram = {
  title: "OBJECTIVES OF THE PROGRAM",
  content: {
    obj1: "The Bachelor of Science in Information Technology aims to provide training and practice that will enable students:",
    obj2: "- To introduce students to current technologies and tools while learning new methodologies that will lead to the development of better information systems.",
    obj3: "- To enable students to understand the different components of the information technology field, including hardware, software, communication, networking, research, peopleware and management skills.",
    obj4: "- To demonstrate awareness of how to methodically and practically approach a variety of technological and managerial issues to ultimately improve business strategies and attain competitive advantage.",
    obj5: "- To inculcate to students the essential virtues and attitudes, as well as develop necessary knowledge and competency levels required of an information technology professional.",
    obj6: "- To train students to systematically analyze and evaluate organizational systems and processes in order to recommend software solutions that properly address the organization's needs and goals.",
  }
}

common.underSurvey = {
  title: "AREAS UNDER SURVEY",
  icon: PUSLogo,
  content: {
    aus1: "Vision, Mission, Goals and Objectives",
    aus2: "Faculty",
    aus3: "Curriculum and Instruction",
    aus4: "Support to Students",
    aus5: "Research",
    aus6: "Extension and Community Involvement",
    aus7: "Library",
    aus8: "Physical Plant and Facilities",
    aus9: "Laboratories",
    aus10: "Administration",
  }
}


export default common;
