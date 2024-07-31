import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [invertedImage, setInvertedImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setOriginalImage(e.target.result);
      invertImage(e.target.result);
    };

    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': ['.jpg', '.jpeg'] },
    multiple: false
  });

  const invertImage = (src) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];     // red
        data[i + 1] = 255 - data[i + 1]; // green
        data[i + 2] = 255 - data[i + 2]; // blue
      }

      ctx.putImageData(imageData, 0, 0);
      setInvertedImage(canvas.toDataURL());
    };
    img.src = src;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Image Color Inverter</h1>
      <Card className="p-6">
        <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the image here ...</p>
          ) : (
            <p>Drag 'n' drop a JPG image here, or click to select one</p>
          )}
        </div>
        {originalImage && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Original Image</h2>
              <img src={originalImage} alt="Original" className="mx-auto object-cover max-w-full h-auto" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Inverted Image</h2>
              {invertedImage ? (
                <img src={invertedImage} alt="Inverted" className="mx-auto object-cover max-w-full h-auto" />
              ) : (
                <p>Processing...</p>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Index;
