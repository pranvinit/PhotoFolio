### PhotoFolio is an online photo album react app that allows users to upload, organize, and share their digital photos.

### Steps

##### Use the following guidelines and hints to build the project

- Get all albums in AlbumsList and use it inside the component
- Conditionally render the AlbumForm component
- Add a new album document to firestore when the AlbumForm is submitted
- Conditionally render the AlbumList and ImageList
- Get all images in an album when it is clicked
- Add, update and delete image in the album from firestore when the ImageForm is submitted or delete is clicked
- Add an effect to set default values on the ImageForm inputs when updateIntent is changed
- Add dynamic classes to the buttons

### Hints

- All the uppercase comments are actions that you need to be perform
- The mock implementation between the 'REMOVE MOCK' to 'MOCK END' comments needs to be removed
- Use the solution code and demo video and specific hints and code logic
- The firebase API would look like this:
  - /albums to perform CRUD on all albums
  - /albums/album_id/images to perform CRUD on images from the album with id album_id

### Evaluation Metrics

##### Your project will be evaluated on the basis of the following criterion:

- Firebase integration for creating, reading, updating and deleting tasks (33%)

  - Getting docs from firestore
  - Adding docs to firestore
  - Updating docs on firestore
  - Deleting docs from firestore
  - API design and usage

- Replacing mock data and functions with hooks and state (33%)

  - Using useState hook to maintain the state
  - Using useEffect hook to perform side effects
  - Using useRef hook to access input values
  - Replacing mock data with state values

- Implementation logic and app functionality (33%)
  - Conditionally rendering of forms and components
  - Buttons and inputs functionality
  - Adding dynamic styles

### Final Project Link

<a href="https://github.com/pranvinit/PhotoFolio" target="_blank">Solution</a>

### Demo Video

<iframe width="900" height="506" src="https://www.youtube.com/embed/BMDTJOSo5Y8" title="PhotoFolio: Firebase Mini Project" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
