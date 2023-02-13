import styles from "./imageForm.module.css";
import { useRef } from "react";

export const ImageForm = ({ albumName, onAdd }) => {
  const imageTitleInput = useRef();
  const imageUrlInput = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = imageTitleInput.current.value;
    const url = imageUrlInput.current.value;

    onAdd({ title, url });
    handleClear();
  };

  const handleClear = () => {
    imageTitleInput.current.value = "";
    imageUrlInput.current.value = "";
  };

  return (
    <div className={styles.imageForm}>
      <span>Add image to {albumName}</span>

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
