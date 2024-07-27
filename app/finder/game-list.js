'use client';

import React, { useState, useEffect, useCallback } from 'react';

async function fetchGames(category, platform, publisher, letter) {
  const apiKey = '9ff765ef16msh514a67d244a1e0ep179ef9jsn0c205c546ea7';
  const apiHost = 'free-to-play-games-database.p.rapidapi.com';
  
  let url = `https://${apiHost}/api/games`;
  let params = new URLSearchParams();
  if (category) params.append('category', category);
  if (platform) params.append('platform', platform);
  if (publisher) params.append('publisher', publisher);
  if (letter) {
    if (letter === '#') {
      params.append('title', ''); // Filter games with numbers in title
    } else {
      params.append('title', letter); // Filter by specific letter or character
    }
  }

  if (params.toString()) {
    url += `?${params.toString()}`;
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

export default function GameList({ category, platform, publisher, letter }) {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);

  const loadGames = useCallback(async () => {
    try {
      const gameData = await fetchGames(category, platform, publisher, letter);
      setGames(gameData || []);
    } catch (error) {
      setError('Failed to fetch games.');
    }
  }, [category, platform, publisher, letter]);

  useEffect(() => {
    loadGames();
  }, [loadGames]);

  return (
    <div className="mx-10 my-5 w-full max-w-6xl">
      <h2 className="text-2xl text-orange-300 mb-4">Game List for {category} on {platform} by {publisher} starting with {letter}</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
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
      )}
    </div>
  );
}
