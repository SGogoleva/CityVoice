import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import Modal from 'react-modal';

Modal.setAppElement('#root');

interface ImageGalleryWithModalProps {
  images?: string[];
}

const ImageGalleryWithModal: React.FC<ImageGalleryWithModalProps> = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsOpen(true);
  };

  return (
    <div className="w-full grid grid-cols-1 gap-4 mb-6">
      {images && images.length > 0 && (
        <img
          src={images[0]}
          alt="image-0"
          className="w-full h-80 object-cover rounded-lg cursor-pointer border border-[#50B04C]"
          onClick={() => openModal(0)}
        />
      )}
      {images && images.length > 1 && (
        <div className="grid grid-cols-2 gap-4">
          {images.slice(1, 3).map((image, index) => (
            <img
              key={index + 1}
              src={image}
              alt={`image-${index + 1}`}
              className="w-full h-40 object-cover rounded-lg cursor-pointer border border-[#50B04C]"
              onClick={() => openModal(index + 1)}
            />
          ))}
        </div>
      )}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Image Carousel"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="bg-white rounded-lg p-4 max-w-3xl w-full">
          <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 text-white bg-orange-500 px-2 py-1">X</button>
          <Carousel selectedItem={selectedImageIndex} showThumbs={false}>
            {images && images.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`carousel-image-${index}`} />
              </div>
            ))}
          </Carousel>
        </div>
      </Modal>
    </div>
  );
};

export default ImageGalleryWithModal;
