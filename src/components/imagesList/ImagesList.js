import styles from "./imageList.module.css";
import { useState, useRef } from "react";

// components imports
import { ImageForm } from "../imageForm/ImageForm";
import { Carousel } from "../carousel/Carousel";

// mock data
import { imagesData } from "../../static/mock";

export const ImagesList = ({ albumName }) => {
  const [images, setImages] = useState(imagesData);
  const [searchIntent, setSearchIntent] = useState(false);
  const searchInput = useRef();

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

  const handleSearchClick = () => {
    if (searchIntent) {
      searchInput.current.value = "";
      setImages(imagesData);
    }
    setSearchIntent(!searchIntent);
  };

  // async functions

  const handleSearch = () => {
    const query = searchInput.current.value;
    if (!query) return setImages(imagesData);
    const filteredImages = images.filter((i) => i.title.includes(query));
    setImages(filteredImages);
  };

  const handleAdd = ({ title, url }) => {
    const newImage = { id: Date.now(), title, url };
    setImages((prev) => [...prev, newImage]);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    const filteredImages = images.filter((i) => i.id !== id);
    setImages(filteredImages);
  };

  if (images.length === 0 && !searchInput.current.value) {
    return (
      <>
        <div className={styles.top}>
          <h3>No images found in the album.</h3>
          <button onClick={() => setAddImageIntent(!addImageIntent)}>
            {!addImageIntent ? "Add image" : "Cancel"}
          </button>
        </div>
        {addImageIntent && (
          <ImageForm onAdd={handleAdd} albumName={albumName} />
        )}
      </>
    );
  }
  return (
    <>
      {addImageIntent && <ImageForm onAdd={handleAdd} albumName={albumName} />}
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

        <div className={styles.search}>
          {searchIntent && (
            <input
              placeholder="Search..."
              onChange={handleSearch}
              ref={searchInput}
            />
          )}
          <img
            onClick={handleSearchClick}
            src={!searchIntent ? "/assets/search.png" : "/assets/clear.png"}
            alt="clear"
          />
        </div>
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
            key={image.id}
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
            <img
              src={image.url}
              alt={image.title}
              onError={({ currentTarget }) => {
                currentTarget.src = "/assets/warning.png";
              }}
            />
            <span>{image.title.substring(0, 20)}</span>
          </div>
        ))}
      </div>
    </>
  );
};
