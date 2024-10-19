import { useState, useEffect } from 'react';

const useImage = (src: string) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setImage(img);
    img.onerror = () => setError('Error al cargar la imagen');
  }, [src]);

  return image;
};

export default useImage;
