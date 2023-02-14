import styles from "./albumsList.module.css";
import { useState, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import Spinner from "react-spinner-material";

// ADD FIREBASE IMPORTS HERE

// components imports
import { AlbumForm } from "../albumForm/AlbumForm";
import { ImagesList } from "../imagesList/ImagesList";

// mock data
import { data } from "../../static/mock";
let albumsData = data.albums;

export const AlbumsList = () => {
  // REMOVE THIS
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  // STORE ALBUMS IN STATE HERE
  const [loading, setLoading] = useState(false);

  const [albumAddLoading, setAlbumAddLoading] = useState(false);

  // CREATE FUNCTION TO SET THE ALBUM NAME IN STATE IF IT IS CLICKED AND NOT SELECTED
  // SET THE STATE TO NULL IF THE ALBUM NAME IS ALREADY SELECTED

  // CREATE A FUNCTION TO GO BACK TO AlbumsList

  // async functions
  const getAlbums = async () => {
    setLoading(true);

    // GET ALBUMS FROM FIRESTORE HERE

    setLoading(false);
  };

  useEffect(() => {
    getAlbums();
  }, []);

  const handleAdd = async (name) => {
    // USE STATE AND REMOVE MOCK
    if (albumsData.find((a) => a.name === name))
      return toast.error("Album name already in use.");

    // ADD ALBUM TO FIRESTORE HERE AND REMOVE MOCK
    albumsData.unshift({ id: Date.now(), name });
    forceUpdate();
    // MOCK END

    setAlbumAddLoading(false);
    toast.success("Album added successfully.");
  };

  // ADD STATES TO CONDITIONALLY RENDER IMAGESLIST IF AN ALBUM IS SELECTED AND ALBUMFORM IF THE ADD BUTTON IS CLICKED

  // USE STATE AND REMOVE MOCK
  if (albumsData.length === 0 && !loading) {
    return (
      <>
        <div className={styles.top}>
          <h3>No albums found.</h3>
          {/* TOGGLE STATE TO CONDITIONALLY RENDER ALBUMFORM HERE */}
          <button onClick={() => null}>
            {/* SET THE BUTTON TEXT DYNAMICALLY */}
            {true ? "Add album" : "Cancel"}
          </button>
        </div>

        {/* CONDITIONALLY RENDER AlbumForm */}
        <AlbumForm onAdd={handleAdd} />
      </>
    );
  }
  if (loading) {
    return (
      <div className={styles.loader}>
        <Spinner color="#0077ff" />
      </div>
    );
  }

  return (
    <>
      {/* CONDITIONALLY RENDER THE COMPONENT IF ADD BUTTON IS CLICKED AND NO ALBUM IS SELECTED */}
      <AlbumForm loading={albumAddLoading} onAdd={handleAdd} />
      <div>
        <div className={styles.top}>
          <h3>Your albums</h3>
          {/* TOGGLE STATE TO CONDITIONALLY RENDER AlbumForm HERE */}
          <button onClick={() => null}>
            {/* SET THE BUTTON TEXT DYNAMICALLY */}
            {true ? "Add album" : "Cancel"}
          </button>
        </div>
        <div className={styles.albumsList}>
          {albumsData.map((album) => (
            <div
              key={album.id}
              className={styles.album}
              // SET THE ALBUM STATE TO THE NAME OF ALBUM HERE
              onClick={() => null}
            >
              <img src="/assets/photos.png" alt="images" />
              <span>{album.name}</span>
            </div>
          ))}
        </div>
      </div>

      <ImagesList
        // GET ALBUM ID FROM ACTIVE ALBUM HERE
        albumId={"demoalbumid"}
        albumName={"Demo album name"}
        // SET THE BACK FUNCTION AS HANDLER HERE
        onBack={() => null}
      />
    </>
  );
};
