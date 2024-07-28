'use client';

import React, { useState } from 'react';
import GameList from './game-list';
import GamePage from './game-page';

export default function Page() {
  const [category, setCategory] = useState('');
  const [platform, setPlatform] = useState('');
  const [publisher, setPublisher] = useState('');
  const [letter, setLetter] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePlatformChange = (e) => {
    setPlatform(e.target.value);
  };

  const handlePublisherChange = (e) => {
    setPublisher(e.target.value);
  };

  const handleLetterClick = (char) => {
    setLetter((prevLetter) => (prevLetter === char ? '' : char));
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const handleGameClick = (game) => {
    setSelectedGame(game);
  }

  const closeGamePage = () => {
    setSelectedGame(null);
  }

  return (
    <main className="bg-black text-white min-h-screen flex flex-col items-center">
      <h1 className="text-3xl mt-10 mb-6 text-orange-400">Game Finder</h1>
      <div className="w-full flex flex-col items-center">
        <div className="mb-4 w-full max-w-4xl flex gap-4">
          <div className="flex-1">
            <label className="block mb-2 text-orange-300">Select Category:</label>
            <select
              className="p-2 w-full bg-gray-800 text-white border border-gray-700 rounded"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              <option value="shooter">Shooter</option>
              <option value="anime">Anime</option>
              <option value="strategy">Strategy</option>
              <option value="fantasy">Fantasy</option>
              <option value="sci-fi">Sci-Fi</option>
              <option value="card-games">Card Games</option>
              <option value="racing">Racing</option>
              <option value="fighting">Fighting</option>
              <option value="social">Social</option>
              <option value="sports">Sports</option>
              <option value="moba">MOBA</option>
              <option value="mmo">MMO</option>
              <option value="mmorpg">MMORPG</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block mb-2 text-orange-300">Select Platform:</label>
            <select
              className="p-2 w-full bg-gray-800 text-white border border-gray-700 rounded"
              value={platform}
              onChange={handlePlatformChange}
            >
              <option value="">Select Platform</option>
              <option value="pc">PC (Windows)</option>
              <option value="browser">Web Browser</option>
            </select>
          </div>
        </div>

        <div className="mb-4 flex gap-1 flex-wrap w-full max-w-4xl justify-center">
          {alphabet.split('').map((char) => (
            <button
              key={char}
              onClick={() => handleLetterClick(char)}
              className={`px-2 py-1 text-sm ${letter === char ? 'bg-orange-500' : 'bg-gray-700'} text-white border border-gray-600 rounded hover:bg-orange-400`}
            >
              {char}
            </button>
          ))}
          <button
            onClick={() => handleLetterClick('#')}
            className={`px-2 py-1 text-sm ${letter === '#' ? 'bg-orange-500' : 'bg-gray-700'} text-white border border-gray-600 rounded hover:bg-orange-400`}
          >
            #
          </button>
          <button
            onClick={() => setLetter('')}
            className={`px-2 py-1 text-sm ${letter === '' ? 'bg-orange-500' : 'bg-gray-700'} text-white border border-gray-600 rounded hover:bg-orange-400`}
          >
            All
          </button>
        </div>

        <GameList category={category} platform={platform} publisher={publisher} letter={letter} onGameClick={handleGameClick} />
      </div>
      {selectedGame && <GamePage game={selectedGame} onClose={closeGamePage} />}
    </main>
  );
}

