import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export default function useImagePicker(config?: any) {
  const defaultConfig = {
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 4],
    quality: 1
  };

  const mergedConfig = { ...defaultConfig, ...config };

  const [imageUri, setImageUri] = useState<string>("");
  const [imageType, setImageType] = useState<string>("");
  const [cameraStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  const [mediaLibraryStatus, requestMediaLibraryPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const pickImage = async (): Promise<{ uri: string; type: string }> => {
    await requestCameraPermission();
    await requestMediaLibraryPermission();

    if (cameraStatus.granted && mediaLibraryStatus.granted) {
      const result = await ImagePicker.launchImageLibraryAsync(mergedConfig);

      if (!result.cancelled) {
        const interType: string[] = result.uri?.split(".");
        const image = {
          uri: result.uri,
          type: interType[interType.length - 1]
        };
        setImageUri(result.uri);
        setImageType(interType[interType.length - 1]);
        return image;
      }
    }

    throw new Error("Camera or media library permission not granted");
  };

  return [pickImage, imageUri, imageType];
}
