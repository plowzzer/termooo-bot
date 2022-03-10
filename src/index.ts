import inquirer from 'inquirer'

import getWordList from './utils/getWordList'


(async () => {
  console.clear()
  const allWords = await getWordList()

  inquirer.prompt(questions).then((answers) => {
    const found = findWords(allWords, answers['word'], answers['notIn'])
    console.log(`Você tem chances de acerto ${found.length}`)
    console.log(`As palavras que você pode jogar são:`)
    console.log(found)
  })

})()


const questions = [
  {
    type: 'input',
    name: 'word',
    message: 'Qual é a palavra que você colocou? (LETRA: verde | _: errado | letra: amarelo)',
    validate(value) {
      return value.length === 5 ? true : 'A palavra deve conter 5 letras'
    }
  },
  {
    type: 'input',
    name: 'notIn',
    message: 'Quais letras não existem'
  },
]

function findWords(dictonary, word, lettersNotIn) {
  console.log('dic', dictonary)
  const wordArray = word.split('')
  const wordsThatFit = []
  let haveRights = false
  let haveNotInRightPlace = false
  let wordRightCount = 0
  const arrayOfNotInRightPlace = []

  wordArray.forEach(letter => {
    if (letter === letter.toUpperCase() && letter !== '_') {
      haveRights = true
      wordRightCount++
    }
    if (letter === letter.toLowerCase() && letter !== '_') {
      haveNotInRightPlace = true
      arrayOfNotInRightPlace.push(letter)
    }
  })

  if (haveRights) {
    dictonary.filter(dictionaryWord => {
      const dictionaryWordArray = dictionaryWord.toUpperCase().split('')
      let lettersGreen = 0
      dictionaryWordArray.forEach((letter, index) => {
        if (letter === wordArray[index]) {
          lettersGreen++
        }
      })

      if (lettersGreen === wordRightCount) {
        wordsThatFit.push(dictionaryWord)
      }
    })
  }
  
  if (arrayOfNotInRightPlace) {
    for (let index = wordsThatFit.length-1 ; index >= 0; index--) {
      const word = wordsThatFit[index];
      for (let j = 0; j < arrayOfNotInRightPlace.length; j++) {
        const letter = arrayOfNotInRightPlace[j]
        if (!word.toLowerCase().includes(letter)) {
          wordsThatFit.splice(index, 1)
          break
        }
      }
    }
  }

  if (wordsThatFit.length > 1) {
    for (let index = wordsThatFit.length-1 ; index >= 0; index--) {
      const word = wordsThatFit[index];
      const lettersNotInArray = lettersNotIn.split('')
      for (let j = 0; j < lettersNotInArray.length; j++) {
        const letter = lettersNotInArray[j]
        if (word.includes(letter)) {
          wordsThatFit.splice(index, 1)
          break
        }
      }
    }
  }

  return wordsThatFit
}