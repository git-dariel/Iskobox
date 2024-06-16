import React, { useState, useEffect } from 'react';
import { deleteComment, fetchComments } from '@/services/comments/comments.service';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { toast } from 'sonner';
import { useCommentUpdate } from '@/helpers/comment.context';
import { bouncy } from 'ldrs';

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { triggerUpdate } = useCommentUpdate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  bouncy.register();

  const handleDeleteComment = async () => {
    setIsLoading(true);
    try {
      await deleteComment(selectedComment.id);
      toast.success('Comment deleted successfully');
      fetchComments().then(setComments);
      closeDeleteModal();
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Error deleting comment');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments().then((fetchedComments) => {
      const sortedComments = fetchedComments.sort((a, b) => {
        const dateA = new Date(a.dateTime.date.replace(/-/g, '/') + ' ' + a.dateTime.time);
        const dateB = new Date(b.dateTime.date.replace(/-/g, '/') + ' ' + b.dateTime.time);
        return dateA - dateB;
      });
      setComments(sortedComments);
    });
  }, [triggerUpdate]);

  const handleCommentClick = (comment) => {
    setSelectedComment(comment);
    setShowModal(true);
  };
  const formatDateTime = (dateTime) => {
    if (dateTime && dateTime.date) {
      const currentDate = new Date();
      const commentDate = new Date(dateTime.date.replace(/-/g, '/') + ' ' + dateTime.time);
      const diffTime = Math.abs(currentDate - commentDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return diffDays > 1 ? commentDate.toLocaleDateString() : commentDate.toLocaleTimeString();
    }
    return '';
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className='bg-white rounded-md overflow-hidden py-1 '>
      <div className='w-full '>
        {comments.map((comment, index) => (
          <div
            key={index}
            className='bg-gray-100 p-2 rounded m-2 hover:shadow-md cursor-pointer transition duration-300 ease-in-out'
            onClick={() => handleCommentClick(comment)}
          >
            <div className='flex justify-between'>
              <h2 className='text-sm'>{comment.folder}</h2>
              <p className='text-xs text-gray-600'>{formatDateTime(comment.dateTime)}</p>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 '>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <div className='flex justify-between w-[300px] items-center border-b pb-2'>
              <div className='text-lg font-medium leading-6 text-gray-900'>
                <h1 className='pl-2'>Notes</h1>
              </div>
              <div className='text-xl leading-6 text-gray-900 font-extrabold flex gap-2 pr-2 '>
                <button onClick={openDeleteModal}>
                  <MdDelete />
                </button>
                <button onClick={() => setShowModal(false)}>
                  {' '}
                  <IoIosCloseCircleOutline />
                </button>
              </div>
            </div>
            <div className='flex justify-between mt-2 '>
              <div className='text-lg font-medium leading-6 text-gray-900 pl-2'>
                <h1>{selectedComment.folder}</h1>
              </div>
              <div className='pr-2'>
                <p className=''>{formatDateTime(selectedComment.dateTime)}</p>
              </div>
            </div>
            <div
              className='border rounded p-2 mt-2 h-[100px] text-m font-normal max-w-[300px] overflow-y-auto '
              style={{ scrollbarWidth: 'none' }}
            >
              <p>{selectedComment.text}</p>
            </div>
            <div className=' flex justify-end'></div>
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'>
          <div className='bg-gray-300 p-8 rounded-lg shadow-2xl'>
            <h2 className='text-xl font-semibold mb-6'>Delete Comment</h2>
            {isLoading ? (
              <div className='flex justify-center items-center'>
                <l-bouncy size='40' color='black'></l-bouncy>
              </div>
            ) : (
              <>
                <p className='mb-4'>Are you sure you want to delete the comment?</p>
                <div className='flex justify-end space-x-4 '>
                  <button
                    onClick={closeDeleteModal}
                    className='px-6 py-2 border bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors'
                  >
                    No
                  </button>
                  <button
                    onClick={handleDeleteComment}
                    className='px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors'
                  >
                    Yes
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentList;
