import { RootState } from "../store/store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setMessagesPage } from "../store/slices/message.slice";
import { useEffect } from "react";
import { format } from "date-fns";
import Button from "./single/button";
import { fetchMessagesThunk } from "../store/thunks/message.thunk";
import { useNavigate } from "react-router-dom";

interface MessagesProps {
  limit?: number;
  showPagination?: boolean;
}

const Messages = ({ limit = 9, showPagination = true }: MessagesProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const messages = useAppSelector((state: RootState) => state.message.messages);
  const loading = useAppSelector((state: RootState) => state.message.loading);
  const currentPage = useAppSelector(
    (state: RootState) => state.message.currentPage
  );
  const totalPages = useAppSelector(
    (state: RootState) => state.message.totalPages
  );
  const sortBy = useAppSelector((state: RootState) => state.message.sortBy);
  const sortOrder = useAppSelector(
    (state: RootState) => state.message.sortOrder
  );

  useEffect(() => {
    dispatch(
      fetchMessagesThunk({ limit, page: currentPage, sortBy, sortOrder })
    );
  }, [dispatch, currentPage, sortBy, sortOrder, limit]);

  const handleShowMore = () => {
    const nextPage = currentPage + 1;
    dispatch(setMessagesPage(nextPage));
  };

  const handleMessageClick = (messageId: string) => {
    navigate(`/messages/${messageId}`, {
      state: { messageId },
    });
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd.MM.yy");
  };

  const displayedMessages = limit === 3 ? messages.slice(0, 3) : messages;

  return (
    <>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 message-list">
        {displayedMessages?.map((message) => {
          const firstImage =
            message.images && message.images.length > 0
              ? message.images[0]
              : null;
          return (
            <div
              key={message.id}
              className="message-card cursor-pointer p-4 bg-white shadow-md rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg group relative"
              onClick={() => handleMessageClick(message.id)}
            >
              <div className="relative h-64 mb-4 bg-gray-200">
                <div className="absolute top-2 right-2 text-sm px-2 py-1 rounded transition-colors duration-300 group-hover:bg-[#50B04C] group-hover:text-white">
                  {message.status}
                </div>
                <div className="absolute top-2 left-2 flex space-x-1 px-2 py-1">
                  <p>{formatDate(message.dateCreated)}</p>
                </div>
                {firstImage ? (
                  <div className="image-placeholder flex items-end justify-center text-gray-500 h-full">
                    <img
                      src={firstImage}
                      alt={message.status}
                      className="h-5/6 w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="image-placeholder flex items-center justify-center text-gray-500 h-full">
                    <span>No Image Available</span>{" "}
                  </div>
                )}
              </div>
              <h2 className="text-xl font-bold mb-2">{message.messageTheme}</h2>
              <div className="description text-gray-700 truncate-multiline">
                {message.messageBody}
              </div>
            </div>
          );
        })}
      </div>
      {showPagination && currentPage < totalPages && (
        <div className="flex justify-center">
          <Button
            className="mt-6 mb-6"
            variant="primary"
            onClick={handleShowMore}
            disabled={loading}
            loading={loading}
          >
            {loading ? "Loading..." : "Show more"}
          </Button>
        </div>
      )}
    </>
  );
};

export default Messages;
