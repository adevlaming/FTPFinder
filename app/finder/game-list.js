'use client';

import React, { useState, useEffect } from 'react';

async function fetchGames(category) {
  const apiKey = '9ff765ef16msh514a67d244a1e0ep179ef9jsn0c205c546ea7'; // Replace with your RapidAPI key
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
  }, [category]);

  return (
    <div className="mx-10 my-5">
      <h2 className="text-2xl text-orange-300 mb-4">Game List for {category}</h2>
      <ul className="space-y-4">
        {games.length > 0 ? (
          games.map((game) => (
            <li key={game.id} className="p-2 border border-gray-700 rounded bg-gray-800 text-orange-200">
              <img src={game.thumbnail} alt={game.title} className="w-16 h-16 inline-block mr-4" />
              {game.title}
            </li>
          ))
        ) : (
          <p className="text-orange-300">No games available</p>
        )}
      </ul>
    </div>
  );
}