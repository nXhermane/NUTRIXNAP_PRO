import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import * as SQLite from 'expo-sqlite/next';
export default async function useDownloadDb(pathToDatabaseFile: string): Promise<SQLite.Database> {
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'db')).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'db');
  }
  await FileSystem.downloadAsync(
    Asset.fromModule(require("../../assets/db/nutrition.sqlite")).uri,
    FileSystem.documentDirectory + 'db/nutrixnap.sqlite'
  );
  const db = await SQLite.openDatabaseAsync('nutrixnap.sqlite');
  
}