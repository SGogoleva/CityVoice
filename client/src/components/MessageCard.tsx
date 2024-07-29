import React from "react";

interface Image {
  filename: string;
  mimetype: "image/png" | "image/jpeg" | "image/jpg";
  size: number;
}

interface Message {
  id: string;
  isVisible: boolean;
  messageBody: string;
  authority: {
    authorityId: string;
    authorityName: string;
  };
  messageTheme: string;
  status: string;
  images: Image[];
  dateCreated: string;
}

const MessageCard: React.FC<{ message: Message }> = ({ message }) => {
  const firstImage =
    message.images.length > 0 ? message.images[0].filename : null;

  return (
    <div className="message-card cursor-pointer p-4 bg-white shadow-md rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg group relative">
      <div className="relative h-64 mb-4 bg-gray-200">
        <div className="absolute top-2 right-2 text-sm px-2 py-1 rounded transition-colors duration-300 group-hover:bg-[#50B04C] group-hover:text-white">
          {message.status}
        </div>
        {firstImage && (
          <div className="image-placeholder flex items-end justify-center text-gray-500 h-full">
            <span>No Image Available</span>{" "}
          </div>
        )}
      </div>
      <h2 className="text-xl font-bold mb-2">{message.messageTheme}</h2>
      <p>{message.messageBody}</p>
    </div>
  );
};

export default MessageCard;
