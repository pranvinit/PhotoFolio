import styles from "./imageList.module.css";
import { useState } from "react";

// components imports
import { ImageForm } from "../imageForm/ImageForm";
import { Carousel } from "../carousel/Carousel";

export const ImagesList = ({ albumName, images }) => {
  const [addImageIntent, setAddImageIntent] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [activeHoverImageIndex, setActiveHoverImageIndex] = useState(null);

  const handleNext = () => {
    if (activeImageIndex === images.length - 1) return setActiveImageIndex(0);
    setActiveImageIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (activeImageIndex === 0) return setActiveImageIndex(images.length - 1);
    setActiveImageIndex((prev) => prev - 1);
  };

  const handleCancel = () => setActiveImageIndex(null);

  // async functions
  const handleDelete = (e, id) => {
    e.stopPropagation();
    console.log(id);
  };

  if (images.length === 0) {
    return (
      <div className={styles.top}>
        <h3>No images found in the album.</h3>
        <button onClick={() => setAddImageIntent(!addImageIntent)}>
          {!addImageIntent ? "Add image" : "Cancel"}
        </button>
      </div>
    );
  }
  return (
    <>
      {addImageIntent && <ImageForm albumName={albumName} />}
      {(activeImageIndex || activeImageIndex === 0) && (
        <Carousel
          title={images[activeImageIndex].title}
          url={images[activeImageIndex].url}
          onNext={handleNext}
          onPrev={handlePrev}
          onCancel={handleCancel}
        />
      )}
      <div className={styles.top}>
        <h3>Images in {albumName}</h3>
        <button
          className={`${addImageIntent && styles.active}`}
          onClick={() => setAddImageIntent(!addImageIntent)}
        >
          {!addImageIntent ? "Add image" : "Cancel"}
        </button>
      </div>
      <div className={styles.imageList}>
        {images.map((image, i) => (
          <div
            className={styles.image}
            onMouseOver={() => setActiveHoverImageIndex(i)}
            onMouseOut={() => setActiveHoverImageIndex(null)}
            onClick={() => setActiveImageIndex(i)}
          >
            <div
              className={`${styles.delete} ${
                activeHoverImageIndex === i && styles.active
              }`}
              onClick={(e) => handleDelete(e, image.id)}
            >
              <img src="/assets/trash-bin.png" alt="delete" />
            </div>
            <img src={image.url} alt={image.title} />
            <span>{image.title}</span>
          </div>
        ))}
      </div>
    </>
  );
};
