import ProductModal from "../models/Product.js";
import DepartmentModal from '../models/Department.js'; 


export const CreateProduct = async(req,res) => {
    try {
        let images = req?.files?.map((item) => {
            return item.filename;
        });
        const prdData = await ProductModal.create({
            name:req.body.name,
            description: req.body.description,
            price:req.body.price,
            images:images,
            department:req.body.departmentId,
        });
        if(prdData)res.status(201) .send({message:"Product Created !!!"});
        else res.status(404).send({message:"Unable to Create Product !!!"});
    } catch (error) {
        console.log("Fail to submut data !!");
    }
};

export const UpdateProduct = async(req,res) => {
    try {
        let images = req?.files?.map((item) => {
            return item.filename;
        });
        const prdData = await ProductModal.findByIdAndUpdate({_id:req.body.id},
            {
                name:req.body.name,
                description: req.body.description,
                price:req.body.price,
                images:images,
                department:req.body.departmentId,
            });
            if(prdData)res.status(201) .send({message:"Product Updated !!!"});
            else res.status(404).send({message:"Unable to Update Product !!!"});
    } catch (error) {
        console.log("Fail to submit data !!");
    }
};

export const DeleteProduct = async(req,res) => {
    try {
        const prdData = await ProductModal.deleteOne({_id:req.body.id});
        if(prdData.deletedCount==1)res.status(201) .send({message:"Product Deleted !!!"});
        else res.status(404).send({message:"Unable to Delete Product !!!"});
    } catch (error) {
        console.log("Fail to submit data !!");
    }
};  

export const GetProductByDepartmentId = async (req, res) => {
    try {
        const prdData = await ProductModal.find({ department: req.query.departmentId })
            .populate({ path: "Department", populate: { path: "University" } });
        res.status(200).send({ prdData });
    } catch (error) {
        console.error("Fail to retrieve data:", error);
        res.status(500).send({ error: "Failed to retrieve product data" });
    }
};

export const GetProductDetails = async (req, res) => {
    try {
        const prdData = await ProductModal.findOne({ _id: req.query.id })
            .populate({ path: "department", populate: { path: "University" } });
        res.status(200).send({ prdData });
    } catch (error) {
        console.error("Fail to retrieve data:", error);
        res.status(500).send({ error: "Failed to retrieve product details" });
    }
};

export const UpdateProductQty = async (req, res) => {
    try {
        let productInDb = await ProductModal.findOne({ _id: req.body.id });
        if (!productInDb) {
            return res.status(404).send({ message: "Product not found" });
        }
        
        let active = true;
        if (productInDb.qty - req.body.qty <= 0) active = false;
        
        const prdData = await ProductModal.findByIdAndUpdate(
            { _id: req.body.id },
            {
                active: active,
                qty: productInDb.qty - req.body.qty,
            },
            { new: true }
        );
        
        res.status(200).send({ message: "Product qty updated", prdData });
    } catch (error) {
        console.error("Fail to update data:", error);
        res.status(500).send({ error: "Failed to update product quantity" });
    }
};
