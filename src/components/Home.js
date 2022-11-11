import React from 'react';
import PlayerContainer from './PlayerContainer';

function Home({ users, characters, setCharacters, setPlayerAddingTo }) {

    function updateCharacters(id) {
        const updatedCharacters = characters.filter((char) => char.id !== id);
        setCharacters(updatedCharacters)
    }
    
    const currentUser = localStorage.getItem('user')
    return (
        <div>
            {users.map((user) => {
                console.log(user)
                if(currentUser === user?.username){
                    return (
                    <PlayerContainer
                        key={user.id}
                        updateCharacters={updateCharacters}
                        user={user} 
                        setPlayerAddingTo={setPlayerAddingTo}
                    />
                )
                }
            })}
        </div>
    )
};

export default Home;