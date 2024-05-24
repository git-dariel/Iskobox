import { BiConfused } from "react-icons/bi";
import { FaRegFileAlt } from "react-icons/fa";
import { LiaFolderSolid } from "react-icons/lia";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaFileCircleCheck } from "react-icons/fa6";

const mockedConfig = {};

mockedConfig.dashboardCardData = [
  {
    title: "Total Files",
    value: "10",
    icon: FaRegFileAlt,
    description: "Total number of projects in the system.",
  },
  {
    title: "Total Folders",
    value: "100",
    icon: LiaFolderSolid,
    description: "Number of projects in progress.",
  },
  {
    title: "Pending Files",
    value: "50",
    icon: MdOutlinePendingActions,
    description: "Number of projects completed.",
  },
  {
    title: "Completed Files",
    value: "67",
    icon: FaFileCircleCheck,
    description: "Number of projects currently on hold.",
  },
];
export default mockedConfig;
