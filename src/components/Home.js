import React from 'react';
import CharacterContainer from './CharacterContainer';

function Home({ currentUser, characters }) {


    return (
        <div>
            <h2>Welcome to the Character Database!</h2>
            <br></br>
            {<CharacterContainer currentUser={currentUser} characters={characters} />}
        </div>
    )
};

export default Home;