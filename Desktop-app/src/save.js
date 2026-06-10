const fs = require("fs");

const path = "./data/data.json";

export async function createJSONFile(data) {
  console.log("Data:", data[0]);
  const jsonString = JSON.stringify(data[0]);

  console.log("Trying to create file");
  try {
    fs.writeFileSync(path, jsonString);
  } catch (err) {
    console.error("Failed with error,", err);
  }

  if (fs.existsSync(path)) console.log("File was created");
  else console.log("File was not created");
}

export async function loadJSONFile() {
  if (fs.existsSync(path)) return fs.readFileSync(path).toString();
  else return "Unable to Load File";
}
