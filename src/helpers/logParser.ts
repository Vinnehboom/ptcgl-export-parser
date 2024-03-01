export const cleanLog = (importFile: string): string[] => {
    let splitLog = importFile.split('\n');
    splitLog = splitLog.filter(line => line.length > 3)
    return splitLog
  }

  export type parseSetupReturnType = {
    firstPlayer: string,
    playerHand: string[],
    playerHandSize: number,
    playerBench: string[],
    playerActive: string,
    opponentHand: string[],
    opponentHandSize: number,
    opponentBench: string[],
    opponentActive: string,
  }

export const parseSetup = (parsedLog: string[], playerName: string): parseSetupReturnType => {
  const t1Line = parsedLog.find(line => line.includes('Turn # 1'))
  const setupLines = parsedLog.slice(1, parsedLog.indexOf(t1Line!))
  const opponentName = setupLines.filter(line => {
    const splitLine = line.split(' ')
    return splitLine[0] !== playerName && splitLine[0] !== '-' && splitLine[0] !== ' '
  })[0].split(' ')[0]
  const playerActions: {[name: string]: string[]} = {[playerName]: [], [opponentName]: []}
  let currentPlayer: string
  setupLines.forEach(line => {
    if(line.includes(playerName)) {
      playerActions[playerName] = [...playerActions[playerName], line]
      currentPlayer = playerName
    } else if(line.includes(opponentName)) {
      playerActions[opponentName] = [...playerActions[opponentName], line]
      currentPlayer = opponentName
    } else {
      playerActions[currentPlayer] = [ ...playerActions[currentPlayer], line]
    }
  })
 const { active: playerActive, bench: playerBench, hand: playerHand, handSize: playerHandSize, order: playerOrder } = parsePlayerActions(playerName, false, playerActions[playerName])
 const { active: opponentActive, bench: opponentBench, hand: opponentHand, handSize: opponentHandSize, order: _opponentOrder } = parsePlayerActions(opponentName, true, playerActions[opponentName])
 const firstPlayer = playerOrder == 'first.' ? playerName : opponentName
 return { playerHand: playerHand, playerHandSize: playerHandSize, opponentHandSize: opponentHandSize, playerActive: playerActive, playerBench: playerBench, opponentActive: opponentActive, opponentBench: opponentBench, opponentHand: opponentHand, firstPlayer: firstPlayer }
}

const parsePlayerActions = (playerName: string, opponent: boolean,  actions: string[]) => {
  let activePokemon = ''
  let benchedPokemon: string[] = []
  let playerHandSize = 0
  let playerHandCards: string[] = []
  let order = ''
  actions.forEach(action => {
    if(action.includes('Active Spot')) {
      activePokemon = action.split(' to the Active Spot.')[0].split(`${playerName} played `)[1]
    }
    else if(action.includes('Bench')) {
       benchedPokemon = [...benchedPokemon, action.split(' to the Bench.')[0].split(`${playerName} played `)[1]]
    }
    else if(action.includes('opening hand')) {
        playerHandSize = 7
        if(!opponent) {
          const currentIndex = actions.indexOf(action)
          const drawnCardsAction = actions[currentIndex + 2] 
          let drawnCards = drawnCardsAction.split(', ')
          drawnCards = drawnCards.map(card => card.replace('\r', ''))
          drawnCards[0] = drawnCards[0].split(' • ')[1]
          playerHandCards = drawnCards
        }
    } else if(action.includes('decided to go')) { order = action.split(`${playerName} decided to go `)[1]} else { undefined}
 })
 if(opponent) { 
  playerHandSize = (playerHandSize - benchedPokemon.length - 1)
  playerHandCards =[...Array(playerHandSize)].map(() => 'unknown')

}

 return {active: activePokemon, bench: benchedPokemon, hand: playerHandCards, handSize: playerHandSize , order: order }
 
} 