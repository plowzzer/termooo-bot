// Disable HTTPS certification
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

import * as fs from "fs";
import axios from "axios";

export default async function () {
  if (checkFile('fiveWordList')) {
    try {
      const data = fs.readFileSync('dist/fiveWordList.txt', 'utf-8');
      return data;
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  if (checkFile('wordList')) {
    try {
      const data = fs.readFileSync('dist/wordList.txt', 'utf-8');
      return dataTransform(data)
    } catch (err) {
      console.error(err);
      throw err
    }
  }

  try {
    const { data } = await axios.get('https://www.ime.usp.br/~pf/dicios/br-sem-acentos.txt')
    return dataTransform(data)
  } catch (err) {
    console.log(err)
    throw err
  }

}

function checkFile (file:string) {
  return fs.existsSync(`dist/${file}.txt`)
}

function dataTransform (data: string){
  const allFiveLettersWords = []
  const allWords = data.split('\n')

  allWords.forEach(word => {
    word.length === 5 && allFiveLettersWords.push(word)
  })

  writeFile('dist/fiveWordList.txt' ,allFiveLettersWords.join('\n'))

  return allFiveLettersWords;
}

function writeFile(file: string, data: string) {
  fs.writeFile(file, data, (err) => {
    if (err) throw err;
    console.log(file, "saved.");
  });
}