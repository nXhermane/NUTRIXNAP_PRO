import React, { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";
export default function useDownloadFile(directory: string) {
    const [uri, setUri] = useState<string>("");
    const download = async (
        uri: string,
        fileName: string,
        options?: FileSystem.DownloadOptions
    ) => {
        const dir = FileSystem.documentDirectory + directory;
        const dirInfo = await FileSystem.getInfoAsync(dir);
        if (!dirInfo.exists) {
             await FileSystem.makeDirectoryAsync(dir);
        }
        FileSystem.downloadAsync(uri, dir + "/" + fileName).then(
            ({ uri }) => {
                setUri(uri);
            }
        );
    };
    return [download, uri, uri != ""];
}
