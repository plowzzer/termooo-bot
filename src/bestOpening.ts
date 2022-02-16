import getWordList from './utils/getWordList'


(async () => {
  console.clear()
  const allWords = await getWordList()
  console.log(`São no total ${allWords.length} palavras encontradas`)
  const alphabet = getLettersAndCount(allWords)

  const sortable = Object.fromEntries(Object.entries(alphabet).sort(([,a],[,b]) => <number>b - <number>a))
  console.log('Dispostas em (letra/vezes em que apareceu):', sortable)
  
  const letterLetters = Object.keys(sortable)
  
  const first = [letterLetters[0],letterLetters[3],letterLetters[5],letterLetters[8],letterLetters[9]]
  const second = [letterLetters[1],letterLetters[2],letterLetters[4],letterLetters[6],letterLetters[7]]

  const firstWord = await createWord(allWords, first)
  const secondWord = await createWord(allWords, second)
  // const thirdWord = createWord(allWords, sortable, 2)

  console.log('As variações mais indicadas para as letras:', first)
  console.log('São:', firstWord)
  console.log('As variações mais indicadas para as letras:', second)
  console.log('São:', secondWord)
  console.log('Ambas compoem as 10 primeiras letras em ordem')
})()

function getLettersAndCount(allWords) {
  const alphabet = {} 
  allWords.forEach(word => {
    const letters = word.toLowerCase().split('')
    letters.forEach(letter => {
      alphabet[letter] ? alphabet[letter]++ : alphabet[letter] = 1
    })
  })
  return alphabet
}

async function createWord(allWords, sortable) {
  const words = [...allWords]
  sortable.forEach(letterToCheck => {
    for (let i = words.length-1; i >= 0 ; i--) {
      const word = words[i];
      if (!word.toLowerCase().includes(letterToCheck)) {
        words.splice(i, 1)
      }
    }
  });

  return words
}