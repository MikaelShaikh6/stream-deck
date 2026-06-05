const fs = require("fs");

export async function createJSONFile(data) {
  console.log("Data:", data[0]);
  const jsonString = JSON.stringify(data[0]);
  console.log("made create function");

  fs.writeFileSync("data.json", jsonString);

  console.log("made past");
}
