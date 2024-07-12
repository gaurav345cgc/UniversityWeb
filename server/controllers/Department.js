import DepartmentModal from "../models/Department.js"

export const CreateDepartment = async(req,res) => {
    try {
        const depData = await DepartmentModal.create({
            name: req.body.name,
            image: req?.file?.filename,
            university: req.body.universityId,
        });
        if(depData) res.status(201).send({message:"Department Created"});
        else res.status(404) .send({message:"Unable to Create Department"});
        
    } catch (error) {
        console/log("Fail to submit Data !!");
    }
};

export const UpdateDepartment = async(req,res) => {
    try {
        const depData = await DepartmentModal.findByIdAndUpdate({_id: req.body.id},
            {
                name: req.body.name,
                image: req?.file?.filename,
                university: req.body.universityId,
            });
            if(depData) res.status(201) .send({message:"Department Updated"});
            else res.status(404) .send({message:"Unable to Update Department"});
    } catch (error) {
        console.log("Fail to submit data");
    }
};

export const DeleteDepartment = async(req,res) => {
    try {
        const depData = await DepartmentModal.deleteOne({_id: req.body.id});
        if(depData.deletedCount==1) res.status(201).send({message:"Data Deleted"});
            else res.status(404).send({message:"Unable to Delete Data"});
    } catch (error) {
        console.log("Fail to submit data");
    }
};

export const GetDepartmentsByUniversityID = async (req, res) => {
    try {
        const depData = await DepartmentModal.find({ university: req.query.universityId })
            .populate("university");
        res.status(200).send({ depData });
    } catch (error) {
        console.error("Failed to fetch data:", error);
        res.status(500).send({ message: "Failed to fetch data" });
    }
};
