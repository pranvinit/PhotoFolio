import styles from "./App.module.css";
import { useState } from "react";

// components imports
import { Navbar } from "./components/navbar/Navbar";
import { AlbumsList } from "./components/albumsList/AlbumsList";

// mock data
import { albumsData } from "./static/mock";

function App() {
  const [albums, setAlbums] = useState(albumsData);

  return (
    <div className={styles.App}>
      <Navbar />
      <div className={styles.content}>
        <AlbumsList albums={albums} />
      </div>
    </div>
  );
}

export default App;
