'use client';

import React, { useState } from 'react';
import GameList from './game-list';
import GamePage from './game-page';
import { useUserAuth } from "../_utils/auth-context";
import Link from 'next/link';


export default function Page() {

  const {user} = useUserAuth();

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
      <h1 className="text-5xl font-mono font-bold mt-10 mb-6 text-orange-400">Free-To-Play Finder</h1>
      <h2 className="text-2xl font-mono mb-3 text-orange-400">Your one stop to find free to play games!</h2>
      {user ? (
      <div className="flex flex-col items-center justify-center w-full">
      <p className="text-2xl font-mono mb-4 text-orange-400">Select a game from our Game List below to view information and how to play!</p>
      
      <div className="w-full flex flex-col items-center">
        <div className="mb-4 w-full max-w-4xl flex gap-4">
          <div className="flex-1">
            <label className="block mb-2 font-mono text-xl text-orange-400">Select Category:</label>
            <select
              className="p-2 w-full bg-gray-700 text-white border border-gray-600 rounded"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              <option value="anime">Anime</option>
              <option value="card">Card Games</option>
              <option value="fantasy">Fantasy</option>
              <option value="fighting">Fighting</option>
              <option value="mmo">MMO</option>
              <option value="mmorpg">MMORPG</option>
              <option value="moba">MOBA</option>
              <option value="racing">Racing</option>
              <option value="sci-fi">Sci-Fi</option>
              <option value="shooter">Shooter</option>
              <option value="social">Social</option>
              <option value="sports">Sports</option>
              <option value="strategy">Strategy</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block mb-2 font-mono text-xl text-orange-400">Select Platform:</label>
            <select
              className="p-2 w-full bg-gray-700 text-white border border-gray-600 rounded"
              value={platform}
              onChange={handlePlatformChange}
            >
              <option value="">Select Platform</option>
              <option value="pc">PC (Windows)</option>
              <option value="browser">Web Browser</option>
            </select>
          </div>
        </div>

        <div className="mb-2 flex gap-1 flex-wrap w-full max-w-4xl justify-center">
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
      <div>
      <Link href="/" className="font-mono text-orange-400 hover:underline">Click here to return to the sign in/log out page to log out</Link>
      </div>
      </div>
        ) : (

      <div className="flex flex-col items-center justify-center w-full">
        
        <p className="text-2xl font-mono mb-4 text-orange-400 text-center">
          To view detailed game information and how to play please <Link href="/" className="text-orange-400 hover:underline">Sign In</Link>
        </p>
        
        <div className="w-full flex flex-col items-center">
          <div className="mb-4 w-full max-w-4xl flex gap-4">
            <div className="flex-1">
              <label className="block mb-2 font-mono text-xl text-orange-400">Select Category:</label>
              <select
                className="p-2 w-full bg-gray-700 text-white border border-gray-600 rounded"
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="">Select Category</option>
                <option value="anime">Anime</option>
                <option value="card">Card Games</option>
                <option value="fantasy">Fantasy</option>
                <option value="fighting">Fighting</option>
                <option value="mmo">MMO</option>
                <option value="mmorpg">MMORPG</option>
                <option value="moba">MOBA</option>
                <option value="racing">Racing</option>
                <option value="sci-fi">Sci-Fi</option>
                <option value="shooter">Shooter</option>
                <option value="social">Social</option>
                <option value="sports">Sports</option>
                <option value="strategy">Strategy</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block mb-2 font-mono text-xl text-orange-400">Select Platform:</label>
              <select
                className="p-2 w-full bg-gray-700 text-white border border-gray-600 rounded"
                value={platform}
                onChange={handlePlatformChange}
              >
                <option value="">Select Platform</option>
                <option value="pc">PC (Windows)</option>
                <option value="browser">Web Browser</option>
              </select>
            </div>
          </div>

          <div className="mb-2 flex gap-1 flex-wrap w-full max-w-4xl justify-center">
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

          <GameList category={category} platform={platform} publisher={publisher} letter={letter} />
        </div>
        {selectedGame && <GamePage game={selectedGame} onClose={closeGamePage} />}
      </div>
      

        )}

      <footer className="mb-5 mt-4 font-mono text-orange-400">Free-to-play games database provided through API from <a href="https://www.freetogame.com/" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">FreeToGame</a> 
      </footer>
    </main>
  );
}

