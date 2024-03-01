import { useEffect, useState } from "react";
import { findCardImage } from "../helpers/findCardImage";
type CardImageType = [url: string, count: number]
export type CardImageHash = { [cardName: string]: CardImageType }

export function useFindImages(
  cards: string[],
): [CardImageHash, boolean] {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cardImages, setCardImages] = useState<CardImageHash>({});

  const fetchImages = async (cardNames: string[]) => {
    let imageHash: CardImageHash ;
    setIsLoading(true);
    cardNames.forEach(async (card) => {
      const previousValue = imageHash && imageHash[card]
      console.log(imageHash)
      console.log(card)
      console.log(previousValue)
      const imageUrl: string = (card.length < 2 || card == 'unknown') ? "./img/pokecardback.png" : await findCardImage(card);
      const value: CardImageType = previousValue ? [previousValue[0], previousValue[1] + 1] : [imageUrl, 1]
      imageHash = { ...imageHash, [`${card}`]: value };
      setCardImages(imageHash)

    });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchImages(cards);
  }, []);

  return [cardImages, isLoading];
}
