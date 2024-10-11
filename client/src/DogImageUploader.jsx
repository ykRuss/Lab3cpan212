import React, { useState } from "react";

const DogImageUploader = () => {
  const [dogImage, setDogImage] = useState("https://random.dog/image.jpg"); 

  const uploadDogImage = async () => {
    if (!dogImage) return;

    try {
      const response = await fetch(dogImage);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append("file", new File([blob], "random-dog.jpg", { type: "image/jpeg" }));

      const uploadResponse = await fetch("http://localhost:8000/save/single", {
        method: "POST",
        body: formData,
      });
      const data = await uploadResponse.json();
      alert(data.message);
    } catch (error) {
      console.error("Error uploading dog image:", error);
    }
  };

  return (
    <div>
      <button onClick={uploadDogImage}>Upload Dog Image to Server</button>
    </div>
  );
};

export default DogImageUploader;
