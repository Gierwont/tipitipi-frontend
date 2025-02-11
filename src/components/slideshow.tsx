import { useState } from "react";

interface Props {
  images: string[];
  description: string;
}

const SlideShow = ({ images , description}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const openModal = (imgSrc: any) => {
    setCurrentImage(imgSrc);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentImage("");
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex flex-col items-center border-[4px] border-black relative mb-[8%] rounded-lg">
      <div className="flex items-center text-white bg-[#24252A] text-2xl md:text-3xl lg:text-5xl w-full  p-4 break-words">{description}</div>
      {/* Wybrany slajd powiększony */}
      <div className="w-full max-w-xl flex justify-center items-center relative h-[450px]">
        {/* Przycisk strzałki w lewo */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-600 z-20"
        >
          &#8592;
        </button>

        {images.length > 0 && (
          <img
            src={images[currentIndex]}
            onClick={() => openModal(images[currentIndex])} 
            alt={`Slide ${currentIndex}`}
            className="rounded-lg shadow-lg transition-transform transform duration-300 object-contain max-h-full max-w-full"
          />
        )}

        {/* Przycisk strzałki w prawo */}
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-600 z-20"
        >
          &#8594;
        </button>
      </div>

      {/* Pasek miniatur */}
      <div className="flex overflow-x-auto space-x-4 w-full justify-center px-4 overflow-y-hidden h-[150px]">
        {images.map((image, index) => (
          <div
            key={index}
            className={`${
              index === currentIndex ? "scale-105 " : "opacity-60"
            } cursor-pointer transition-transform transform duration-300`}
            onClick={() => goToSlide(index)}
          >
            <img
              src={image}
              alt={`Thumbnail ${index}`}
              className="h-36 object-cover rounded-md max-h-[144px]"
            />
          </div>
        ))}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={closeModal} //
        >
          <img
            src={currentImage}
            alt="Pełny obraz"
            className="max-w-full max-h-full object-contain cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default SlideShow;
