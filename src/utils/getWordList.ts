// Disable HTTPS certification
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

import * as fs from "fs";
import axios from "axios";

// urls
const USP_SEM_ACENTOS = 'https://www.ime.usp.br/~pf/dicios/br-sem-acentos.txt'
const FSERB_DICIO = 'https://raw.githubusercontent.com/fserb/pt-br/master/dicio'
const FSERB_PALAVRAS = 'https://raw.githubusercontent.com/fserb/pt-br/master/palavras'

export default async function () {
  if (checkFile('fiveWordList')) {
    try {
      const data = fs.readFileSync('dist/fiveWordList.txt', 'utf-8')
      return dataTransform(data)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  if (checkFile('wordList')) {
    try {
      const data = fs.readFileSync('dist/wordList.txt', 'utf-8')
      return dataTransform(data, true)
    } catch (err) {
      console.error(err);
      throw err
    }
  }

  try {
    const { data } = await axios.get(FSERB_DICIO)
    return dataTransform(data, true)
  } catch (err) {
    console.log(err)
    throw err
  }

}

function checkFile (file:string) {
  return fs.existsSync(`dist/${file}.txt`)
}

function dataTransform (data: string, save: boolean = false){
  const allFiveLettersWords = []
  const allFiveLettersNormalized = []
  const allWords = data.split('\n')

  allWords.forEach(word => {
    word.length === 5 && allFiveLettersWords.push(word)
  })

  allFiveLettersWords.forEach(word => {
    const normalizedWord = word.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    allFiveLettersNormalized.push(normalizedWord)
  })

  save && writeFile('dist/fiveWordList.txt', allFiveLettersNormalized.join('\n'))

  return allFiveLettersNormalized;
}

function writeFile(file: string, data: string) {
  fs.writeFile(file, data, (err) => {
    if (err) throw err;
    console.log(file, "saved.");
  });
}