import inquirer from 'inquirer'

import getWordList from './utils/getWordList'


(async () => {
  console.clear()
  const allWords = await getWordList()
  const tmp = {
    green: [
      { letter: 'B', index: 0 },
      { letter: 'R', index: 3 }
    ],
    yellow: [ { letter: 'e', index: 1 }, { letter: 'd', index: 2 } ],
    notIn: [ 'a', 'c', 'l' ]
  }
  
  findWords(allWords, tmp)

  // inquirer.prompt(questions).then((answers) => {
  //   const word = validateWord(answers['word'])
  //   word['notIn'] = answers['notLetter'].split('')

  //   console.log(word)

  //   findWords(allWords, word)
  // });

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
    name: 'notLetter',
    message: 'Quais letras não existem'
  },
]


function validateWord(guessedWord) {
  const words = {
    green: [],
    yellow: []
  }
  
  const arrayOfLetters = guessedWord.split('')

  arrayOfLetters.forEach((letter, index) => {
    if (letter !== '_' && letter === letter.toUpperCase()) {
      words['green'].push({ letter, index })
    } else if (letter !== '_') {
      words['yellow'].push({ letter, index })
    }
  })

  return words
}

function findWords(allWords, word){
  // TODO : check if not have word {}

  console.log(word.green[0].letter)

  const teste = allWords.find(e => {
    return e.toUpperCase().indexOf(word.green[0].letter, 0)
  })

  console.log(teste)
  
}