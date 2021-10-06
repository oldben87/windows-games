import { SuitEnum, CardInfo } from 'types'

export const getRandomNumber = (deck: Array<number>): number => {
  const rdmNum = Math.floor(Math.random() * 52) + 1
  if (rdmNum === deck.find(card => card === rdmNum)) {
    return getRandomNumber(deck)
  }

  return rdmNum
}

export const getShuffledDeck = () => {
  const deck: Array<number> = []

  for (let i = 1; i <= 52; i++) {
    const newCard = getRandomNumber(deck)
    deck.push(newCard)
  }

  return deck
}

export const getSuit = (card: number) => {
  if (card >= 40) {
    return SuitEnum.diamonds
  }
  if (card >= 27) {
    return SuitEnum.clubs
  }
  if (card >= 14) {
    return SuitEnum.hearts
  }

  return SuitEnum.spades
}

export const getCardNumber = (card: number) => {
  if (card > 39) {
    return card - 39
  }
  if (card > 26) {
    return card - 26
  }
  if (card > 13) {
    return card - 13
  }

  return card
}

const getCardColor = (suit: SuitEnum) => {
  if (suit === SuitEnum.hearts || suit === SuitEnum.diamonds) {
    return true
  }

  return false
}

export const getCardValue = (card: number): CardInfo => {
  const suit = getSuit(card)
  return {
    id: card,
    value: getCardNumber(card),
    suit,
    isRed: getCardColor(suit),
  }
}
