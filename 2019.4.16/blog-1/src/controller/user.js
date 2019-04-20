const login = (username, password) => {
    if (username === 'jizou' && password === 'jizou'){
        return true;
    }
    else{
        return false;
    }
}

module.exports = {
    login
}