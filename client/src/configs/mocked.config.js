import { BiConfused } from 'react-icons/bi';
import { FaRegFileAlt } from 'react-icons/fa';
import { LiaFolderSolid } from 'react-icons/lia';
import { MdOutlinePendingActions } from 'react-icons/md';
import { FaFileCircleCheck } from 'react-icons/fa6';

const getDashboardCardData = (totalFiles, totalFolders, pendingFiles, completedFiles) => {
  return [
    {
      title: 'Total Files',
      value: totalFiles,
      icon: FaRegFileAlt,
      description: 'Total number of files in the system.',
    },
    {
      title: 'Total Folders',
      value: totalFolders,
      icon: LiaFolderSolid,
      description: 'Total number of folders in the system.',
    },
    {
      title: 'Pending Files',
      value: pendingFiles,
      icon: MdOutlinePendingActions,
      description: 'Number of files pending.',
    },
    {
      title: 'Completed Files',
      value: completedFiles,
      icon: FaFileCircleCheck,
      description: 'Number of files completed.',
    },
  ];
};

export { getDashboardCardData };
