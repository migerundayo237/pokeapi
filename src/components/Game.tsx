import { useEffect, useState } from "react";
import { getRandomPokemon } from "../services/getPokemon";
import { normalize, baseName, formatNameFromAPI } from "../utils/pokemonName";
import { playCry } from "../utils/audio";
import Pokemon from "../interfaces/Pokemon";

export default function Game() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const fetchPokemon = async () => {
    const random = await getRandomPokemon();
    setPokemon(random);
    setRevealed(false);
    setGuess("");
  };  

  const handleGuess = () => {
    if (!pokemon) return;
  
    const cleanGuess = normalize(guess);
    const cleanName = normalize(baseName(pokemon.name));
    
    if (cleanGuess === cleanName) {
      setScore(score + 1);
      setRevealed(true);
      playCry(pokemon.id);
    } else {
      alert("Nope! Try again.");
    }
  };   

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div className="flex flex-col items-center p-8 space-y-6">
    <h1 className="text-3xl font-extrabold text-center">Who's That Pokémon?</h1>

    {pokemon && (
        <img
        src={pokemon.sprite}
        alt="Pokemon silhouette"
        className={`w-60 h-60 transition-all ${
            revealed ? "" : "filter brightness-0 saturate-100"
        }`}
        />
    )}
    <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter Pokémon name"
        className="text-xl p-4 border-2 border-gray-300 rounded-lg w-full max-w-md"
        disabled={revealed}
    />
    <button
        onClick={handleGuess}
        className="px-6 py-3 text-xl bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        disabled={revealed}
    >
        Guess!
    </button>
    {revealed && (
        <>
        {pokemon && (
            <p className="text-green-600 text-2xl font-bold text-center">
            Correct! It’s {formatNameFromAPI(pokemon.name)}!
            </p>
        )}
        <button
            onClick={fetchPokemon}
            className="mt-4 px-6 py-3 text-xl bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
            Next Pokémon
        </button>
        </>
    )}
    <p className="mt-6 text-2xl font-semibold">Score: {score}</p>
    </div>

  );
}
