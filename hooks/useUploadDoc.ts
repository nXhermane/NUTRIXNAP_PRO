import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
export default function useImagePicker(
  onChange: (uti: string) => void,
  config?: any,
) {
  const defaultConfig = {
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 4],
    quality: 1,
  };
  if (config) config = { ...config, ...defaultConfig };
  const [uri, setUri] = useState<string>('');
  useEffect(() => {
    onChange(uri);
  }, [uri]);
  const picker = () => {
    ImagePicker.launchImageLibraryAsync(config || defaultConfig).then(
      (image) => {
        setUri(image.assets![0].uri);
      },
    );
  };
  return [picker];
}
