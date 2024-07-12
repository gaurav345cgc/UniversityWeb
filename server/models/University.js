import mongoose from "mongoose";

const UniversitySchema= new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    image:{
        type:String,
        require:true,
    }
},
{timestamps:true}, { strictPopulate: false }
);
const UniversityModal = mongoose.model("university", UniversitySchema);
export default UniversityModal;