const { Users } = require("../../models/Users")
module.exports = async (_, {name, email, age, password}, {models}) => {
    
    // Vérifier si l'utilisateur avec le même email existe déjà
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    const hashedPassword = await password;
    // Si l'utilisateur n'existe pas, créer un nouvel utilisateur
    const newUser = new Users({
      email,
      name,
      age,
      hashedPassword
    });
    await newUser.save();
    return newUser;
}