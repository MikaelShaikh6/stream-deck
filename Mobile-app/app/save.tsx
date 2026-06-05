import { documentDirectory, writeAsStringAsync } from "expo-file-system/legacy";

const path = documentDirectory + "save.json";
export const writeFile = async () => {
  await writeAsStringAsync(path, "hello world");
  console.log("written to:", path);
};
