'use client';

import React, { useState, useEffect } from 'react';

async function fetchGames(category) {
  const apiKey = '9ff765ef16msh514a67d244a1e0ep179ef9jsn0c205c546ea7';
  const apiHost = 'free-to-play-games-database.p.rapidapi.com';
  
  let url = `https://${apiHost}/api/games`;
  if (category) {
    url += `?category=${category}`;
  }

  console.log('Fetching games from URL:', url); // Debugging log

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': apiHost,
        'X-RapidAPI-Key': apiKey
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched data:', data); // Debugging log
    return data;
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
}

export default function GameList({ category }) {
  const [games, setGames] = useState([]);

  const loadGames = async () => {
    const gameData = await fetchGames(category);
    setGames(gameData || []);
  };

  useEffect(() => {
    loadGames();
  }, [category, loadGames]);

  return (
    <div className="mx-10 my-5 w-full max-w-6xl">
      <h2 className="text-2xl text-orange-300 mb-4">Game List for {category}</h2>
      <ul className="grid grid-cols-4 gap-5">
        {games.length > 0 ? (
          games.map((game) => (
            <li key={game.id} className="p-2 border border-gray-700 rounded bg-gray-800 text-orange-200 flex flex-col items-center">
              <img src={game.thumbnail} alt={game.title} className="w-full h-auto" />
              <div>
                <p className="font-bold">{game.title}</p>
                <p>{game.short_description}</p>
                <p>Platform: {game.platform}</p>
              </div>
            </li>
          ))
        ) : (
          <p className="text-orange-300">No games available</p>
        )}
      </ul>
    </div>
  );
}

//<img src={game.thumbnail} alt={game.title} className="w-20 h-20 inline-block mr-4" />
//<ul className="space-y-4 grid grid-cols-2 gap-5"></ul>