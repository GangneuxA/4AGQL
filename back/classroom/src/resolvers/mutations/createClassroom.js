const { Classroom } = require("../../models/Classroom")
module.exports = async (_, {name, numberMax}, {req}) => {
    try {

        if(!req.user) throw new Error("Unauthorized access!");
        if(req.user.role === 'teacher') throw new Error("Unauthorized acccess for student")
        
        const existingClassroom = await Classroom.findOne({ name });
        if (existingClassroom) {
          throw new Error('CLassroom with this name already exists');
        }
    
        const newClassroom = new Classroom({
          name,
          numberMax
        });
        await newClassroom.save();
        return newClassroom;
    } catch (error) {
      throw new Error(error.message); 
   }

}