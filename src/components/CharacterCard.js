import React, { useState } from 'react';

function CharacterCard({ character, chars, setChars }) {
    const [charData, setCharData] = useState(character);

    function handleLevelUp() {
        const newLevel = charData.level + 1;
        setCharData({...charData, level: newLevel});
        fetch(`http://localhost:9292/characters/${character.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({level: newLevel})
        })
    }

    function handleDelete() {
        const newChars = chars.filter(char => char.id !== character.id)
        fetch(`http://localhost:9292/characters/${character.id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(setChars(newChars))
    }

    return (
        
            <div className="group relative" key={character.id}>
                <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                    <img  className="h-full w-full object-cover object-center" alt="icon" src={charData.icon} />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">
                <span>
                  <span className="absolute inset-0" />
                  Name: {charData.name}
                </span>
              </h3>
              <p className="mt-1 text-sm text-gray-500">Level:  {charData.level}</p>
              <p className="mt-1 text-sm text-gray-500"> Class: {charData.character_class}</p>
              <p className="mt-1 text-sm font-medium text-gray-900">Race: {charData.race}</p>
               {charData.level === 20 ? null : <button onClick={handleLevelUp} className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200 w-full mt-3">Level Up!</button>}
                <button className="relative flex items-center justify-center rounded-md border border-transparent bg-red-400 py-2 px-8 text-sm font-medium text-gray-50 hover:bg-gray-200 w-full mt-3" onClick={handleDelete}>Delete Character</button>
            </div>
    )
};

export default CharacterCard;
