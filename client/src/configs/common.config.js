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
import Area1 from "../assets/prog-und-survey/areas/area1.png";
import Area2 from "../assets/prog-und-survey/areas/area2.png";
import Area3 from "../assets/prog-und-survey/areas/area3.png";
import Area4 from "../assets/prog-und-survey/areas/area4.png";
import Area5 from "../assets/prog-und-survey/areas/area5.png";
import Area6 from "../assets/prog-und-survey/areas/area6.png";
import Area7 from "../assets/prog-und-survey/areas/area7.png";
import Area8 from "../assets/prog-und-survey/areas/area8.png";
import Area9 from "../assets/prog-und-survey/areas/area9.png";
import Area10 from "../assets/prog-und-survey/areas/area10.png";

import { FaGlobe, FaFacebook, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const common = {};

common.footerLinks = [
  {
    icon: FaGlobe,
    url: "https://www.pup.edu.ph/",
    type: "external",
  },
  {
    icon: FaFacebook,
    url: "https://www.facebook.com/PUPLQ/",
    type: "external",
  },
  {
    icon: FaMapMarkerAlt,
    url: "https://www.google.com/maps/place/Polytechnic+University+of+the+Philippines+Lopez/@13.8800711,122.2606709,17z/",
    type: "external",
  },
  {
    icon: FaEnvelope,
    url: "mailto:info@pup.edu.ph", // Replace with the actual email address
    type: "external",
  },
];

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
};

common.BSIT = {
  span1: "BACHELOR OF SCIENCE",
  span2: "IN",
  span3: "INFORMATION TECHNOLOGY",

  icon: OrgPic,
};

common.programDescription = {
  title: "Program Description",
  content:
    "  The Bachelor of Science in Information Technology (BSIT) program is a four-year degree program which focuses on the study of computer utilization and computer software to plan, install, customize, operate, manage, administer and maintain information technology infrastructure. It likewise deals with the design and development of computer-based information systems for real-world business solutions. The program prepares students to become IT professionals with primary competencies in the areas of systems analysis and design, applications development, database administration, network administration, and systems implementation and maintenance. The program also requires a Capstone project. It should be in the form of an IT applications development as a business solution for an industry need. ",
};

