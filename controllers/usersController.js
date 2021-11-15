import users from '../loaders/users';

async function getUsers(){
    return users.getUsers();
}

async function getUserByEmail(email){
    return users.getUserByEmail(email);
}

async function getUserById(id){
    return users.getUserById(id);
}

async function addUser(user){
    return users.addUser(user);
}

async function updateUser(user){
    return users.updateUser(user);
}

async function deleteUser(id){
    return users.deleteUser(id);
}

async function findByCredential(email, password){
    return users.findByCredential(email, password);
}

async function generateAuthToken(user){
    return users.generateAuthToken(user);
}

async function getGoogleUserByToken(accessToken){
    return users.getGoogleUserByToken(accessToken);
}

async function getUserGame(gameId, userId){
    return users.getUserGame(gameId, userId);
}

async function updateFav(userId){
    return users.updateFav(userId);
}

async function updateUserGame(game, userId){
    return users.updateUserGame(game, userId);
}

export {
    addUser,
    getUsers,
    updateUser,
    getUserByEmail,
    getUserById,
    deleteUser,
    generateAuthToken,
    findByCredential,
    getGoogleUserByToken,
    getUserGame,
    updateUserGame,
    updateFav
}