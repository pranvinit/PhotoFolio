import styles from "./albumsList.module.css";
import { useState } from "react";
import { toast } from "react-toastify";

// components imports
import { AlbumForm } from "../albumForm/AlbumForm";
import { ImagesList } from "../imagesList/ImagesList";

// mock data
import { albumsData } from "../../static/mock";

export const AlbumsList = () => {
  const [albums, setAlbums] = useState(albumsData);

  const handleAdd = (name) => {
    if (albums.find((a) => a.name === name))
      return toast.error("Album name already in use.");
    const newAlbum = { id: Date.now(), name };
    setAlbums((prev) => [...prev, newAlbum]);
  };

  const [createAlbumIntent, setCreateAlbumIntent] = useState(false);
  const [activeAlbum, setActiveAlbum] = useState(null);

  const handleClick = (name) => {
    if (activeAlbum === name) return setActiveAlbum(null);
    setActiveAlbum(name);
  };

  if (albums.length === 0) {
    return (
      <>
        <div className={styles.top}>
          <h3>No albums found.</h3>
          <button onClick={() => setCreateAlbumIntent(!createAlbumIntent)}>
            {!createAlbumIntent ? "Add image" : "Cancel"}
          </button>
        </div>
        {createAlbumIntent && <AlbumForm onAdd={handleAdd} />}
      </>
    );
  }

  return (
    <>
      {createAlbumIntent && <AlbumForm onAdd={handleAdd} />}
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
            key={album.id}
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
      {activeAlbum && <ImagesList albumName={activeAlbum} />}
    </>
  );
};
