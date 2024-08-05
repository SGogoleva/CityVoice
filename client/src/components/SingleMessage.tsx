import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';
import { singleMessageThunk } from '../store/thunks/message.thunk';

const SingleMessage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { messageId } = location.state as { messageId: string };
  
  const loading = useAppSelector((state: RootState) => state.singleMessage.loading);
  const message = useAppSelector((state: RootState) => state.singleMessage.message);
  const error = useAppSelector((state: RootState) => state.singleMessage.error);

  useEffect(() => {
    if (messageId) {
      dispatch(singleMessageThunk(messageId));
    }
  }, [dispatch, messageId]);

  if (loading) return <p>Loading message...</p>;
  if (error) return <p>Error loading message: {error}</p>;

  return (
    <div className="message-card cursor-pointer p-4 bg-white shadow-md rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg group relative">
      <div className="relative h-64 mb-4 bg-gray-200">
        <div className="absolute top-2 right-2 text-sm px-2 py-1 rounded transition-colors duration-300 group-hover:bg-[#50B04C] group-hover:text-white">
          {message?.status}
        </div>
        {message?.images && message.images.length > 0 ? (
          <div className="image-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {message.images.map((imgSrc, index) => (
              <div key={index} className="image-placeholder flex items-center justify-center text-gray-500 h-full">
                <img
                  src={imgSrc}
                  alt={`Message image ${index + 1}`}
                  className="h-32 w-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="image-placeholder flex items-center justify-center text-white h-full bg-black">
            <span>No Image Available</span>
          </div>
        )}
      </div>
      <h2 className="text-xl font-bold mb-2">{message?.messageTheme}</h2>
      <p>{message?.messageBody}</p>
      <p className="text-gray-500 text-sm">{new Date(message?.dateCreated).toLocaleDateString()}</p>
    </div>
  );
};

export default SingleMessage;