common.navItems = [
  { name: "Home", to: "/", current: true },
  {
    name: "About PUP Lopez",
    to: "/aboutpage",
    dropdown: true,
    items: [
      { name: "Mission And Vision", to: "/missionvisionpage" },
      { name: "History", to: "/historypage" },
      { name: "Administration", to: "/administrationpage" },
      { name: "Buildings and Facilities", to: "/facilitiespage" },
      { name: "Laboratory Videos", to: "/laboratorypage" },
      { name: "Campus Offices", to: "/officesvideopage" },
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

common.PUScontents = {
  pg: "PROGRAM DESCRIPTION",
  op: "OBJECTIVES OF THE PROGRAM",
  aus: "AREAS UNDER SURVEY",
  pvp: "Program Video Promotion",
};

common.objOfTheProgram = {
  title: "OBJECTIVES OF THE PROGRAM",
  content: {
    obj1: "The Bachelor of Science in Information Technology aims to provide training and practice that will enable students:",
    obj2: "• To introduce students to current technologies and tools while learning new methodologies that will lead to the development of better information systems.",
    obj3: "• To enable students to understand the different components of the information technology field, including hardware, software, communication, networking, research, peopleware and management skills.",
    obj4: "• To demonstrate awareness of how to methodically and practically approach a variety of technological and managerial issues to ultimately improve business strategies and attain competitive advantage.",
    obj5: "• To inculcate to students the essential virtues and attitudes, as well as develop necessary knowledge and competency levels required of an information technology professional.",
    obj6: "• To train students to systematically analyze and evaluate organizational systems and processes in order to recommend software solutions that properly address the organization's needs and goals.",
  },
};

common.underSurvey = {
  title: "AREAS UNDER SURVEY",
  icon: {
    area1: Area1,
    area2: Area2,
    area3: Area3,
    area4: Area4,
    area5: Area5,
    area6: Area6,
    area7: Area7,
    area8: Area8,
    area9: Area9,
    area10: Area10,
  },
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
  },
  links: {
    aus1: "/programs-under-survey/areaone",
    aus2: "/programs-under-survey/areatwo",
    aus3: "/programs-under-survey/areathree",
    aus4: "/programs-under-survey/areafour",
    aus5: "/programs-under-survey/areafive",
    aus6: "/programs-under-survey/areasix",
    aus7: "/programs-under-survey/areaseven",
    aus8: "/programs-under-survey/areaeight",
    aus9: "/programs-under-survey/areanine",
    aus10: "/programs-under-survey/areaten",
  },
};

common.programvideo = {
  title: "Program Video Promotion",
};

common.AREAONE = {
  span1: "AREA 1",
  span2: "VISION, MISSION, GOALS, AND OBJECTIVES",
  icon: OrgPic,

  ppp: "PROGRAM PERFORMANCE PROFILE",
  slf: "SELF SURVEY",
};

common.AREAONE_CONTENTS = {
  DESC: "AREA DESCRIPTION",
  PARAMETER_A: "PARAMETER A",
  PARAMETER_B: "PARAMETER B",

  DESC_CONTENT:
    "The area of Vision, Mission, Goals, and Objectives is the most fundamental of all the (10) areas to be surveyed. Everything in the Institution is justified only to the extent that it realizes its vision and mission. It is essential therefore, for the Institution to formulate the vision and mission which should be the bases of all its operations. The Institution is judged by the degree to which these are attained, not in comparison with others.",
};

common.AREATWO = {
  span1: "AREA 2",
  span2: "FACULTY",

  icon: OrgPic,
};

common.AREATWO_CONTENTS = {
  DESC: "AREA DESCRIPTION",
  PARAMETER_A: "PARAMETER A",
  PARAMETER_B: "PARAMETER B",

  DESC_CONTENT:
    "The standard or quality of an institution or program is greatly measured by the qualification of its faculty. In this light, the faculty should be composed of competent members in terms of academic qualifications, experience and professional expertise. In addition, they should manifest desirable personal qualities and high level of professionalism. To be effective, faculty members should be properly compensated and taken care of. They must be given opportunities for continuous personal and professional development. A policy of fair and equitable distribution of teaching assignments and workload should be practiced. Likewise, objective and clear promotion criteria/scheme should be adopted by the Institution.",
};

common.AREATHREE = {
  span1: "AREA 3",
  span2: "CURRICULUM AND INSTRUCTION",

  icon: OrgPic,
};

common.AREATHREE_CONTENTS = {
  DESC: "AREA DESCRIPTION",
  PARAMETER_A: "PARAMETER A",
  PARAMETER_B: "PARAMETER B",

  DESC_CONTENT:
    "Curriculum and instruction occupy center stage in any educational program. These seek to research, develop, and implement curriculum changes that enhance student achievement within and outside of institutions. How students learn and the best ways to educate deserve much consideration.The quality of these two allied areas determine primarily the prestige and strength of the institution. Areas of concern are on six parameters. These are encompassing which are: [1]Curriculum and program of studies; [2]Instructional process, [3]methodologies and learning opportunities; [4]assessment of academic performance; [5]classroom management; [6]graduation requirements; [7]and administrative support for effective instruction",
};

common.AREAFOUR = {
  span1: "AREA 4",
  span2: "SUPPORT TO STUDENTS",

  icon: OrgPic,
};

common.AREAFOUR_CONTENTS = {
  DESC: "AREA DESCRIPTION",
  PARAMETER_A: "PARAMETER A",
  PARAMETER_B: "PARAMETER B",

  DESC_CONTENT:
    "Students are the reason for the establishment of learning institutions. Thus, the school has the responsibility to support the family and other social institutions in the development of the total personality of the student. Towards this end, a program of student services is designed as an integral part of institutional effectiveness. All activities should be well planned and implemented to assist the student in attaining his/her maximum potential and become a worthy contributor in his/her social environment. Student support and services complement the Academic Program. ",
};

common.AREAFIVE = {
  span1: "AREA 5",
  span2: "RESEARCH",

  icon: OrgPic,
};

common.AREAFIVE_CONTENTS = {
  DESC: "AREA DESCRIPTION",
  PARAMETER_A: "PARAMETER A",
  PARAMETER_B: "PARAMETER B",

  DESC_CONTENT:
    "Research is an avenue through which new knowledge is discovered, applied or verified and through which appropriate technologies are generated. Thus, it is a basic requirement for an educational institution to have a firmly established research and development program. Its thrusts and priorities should be congruent with those identified in the development plans of regional and national R and D-oriented agencies such as NEDA, DOST, CHED, etc. The institutional leadership in research should be proactive and developmental in orientation. It must provide adequate and sustained budget allocation annually for the academic Unit. Adequate physical facilities, laboratory equipment and supplies for research should be provided. The Academic unit has to maintain strong research linkages with various R and D agencies locally and internationally.",
};

common.AREASIX = {
  span1: "AREA 6",
  span2: "EXTENSION AND COMMUNITY INVOLVEMENT",

  icon: OrgPic,
};

common.AREASIX_CONTENTS = {
  DESC: "AREA DESCRIPTION",
  PARAMETER_A: "PARAMETER A",
  PARAMETER_B: "PARAMETER B",

  DESC_CONTENT:
    "The extension function makes the institution's presence felt in the community. It involves the application of existing and new knowledge and technology and those generated in the Institution to improve the quality of life of the people. Through the extension program, people are empowered with appropriate knowledge, attitudes and skills. Thus, extension services cater to various aspects of the community life, e.g., economic growth, promotion of health, environmental management, and social transformation. The Institution plans and implements an extension program that is need and client-based. This program should have a budgetary support and other resource allocation. The faculty members may serve as experts, consultants, organizers, facilitators, coordinators, service providers, and change agents in the community as forms of extension and community involvement. Careful planning and coordination with other community outreach agencies should be considered to avoid duplication of services offered to the clientele.",
};

common.AREASEVEN = {
  span1: "AREA 7",
  span2: "LIBRARY",

  icon: OrgPic,
};

common.AREASEVEN_CONTENTS = {
  DESC: "AREA DESCRIPTION",
  PARAMETER_A: "PARAMETER A",
  PARAMETER_B: "PARAMETER B",

  DESC_CONTENT:
    "The library is the heart of any learning institution. It is a synergy of people, hardware and software whose purpose is to assist clients in using knowledge and technology to transform and improve their lives. Information and knowledge are essential to the attainment of institutional goals. The ways in which they are selected, acquired, stored, accessed and distributed within the Institution will, in large measure, determine the success of teaching, research and other academic endeavors. The Institution thrives on clear policies concerning access to, and provision of, information. Thus, the library must take an active role in the development and implementation of these policies. Each institution has a unique vision, mission, goals and objectives. These are influenced by its philosophy, geographical location and social responsibility. Similarly, as a subsystem of the Institution, the library has a unique role to perform.",
};

common.AREAEIGHT = {
  span1: "AREA 8",
  span2: "PHYSICAL PLANT AND FACILITIES",

  icon: OrgPic,
};

common.AREAEIGHT_CONTENTS = {
  DESC: "AREA DESCRIPTION",
  PARAMETER_A: "PARAMETER A",
  PARAMETER_B: "PARAMETER B",

  DESC_CONTENT:
    "The quality and adequacy of the physical plant and facilities of a learning institution determine to a large measure the successful implementation of its curricular programs. In a broad sense, physical plant and facilities include school campus, buildings and other physical infrastructures, equipment and services that complement institutional and program effectiveness.",
};

common.AREANINE = {
  span1: "AREA 9",
  span2: "LABORATORIES",

  icon: OrgPic,
};

common.AREANINE_CONTENTS = {
  DESC: "AREA DESCRIPTION",
  PARAMETER_A: "PARAMETER A",
  PARAMETER_B: "PARAMETER B",

  DESC_CONTENT:
    "Laboratories are included in the support systems for any academic program. Broadly defined, they cover science laboratories, speech laboratories, demonstration farms, shops, and other facilities for practicum activities essential to the successful implementation of curricular programs inclusive of their use and functions.",
};

common.AREATEN = {
  span1: "AREA 10",
  span2: "ADMINISTRATION",

  icon: OrgPic,
};

common.AREATEN_CONTENTS = {
  DESC: "AREA DESCRIPTION",
  PARAMETER_A: "PARAMETER A",
  PARAMETER_B: "PARAMETER B",

  DESC_CONTENT:
    "The administration is the engine of the Institution in the attainment of its vision, mission, goals and objectives. It is concerned with the general affairs of the Institution and its organization performance. Thus, the administration adopts institutional processes and ensures that said processes are satisfactorily implemented.",
};

export const videos = [
  {
    id: 1,
    video: "https://drive.google.com/file/d/1i-a-JooACnPQqr3ot2SH5ucjfHQy8T0L/preview",
  },

  {
    id: 2,
    video: "https://drive.google.com/file/d/19A1D6fapi0nBXldr1kacnOG_7K7Sxjld/preview",
  },
];

export default common;
