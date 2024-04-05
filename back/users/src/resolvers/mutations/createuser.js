const { Users } = require("../../models/Users")
const bcrypt = require('bcrypt');
module.exports = async (_, {pseudo, email, password}, {}) => {
    
    // Vérifier si l'utilisateur avec le même email existe déjà
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(password,10);
    // Si l'utilisateur n'existe pas, créer un nouvel utilisateur
    const newUser = new Users({
      email,
      pseudo,
      password: hashedPassword
    });
    await newUser.save();
    return newUser;
}