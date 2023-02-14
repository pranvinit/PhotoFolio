import styles from "./imageList.module.css";
import { useState, useRef, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import Spinner from "react-spinner-material";

// components imports
import { ImageForm } from "../imageForm/ImageForm";
import { Carousel } from "../carousel/Carousel";

// ADD FIREBASE IMPORTS HERE

// mock data
import { data } from "../../static/mock";
let imagesData = data.images;

// storing images
let IMAGES;

export const ImagesList = ({ albumId, albumName, onBack }) => {
  // REMOVE THIS
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  // STORE IMAGES IN STATE HERE
  const [loading, setLoading] = useState(false);

  const [searchIntent, setSearchIntent] = useState(false);
  const searchInput = useRef();

  // ADD STATES TO CONDITIONALLY RENDER IMAGEFORM IF THE ADD BUTTON IS CLICKED
  const [imgLoading, setImgLoading] = useState(false);

  const [updateImageIntent, setUpdateImageIntent] = useState(false);

  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [activeHoverImageIndex, setActiveHoverImageIndex] = useState(null);

  const handleNext = () => {
    // USE STATE AND REMOVE MOCK
    if (activeImageIndex === imagesData.length - 1)
      return setActiveImageIndex(0);
    setActiveImageIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    // USE STATE AND REMOVE MOCK
    if (activeImageIndex === 0)
      return setActiveImageIndex(imagesData.length - 1);
    setActiveImageIndex((prev) => prev - 1);
  };
  const handleCancel = () => setActiveImageIndex(null);

  const handleSearchClick = () => {
    if (searchIntent) {
      searchInput.current.value = "";
      getImages();
    }
    setSearchIntent(!searchIntent);
  };

  const handleSearch = async () => {
    const query = searchInput.current.value;
    if (!query) return IMAGES;

    const filteredImages = IMAGES.filter((i) => i.title.includes(query));

    // SET IMAGE STATE TO FILTERED IMAGES HERE AND REMOVE MOCK
    imagesData = filteredImages;
    forceUpdate();
  };

  // async functions
  const getImages = async () => {
    setLoading(true);

    // GET IMAGES FROM FIRESTORE HERE
    IMAGES = imagesData;
    forceUpdate();
    // MOCK END

    setLoading(false);
  };

  useEffect(() => {
    getImages();
  }, []);

  const handleAdd = async ({ title, url }) => {
    setImgLoading(true);

    // ADD IMAGE TO FIRESTORE HERE AND REMOVE MOCK
    imagesData.unshift({ id: Date.now(), title, url });
    forceUpdate();
    // MOCK END

    toast.success("Image added successfully.");
    setImgLoading(false);
  };

  const handleUpdate = async ({ title, url }) => {
    setImgLoading(true);

    // UPDATE IMAGE IN FIRESTORE WITH albumId HERE AND REMOVE MOCK
    const image = { id: Date.now(), title, url };
    const updatedImages = imagesData.map((i) => {
      if (i.id === updateImageIntent.id) return image;
      return i;
    });
    imagesData = updatedImages;
    forceUpdate();
    // MOCK END

    toast.success("Image updated successfully.");
    setImgLoading(false);
    setUpdateImageIntent(false);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();

    // DELETE IMAGE FROM FIRESTORE AND REMOVE MOCK
    const updatedImages = imagesData.filter((i) => i.id !== id);
    imagesData = updatedImages;
    forceUpdate();

    toast.success("Image deleted successfully.");
  };

  if (!imagesData.length && !searchInput.current?.value && !loading) {
    return (
      <>
        <div className={styles.top}>
          <span onClick={onBack}>
            <img src="/assets/back.png" alt="back" />
          </span>
          <h3>No images found in the album.</h3>

          {/* TOGGLE STATE TO CONDITIONALLY RENDER ImageForm HERE */}
          <button onClick={() => null}>
            {/* SET THE BUTTON TEXT DYNAMICALLY */}

            {!true ? "Add image" : "Cancel"}
          </button>
        </div>
        {/* CONDITIONALLY RENDER THE COMPONENT IF ADD BUTTON IS CLICKED */}
        <ImageForm
          loading={imgLoading}
          onAdd={handleAdd}
          albumName={albumName}
        />
      </>
    );
  }
  return (
    <>
      {/* CONDITIONALLY RENDER THE COMPONENT IF ADD BUTTON IS CLICKED or updateImageIntent IS NOT FALSY */}
      <ImageForm
        loading={imgLoading}
        onAdd={handleAdd}
        albumName={albumName}
        onUpdate={handleUpdate}
        updateIntent={updateImageIntent}
      />
      {(activeImageIndex || activeImageIndex === 0) && (
        <Carousel
          title={imagesData[activeImageIndex].title}
          url={imagesData[activeImageIndex].url}
          onNext={handleNext}
          onPrev={handlePrev}
          onCancel={handleCancel}
        />
      )}
      <div className={styles.top}>
        <span onClick={onBack}>
          <img src="/assets/back.png" alt="back" />
        </span>
        <h3>Images in {albumName}</h3>

        <div className={styles.search}>
          {searchIntent && (
            <input
              placeholder="Search..."
              onChange={handleSearch}
              ref={searchInput}
              autoFocus={true}
            />
          )}
          <img
            onClick={handleSearchClick}
            src={!searchIntent ? "/assets/search.png" : "/assets/clear.png"}
            alt="clear"
          />
        </div>
        {updateImageIntent && (
          <button
            className={styles.active}
            onClick={() => setUpdateImageIntent(false)}
          >
            Cancel
          </button>
        )}
        {!updateImageIntent && (
          // TOGGLE STATE TO CONDITIONALLY RENDER ImageForm HERE *
          <button onClick={() => null}>
            {/* SET THE BUTTON TEXT DYNAMICALLY */}
            {true ? "Add image" : "Cancel"}
          </button>
        )}
      </div>
      {loading && (
        <div className={styles.loader}>
          <Spinner color="#0077ff" />
        </div>
      )}
      {!loading && (
        <div className={styles.imageList}>
          {imagesData.map((image, i) => (
            <div
              key={image.id}
              className={styles.image}
              onMouseOver={() => setActiveHoverImageIndex(i)}
              onMouseOut={() => setActiveHoverImageIndex(null)}
              onClick={() => setActiveImageIndex(i)}
            >
              <div
                className={`${styles.update} ${
                  activeHoverImageIndex === i && styles.active
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setUpdateImageIntent(image);
                }}
              >
                <img src="/assets/edit.png" alt="update" />
              </div>
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
      )}
    </>
  );
};
