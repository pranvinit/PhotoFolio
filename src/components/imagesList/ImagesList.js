import styles from "./imageList.module.css";
import { useState } from "react";

// components imports
import { ImageForm } from "../imageForm/ImageForm";

export const ImagesList = ({ albumName, images }) => {
  const [addImageIntent, setAddImageIntent] = useState(false);

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
        {images.map((image) => (
          <div className={styles.image}>
            <img src={image.url} alt={image.title} />
            <span>{image.title}</span>
          </div>
        ))}
      </div>
    </>
  );
};
