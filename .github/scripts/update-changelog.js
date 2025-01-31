const fs = require("fs");

function extractInfo(fileName) {
  if (fs.existsSync(fileName)) {
    const url = `https://doka.guide/${fileName.replace("index.md", "")}`;
    const date = process.argv[2];

    const content = fs.readFileSync(fileName).toString();

    const title = content
      .match(/title: ('|"|).*('|"|)\n/)[0]
      .replace(/title: ('|"|)/, "")
      .replace(/('|"|)\n/, "");

    const authorsSelection =
      /authors:\n(  - .*\n)+(contributors|cover|editors|keywords|related|tags):/;
    const authors = content
      .match(authorsSelection)[0]
      .split("\n")
      .slice(1, -1)
      .map((s) => s.replace("  - ", ""))
      .filter((a) => a !== 'doka-dog')
      .map((a) => {
        const authorFileName = `./people/${a}/index.md`;
        if (fs.existsSync(authorFileName)) {
          return fs
            .readFileSync(authorFileName)
            .toString()
            .match(/name: ('|"|).*('|"|)\n/)[0]
            .replace(/name: ('|"|)/, "")
            .replace(/('|"|)\n/, "");
        }
        return authorFileName;
      });

    return `- ${date}, [${title}](${url}), ${authors.join(", ")}`;
  }
  return null;
}

const changelogFileName = "./CHANGELOG.md";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
const currentMonth = monthNames[currentDate.getMonth()];
const header = `## ${currentMonth} ${currentYear}`;

const addedContent = fs
  .readFileSync("added-content.txt")
  .toString()
  .split("\n");

if (
  addedContent.length === 0 ||
  (addedContent.length > 0 && addedContent[0] === "")
) {
  return;
}

const addedContentList = addedContent.map((fileName) => extractInfo(fileName));

if (addedContentList.length > 0) {
  if (fs.existsSync(changelogFileName)) {
    const changelog = fs.readFileSync(changelogFileName).toString().split("\n");
    if (changelog.filter((s) => s.startsWith("## ")).includes(header)) {
      const headerPosition = changelog.findIndex((s) => s === header);
      changelog.splice(headerPosition + 2, 0, ...addedContentList);
    } else {
      const headerPosition = 4;
      changelog.splice(headerPosition, 0, ...[header, "", ""]);
      changelog.splice(headerPosition + 2, 0, ...addedContentList);
    }
    fs.writeFileSync(changelogFileName, changelog.filter(line => line.trim() !== "" || line.startsWith("##")).join("\n"));
    console.log("Новые материалы добавлены в CHANGELOG.md");
  }
} else {
  console.log("Нечего добавлять из списка новых материалов в CHANGELOG.md");
}

const updatedContent = fs
  .readFileSync("updated-content.txt")
  .toString()
  .split("\n");

if (
  updatedContent.length === 0 ||
  (updatedContent.length > 0 && updatedContent[0] === "")
) {
  return;
}

const updatedContentList = updatedContent.map((fileName) => extractInfo(fileName));

if (updatedContentList.length > 0) {
  if (fs.existsSync(changelogFileName)) {
    const changelog = fs.readFileSync(changelogFileName).toString().split("\n");
    if (changelog.filter((s) => s.startsWith("## ")).includes(header)) {
      const headerPosition = changelog.findIndex((s) => s === header);
      changelog.splice(headerPosition + 2, 0, ...updatedContentList);
    } else {
      const headerPosition = 4;
      changelog.splice(headerPosition, 0, ...[header, "", ""]);
      changelog.splice(headerPosition + 2, 0, ...updatedContentList);
    }
    fs.writeFileSync(changelogFileName, changelog.filter(line => line.trim() !== "" || line.startsWith("##")).join("\n"));
    console.log("Бывшие плейсхолдеры добавлены в CHANGELOG.md");
  }
} else {
  console.log("Нечего добавлять из списка бывших плейсхолдеров в CHANGELOG.md");
}
