import getWordList from './utils/getWordList'


(async () => {
  console.clear()
  const allWords = await getWordList()

  const alphabet = getLettersAndCount(allWords)

  const sortable = Object.fromEntries(Object.entries(alphabet).sort(([,a],[,b]) => <number>b - <number>a))

  console.log(sortable)
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

aoeir

smuct