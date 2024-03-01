import pokemon from "./pokemon"

export const findCardImage = async (cardName) => {
    let imageUrl = pokemon.card.where({ q: `name:"${cardName}"` }).then(result => {
        const lastIndex = result['data'].length -1 
        return result['data'][lastIndex]['images']['small']
    })
    return await imageUrl
}