import games from '../loaders/games';

async function getGames(){
    return games.getGames();
}

async function getGameById(id){
    return games.getGameById(id);
}

async function updateGame(body){
    return games.updateGame(body);
}

async function getGameByCode(code){
    return games.getGameByCode(code);
}

export{ getGames, getGameById, updateGame, getGameByCode}