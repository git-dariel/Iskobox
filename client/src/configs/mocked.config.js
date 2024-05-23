import { BiConfused } from "react-icons/bi";

const mockedConfig = {};

mockedConfig.dashboardCardData = [
  {
    title: "Total Files",
    value: "10",
    icon: BiConfused,
    description: "Total number of projects in the system.",
  },
  {
    title: "Total Folders",
    value: "100",
    icon: BiConfused,
    description: "Number of projects in progress.",
  },
  {
    title: "Pending Files",
    value: "50",
    icon: BiConfused,
    description: "Number of projects completed.",
  },
  {
    title: "Completed Files",
    value: "67",
    icon: BiConfused,
    description: "Number of projects currently on hold.",
  },
];
export default mockedConfig;
