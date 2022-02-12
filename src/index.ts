import inquirer from 'inquirer'

import getWordList from './utils/getWordList'

const words = getWordList()

const questions = [
  {
    type: 'input',
    name: 'word',
    message: 'Qual é a palavra que você colocou? (LETRA: verde | _: errado | letra: amarelo)',
    validate(value) {
      return value.length === 5 ? true : 'A palavra deve conter 5 letras'
    }
  }
]

inquirer.prompt(questions).then((answers) => {
  findWords(answers['word'])

});

function findWords(guessedWord) {
  console.log(`Sua palavra é: ${guessedWord}`)
  let regex = ''
  
  const arrayOfLetters = guessedWord.split('')

  arrayOfLetters.forEach((letter, index) => {
    if (letter === letter.toUpperCase()) {
      regex = regex + letter
    } else {
      regex = regex + '.'
    }
  })

  console.log(regex)
}