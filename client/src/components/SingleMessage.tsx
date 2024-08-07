import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { singleMessageThunk } from "../store/thunks/message.thunk";
import ImageGalleryWithModal from "./single/ImageGalleryWithModal";

const SingleMessage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { messageId } = location.state as { messageId: string };

  const loading = useAppSelector(
    (state: RootState) => state.singleMessage.loading
  );
  const error = useAppSelector((state: RootState) => state.singleMessage.error);
  const message = useAppSelector(
    (state: RootState) => state.singleMessage.message
  );

  useEffect(() => {
    if (messageId) {
      dispatch(singleMessageThunk(messageId));
    }
  }, [dispatch, messageId]);

  if (loading) return <p>Loading message...</p>;
  if (error) return <p>Error loading message: {error}</p>;
  if (!message) return <p>Message not found</p>;

  return (
    <div className="mx-auto mt-4 p-6 rounded-lg flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
     
      {/* Message Info */}
      <div className="w-full md:w-2/5 flex flex-col items-center md:items-start">
        <h1 className="text-xl font-bold text-gray-800 mb-1 text-center md:text-left">
          {message.messageTheme}
        </h1>
        <p className="text-gray-600 text-center md:text-left mb-4">
          {message.messageBody}
        </p>
        <ImageGalleryWithModal images={message.images} />
        <Link
          to="/messages"
          className="bg-orange-500 text-white mt-8 py-2 px-4 rounded hover:bg-opacity-90"
        >
          Back to all Messages
        </Link>
      </div>

      {/* Map */}
      <div className="w-full min-h-80 md:w-1/5 rounded-lg flex items-center justify-center bg-gray-200">
        <p>The map will be here</p>
      </div>
      
      {/* Message Status */}
      <div className="w-full md:w-2/5 mb-4 flex flex-col items-center md:items-start">
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Status</h2>
          <p className="text-gray-600">{message.status}</p>
          <p className="text-gray-600 mt-4">
            Date Created: {message.dateCreated}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleMessage;
