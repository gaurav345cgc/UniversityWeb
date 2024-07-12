import UniversityModal from "../models/University.js"

export const CreateUniversity = async(req,res) => {
    try {
        const univData = await UniversityModal
        .create(
            {
                name:req.body.name , 
                image:req?.file?.filename,
            });
            if(univData) res.status(201).send({message:"University Created"});
            else res.status(404).send({message:"Unable to Create University"});

    } catch (error) {
        console.log("Fail to Submit Data");
    }
};

export const UpdateUniversity = async(req,res) => {
    try {
        const univData = await UniversityModal
        .findByIdAndUpdate(
        {_id:req.body.id},
        {
            name:req.body.name,
            image:req?.file?.filename,
        }
    );
        if(univData) res.status(200).send({message:"University data Updates"});
        else res.status(404).send({message:"Unable to Delete University"});
    } catch (error) {
        console.log("Fail to Submit Data");
    }
};

export const DeleteUniversity = async(req,res) => {
    try {
        const univData = await UniversityModal
        .deleteOne({_id:req.body.id});
        if(univData.deletedCount==1) res.status(200).send({message:"University data Deleted"});
        else res.status(404).send({message:"Unable to Delete University"});
    } catch (error) {
        console.log("Fail to Submit Data");
    }
};

export const GetUniversity = async(req,res) => {
    try {
        const univData = await UniversityModal
        .find();
        res.status(200).send({univData});
    } catch (error) {
        console.log("Fail to Submit Data");
    }
};