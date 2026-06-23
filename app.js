import fs from 'node:fs/promises'

const filePath = process.argv[2]
const searchWord = process.argv[3]
const wordsCount = {};

if (!filePath) {
    console.log("Usage: node index.js <file-path> [word]");
    process.exit(1);
}

try {
    const content = await fs.readFile(filePath, 'utf-8');
    const wordsArray = content.split(/[\W]/).filter((w) => w);

    wordsArray.forEach((word) => {
        if (word in wordsCount) {
            wordsCount[word] += 1;
        }
        else {
            wordsCount[word] = 1;

        }
    });

}
catch (e) {
    console.log("File not found!");
    process.exit(1);
}

if (searchWord) {
    let count = 0;
    for (const word in wordsCount) {
        if (word.toLowerCase() === searchWord.toLowerCase()) {
            count += wordsCount[word];
        }
    }
    console.log(searchWord, ':', count)
}
else {
    console.log(wordsCount);
}


