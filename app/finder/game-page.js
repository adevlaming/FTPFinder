import React from 'react';

export default function GamePage({ game, onClose }){


    return(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75" onClick={onClose}>
      <div className="bg-gray-700 p-6 rounded shadow-lg max-w-lg w-full text-orange-300" onClick={(e) => e.stopPropagation()}>
        <button className="text-orange-300 mb-4" onClick={onClose}>Close</button>

        <img src={game.thumbnail} alt={game.title} className="w-full h-auto mb-4" />
        
        <h2 className="text-3xl mb-3">{game.title}</h2>
        
        <p className="text-xl mb-4"><strong>Description:</strong> {game.short_description}</p>

        <p className="mb-4">
          <a href={game.game_url} target="_blank" rel="noopener noreferrer"> 
            <button className="bg-orange-500 text-gray-900 py-2 px-4 rounded hover:bg-orange-600">
              Play Here!  
            </button>
          </a>
        </p>

        <p><strong>Platform:</strong> {game.platform}</p>
        <p><strong>Publisher:</strong> {game.publisher}</p>
        <p><strong>Developer:</strong> {game.developer}</p>
        <p><strong>Genre:</strong> {game.genre}</p>
        <p><strong>Release Date:</strong> {game.release_date}</p>
        
      
      </div>
    </div>
    );
}