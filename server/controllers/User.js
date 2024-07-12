import UserModel from "../models/User.js"

export const Register = async (req,res) => {
    try {
        let user  = await UserModel .findOne({email : req.body.email });
        if(user) {
            res.status(404).send({message:"User Created With This Email !!!"});
            return;
        }
        let userInfo = await UserModel.create({
            ...req.body,
            profilePic:req?.file?.filename,
        });
        if(userInfo) res.status(200) .send({message:"User Created !!"});
        else res.status(404) .send({message:"Unable to Create User !!"});
        
    } catch (e) {
       console.log("Failed");
    }
};

export const Login = async(req,res) =>  {
    try {
            let user = await UserModel.findOne({
                email:req.body.email,
                password:req.body.password
            });
            if(user) res.status(200).send({ id: user.id, role: user.role});
            else res.status(404).send({message:"Wrong Username or Password"});
    } catch (e) {
        console.log("Failed");

    }
};