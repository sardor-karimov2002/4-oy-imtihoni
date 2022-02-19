function validateUser(email){
    return /\S+@\S+\.\S+/.test(email)
}