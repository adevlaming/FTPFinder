'use client';

import React, { useState } from 'react';
import GameList from './game-list';

export default function Page() {
  const [category, setCategory] = useState('');

  return (
    <main className="bg-black text-white min-h-screen flex flex-col items-center">
      <h1 className="text-3xl mt-10 mb-6 text-orange-400">Game Finder</h1>
      <div className="flex flex-col items-center w-full max-w-2xl">
        <div className="mb-4 w-full">
          <label className="block mb-2 text-orange-300">Select Category:</label>
          <select
            className="p-2 w-full bg-gray-800 text-white border border-gray-700 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
          </select>
        </div>
        <GameList category={category} />
      </div>
    </main>
  );
}
