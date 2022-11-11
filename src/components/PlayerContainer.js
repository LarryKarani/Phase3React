import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CharacterCard from './CharacterCard';

function PlayerContainer({ user, updateCharacters, setPlayerAddingTo }) {
  const [chars, setChars] = useState(user.characters);
  
  const navigate = useNavigate();

  function handleNew() {
    setPlayerAddingTo(user);
    navigate(`/character-creation`)
  }

  return (
    <div className='pl-[45px]' key={user.id}>
      <h4>{user.username} Character </h4>
      <button className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-900 py-2 px-8 text-sm font-medium text-gray-50 hover:bg-gray-400 w-[375px] mt-3" id={user.id} onClick={handleNew}>Add a new {user.username} character</button>

      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">

         {chars.map(character => {
          console.log(chars)
        return (
          <CharacterCard 
            key={character.id} 
            character={character} 
            updateCharacters={updateCharacters} 
            chars={chars}
            setChars={setChars}
          />
        )
      })}

      </div>
     
    </div>
  )
}

export default PlayerContainer