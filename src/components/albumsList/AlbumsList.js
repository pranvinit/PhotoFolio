import styles from "./albumsList.module.css";
import { useState } from "react";
import { ImagesList } from "../imagesList/ImagesList";

// mock data
import { imagesData } from "../../static/mock";

export const AlbumsList = ({ albums }) => {
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [images, setImages] = useState(imagesData);

  const handleClick = (name) => {
    if (activeAlbum === name) return setActiveAlbum(null);
    setActiveAlbum(name);
  };

  return (
    <>
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
