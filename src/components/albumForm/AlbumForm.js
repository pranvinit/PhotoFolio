import styles from "./albumForm.module.css";
import { useRef } from "react";

export const AlbumForm = () => {
  const albumNameInput = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const albumName = albumNameInput.current.value;
    console.log(albumName);
  };

  return (
    <div className={styles.albumForm}>
      <span>Create an album</span>
      <form onSubmit={handleSubmit}>
        <input placeholder="Album Name" ref={albumNameInput} />
        <button
          type="button"
          onClick={() => (albumNameInput.current.value = "")}
        >
          Clear
        </button>
        <button>Create</button>
      </form>
    </div>
  );
};
