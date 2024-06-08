import React, { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
export default function useCopyFile() {
  const [uri, setUri] = useState<string>('');
  const copy = async (uri: string, directory: string, fileName: string) => {
    return new Promise<{ uri: string }>(async (resolve, reject) => {
      const dir = FileSystem.documentDirectory + directory;
      const dirInfo = await FileSystem.getInfoAsync(dir);

      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(dir);
      }

      const fileUri = dir + '/' + fileName;
      FileSystem.copyAsync({ from: uri, to: fileUri })
        .then(() => {
          setUri(fileUri);
          resolve({ uri: fileUri });
        })
        .catch(() => {
          reject({ uri: null });
        });
    });
  };
  return [copy, uri, uri != ''];
}
