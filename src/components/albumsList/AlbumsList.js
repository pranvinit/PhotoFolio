import styles from "./albumsList.module.css";
import { useState } from "react";
import { ImagesList } from "../imagesList/ImagesList";

// components imports
import { AlbumForm } from "../albumForm/AlbumForm";

// mock data
import { imagesData } from "../../static/mock";

export const AlbumsList = ({ albums }) => {
  const [createAlbumIntent, setCreateAlbumIntent] = useState(false);
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [images, setImages] = useState(imagesData);

  const handleClick = (name) => {
    if (activeAlbum === name) return setActiveAlbum(null);
    setActiveAlbum(name);
  };

  if (albums.length === 0) {
    return (
      <div className={styles.top}>
        <h3>No albums found.</h3>
        <button onClick={() => setCreateAlbumIntent(!createAlbumIntent)}>
          {!createAlbumIntent ? "Add image" : "Cancel"}
        </button>
      </div>
    );
  }

  return (
    <>
      {createAlbumIntent && <AlbumForm />}
      <div className={styles.top}>
        <h3>Your albums</h3>
        <button
          className={`${createAlbumIntent && styles.active}`}
          onClick={() => setCreateAlbumIntent(!createAlbumIntent)}
        >
          {!createAlbumIntent ? "Add album" : "Cancel"}
        </button>
      </div>
      <div className={styles.albumsList}>
        {albums.map((album) => (
          <div
            className={`${styles.album} ${
              album.name === activeAlbum && styles.active
            }`}
            onClick={() => handleClick(album.name)}
          >
            <img src="/assets/photos.png" alt="images" />
            <span>{album.name}</span>
          </div>
        ))}
      </div>
      {activeAlbum && <ImagesList albumName={activeAlbum} images={images} />}
    </>
  );
};
