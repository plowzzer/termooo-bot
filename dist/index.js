"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getWordList_1 = __importDefault(require("./utils/getWordList"));
console.log((0, getWordList_1.default)());
// const getWords = () => {
//   const allFiveLettersWords = []
//   const allWords = getWordList().split('\n')
//   allWords.forEach(word => {
//     word.length === 5 && allFiveLettersWords.push(word)
//   })
//   writeFile('dist/fiveWordList.txt' ,allFiveLettersWords.join('\n'))
// }
//# sourceMappingURL=index.js.map