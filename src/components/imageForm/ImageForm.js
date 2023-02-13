import styles from "./imageForm.module.css";
import { useRef } from "react";

export const ImageForm = ({ albumName }) => {
  const imageTitleInput = useRef();
  const imageUrlInput = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClear = () => {
    imageTitleInput.current.value = "";
    imageUrlInput.current.value = "";
  };

  return (
    <div className={styles.imageForm}>
      <span>Add image in {albumName}</span>

      <form onSubmit={handleSubmit}>
        <input placeholder="Title" ref={imageTitleInput} />
        <input placeholder="Image URL" ref={imageUrlInput} />
        <div className={styles.actions}>
          <button type="button" onClick={handleClear}>
            Clear
          </button>
          <button>Add</button>
        </div>
      </form>
    </div>
  );
};
