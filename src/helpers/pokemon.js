import pokemon from "pokemontcgsdk";


pokemon.configure({ apiKey: process.env.REACT_APP_POKEMON_TCG_API_KEY });

export default pokemon;
