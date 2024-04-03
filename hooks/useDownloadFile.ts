import React, { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";

export default function useDownloadFile() {
    const [uri, setUri] = useState<string>("");
    const download = async (
        uri: string,
        directory: string,
        fileName: string,
        options?: FileSystem.DownloadOptions
    ) => {
        return new Promise<{ uri: string }>(async (resoleve, reject) => {
            const dir = FileSystem.documentDirectory + directory;
            const dirInfo = await FileSystem.getInfoAsync(dir);
            if (!dirInfo.exists) {
                await FileSystem.makeDirectoryAsync(dir);
            }
            FileSystem.downloadAsync(uri, dir + "/" + fileName)
                .then(({ uri }) => {
                    setUri(uri);
                    resoleve({ uri: uri });
                })
                .catch((e: Error) => {
                    reject(e);
                });
        });
    };
    return [download, uri, uri != ""];
}
