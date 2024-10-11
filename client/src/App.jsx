import { useState } from "react";

function App() {
  const [singleFile, setSingleFile] = useState(null);
  const [dogImage, setDogImage] = useState("");

  const handleSingleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
  };

  const uploadSingleFile = async () => {
    const formData = new FormData();
    formData.append("file", singleFile);

    try {
      const response = await fetch("http://localhost:8000/save/single", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error uploading single file:", error);
    }
  };

  const fetchRandomDogImage = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      setDogImage(data.message);
    } catch (error) {
      console.error("Error fetching dog image:", error);
    }
  };

  return (
    <div>
      <h1>File Upload and Fetch App</h1>

      <div>
        <h2>Upload Single File</h2>
        <input type="file" onChange={handleSingleFileChange} />
        <button onClick={uploadSingleFile}>Upload Single File</button>
      </div>

      <div>
        <h2>Random Dog Image</h2>
        <button onClick={fetchRandomDogImage}>Get Random Dog Image</button>
        {dogImage && <img src={dogImage} alt="Random Dog" />}
      </div>
    </div>
  );
}

export default App;
