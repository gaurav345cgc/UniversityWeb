import mongoose from "mongoose";

const ProductSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    },
    qty:{
        type:Number,
        require:true,
    },
    active:{
        type:Boolean,
        default:true,
    },
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"department",
        require:true,
    },
    images:{
        type:[String],
        require:true,
    }
},
{timestamps:true}, { strictPopulate: false }
);

const ProductModal= mongoose.model("product", ProductSchema);
export default ProductModal;