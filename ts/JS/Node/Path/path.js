/**
 * @EM里的__dirname和filename获取
 */
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename)
const __filename = import.meta.filename
const __dirname = import.meta.dirname


if (process.argv[2] === '--test') {
    console.log(__filename)
    console.log(__dirname)
    console.log(import.meta.url)
    // file:///C:/Users/Lenovo/Desktop/project/algorithm/JS/Node/Path/import.js
}


