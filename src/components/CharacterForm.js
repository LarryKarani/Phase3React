import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function CharacterForm({ playerAddingTo, setPlayerAddingTo, users, setUsers }) {
    const navigate = useNavigate();
    const playerId = playerAddingTo.id;
    const playerUsername = playerAddingTo.username;
    const [existingCharacters, setExistingCharacters] = useState(playerAddingTo.characters);
    const [newCharacter, setNewCharacter] = useState({
        name: "",
        race: "",
        character_class: "",
        level: 1,
        icon: "https://dnd.dragonmag.com/wp-content/uploads/sites/587/2020/08/rozilla74-ampersand-1.jpg",
        user_id: playerId
    });

    function handleNewChar(e) {
        e.preventDefault();
        handleClassChange();
        setPlayerAddingTo({...playerAddingTo, characters: [newCharacter]});
        handleCharacterPost();
    }

    function handleClassChange() {
        const string = newCharacter.character_class;
        if (string === "Barbarian") {
            setNewCharacter({...newCharacter, icon: "https://www.dndbeyond.com/avatars/10/0/636336416778392507.jpeg"})
        } else if (string === "Bard") {
            setNewCharacter({...newCharacter, icon: "https://www.dndbeyond.com/avatars/10/1/636336416923635770.jpeg"})
        } else if (string === "Cleric") {
            setNewCharacter({...newCharacter, icon: "https://www.dndbeyond.com/avatars/10/2/636336417054144618.jpeg"})
        } else if (string === "Druid") {
            setNewCharacter({...newCharacter, icon: "https://www.dndbeyond.com/avatars/10/3/636336417152216156.jpeg"})
        } else if (string === "Fighter") {
            setNewCharacter({...newCharacter, icon: "https://www.dndbeyond.com/avatars/10/4/636336417268495752.jpeg"})
        } else if (string === "Monk") {
            setNewCharacter({...newCharacter, icon: "https://www.dndbeyond.com/avatars/10/5/636336417372349522.jpeg"})
        } else if (string === "Paladin") {
            setNewCharacter({...newCharacter, icon: "https://www.dndbeyond.com/avatars/10/6/636336417477714942.jpeg"})
        } else if (string === "Ranger") {
            setNewCharacter({...newCharacter, icon: "https://www.dndbeyond.com/avatars/10/7/636336417569697438.jpeg"})
        } else if (string === "Rogue") {
            setNewCharacter({...newCharacter, icon: "https://www.dndbeyond.com/avatars/10/8/636336417681318097.jpeg"})
        } else if (string === "Sorcerer") {
            setNewCharacter({...newCharacter, icon: "https://www.dndbeyond.com/avatars/10/9/636336417773983369.jpeg"})
        } else if (string === "Warlock") {
            setNewCharacter({...newCharacter, icon: "https://www.dndbeyond.com/avatars/10/12/636336422983071263.jpeg"})
        } else if (string === "Wizard") {
            setNewCharacter({...newCharacter, icon: "https://www.dndbeyond.com/avatars/10/11/636336418370446635.jpeg"})
        };
    };


    function updateUsers(data) {
        const playerIndex = users.findIndex(user => user.id === playerId);
        const newUsers = users
        newUsers[playerIndex]?.characters.push(data)
        console.log(newUsers)
        setUsers(newUsers)
        navigate('/my-characters')
    }

    function handleCharacterPost() {
        fetch(`http://localhost:9292/characters`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCharacter)
        })
        .then(resp => resp.json())
        .then(data => updateUsers(data))
    };


    return (
        <div className='flex justify-center flex-col mt-3'>
            <h3 className='text-center'>Create a new character</h3>
            <h4 className='text-center'>Adding to {playerUsername}'s characters</h4>
            <form className='flex justify-center flex-col w-1/2 mx-auto' onSubmit={handleNewChar}>
                
                <label>Character Name: </label>
                <input 
                    className='w-full my-5'
                    required
                    type="text"
                    name="name"
                    value={newCharacter.name}
                    onChange={e => setNewCharacter({...newCharacter, name: e.target.value})}
                />
                <label>Race (Choose one): </label>
                <select 
                    className='w-full my-5'
                    required
                    name="race"
                    value={newCharacter.race}
                    onChange={e => setNewCharacter({...newCharacter, race: e.target.value})}
                >
                    <option></option>
                    <option value="Barbarian">Dwarf</option>
                    <option value="Bard">Dragonborn</option>
                    <option value="Cleric">Elf</option>
                    <option value="Druid">Gnome</option>
                    <option value="Monk">Halfling</option>
                    <option value="Ranger">Human</option>
                    <option value="Wizard">Tiefling</option>
                </select>
                <label>Class (Choose one): </label>
                <select 
                    className='w-full my-5'
                    required
                    name="character-class"
                    value={newCharacter.character_class}
                    onChange={e => setNewCharacter({...newCharacter, character_class: e.target.value})}
                >
                    <option></option>
                    <option value="Barbarian">Barbarian</option>
                    <option value="Bard">Bard</option>
                    <option value="Cleric">Cleric</option>
                    <option value="Druid">Druid</option>
                    <option value="Fighter">Fighter</option>
                    <option value="Monk">Monk</option>
                    <option value="Paladin">Paladin</option>
                    <option value="Ranger">Ranger</option>
                    <option value="Rogue">Rogue</option>
                    <option value="Sorcerer">Sorcerer</option>
                    <option value="Warlock">Warlock</option>
                    <option value="Wizard">Wizard</option>
                </select>
                <label>Level: </label>
                <select 
                    className='w-full my-5'
                    name="level"
                    value={newCharacter.level}
                    onChange={e => setNewCharacter({...newCharacter, level: e.target.value})}
                >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                </select>
                <br></br>
                <br></br>
                <button type="Submit" className='relative flex items-center justify-center rounded-md border border-transparent bg-gray-900 py-2 px-8 text-sm font-medium text-gray-50 hover:bg-gray-400 w-full mt-3'>Submit New Character</button>
            </form>
            <br></br>
            
        </div>
    )
};

export default CharacterForm;