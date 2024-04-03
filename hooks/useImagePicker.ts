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
    if (config) config = { ...config, ...defaultConfig };
    const [uri, setUri] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [statusCamera, requestPermissionCamera] =
        ImagePicker.useCameraPermissions();
    const [statusMedia, requestPermissionMedia] =
        ImagePicker.useMediaLibraryPermissions();

    const picker = async (): Promise<{ uri: string; type: string }> => {
        return new Promise<{ uri: string; type: string }>((resolve, reject) => {
            requestPermissionMedia();
            requestPermissionCamera();
            if (statusMedia?.granted && statusCamera?.granted) {
               // ImagePicker.launchCameraAsync(config)
                ImagePicker.launchImageLibraryAsync(config || defaultConfig)
                    .then(image => {
                        setUri(image.assets[0].uri);
                        const interType = image.assets[0].mimeType.split("/");
                        setType(interType[interType.length - 1]);
                        resolve({ uri: image.assets[0].uri, type: interType[interType.length - 1] });
                    })
                    .catch(e => {
                        reject(e);
                    });
            }
        });
    };
    return [picker,uri,type];
}
