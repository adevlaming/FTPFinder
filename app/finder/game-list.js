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

export default function GameList({ category, platform, publisher, letter, onGameClick }) {
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

  const filteredAndSortedGames = [...games]
  .filter((game) => {
    if (letter === '#') {
      return !isNaN(game.title[0]);
    }
    return game.title.toUpperCase().startsWith(letter);
  })
  .sort((a, b) => {
    let titleA = a.title.toUpperCase();
    let titleB = b.title.toUpperCase();
    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    return 0;
  })

  const getHeaderMessage = () => {
    let message = 'Game List';
    if (category) {
      message += ` for ${category}`;
    }
    if (platform) {
      message += ` on ${platform}`;
    }
    if (publisher) {
      message += ` by ${publisher}`;
    }
    if (letter) {
      message += ` starting with ${letter}`;
    }
    return message;
  };

  return (
    <div className="mx-10 my-5 w-full max-w-6xl">
      <h2 className="text-2xl text-orange-300 mb-4">{getHeaderMessage()}</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="grid grid-cols-5 gap-5">
          {filteredAndSortedGames.length > 0 ? (
            filteredAndSortedGames.map((game) => (
              <li 
                key={game.id} 
                className="cursor-pointer p-2 border border-gray-700 rounded bg-gray-800 text-orange-200 flex flex-col items-center"
                onClick={() => onGameClick(game)}
                >
                  <img src={game.thumbnail} alt={game.title} className="w-full h-auto" />
                  <div>
                    <p className="font-bold">{game.title}</p>
                    <p>Genre: {game.genre}</p>
                    <p>Platform: {game.platform}</p>
                  </div>
              </li>
            ))) : (
            <p className="text-orange-300">No games available</p>
          )}
        </ul>
      )}
    </div>
  );
}
