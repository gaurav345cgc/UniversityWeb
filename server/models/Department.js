import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    university: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "university",
        required: true,
    }
},
{
    timestamps: true,
    strictPopulate: false
});

const DepartmentModel = mongoose.model("department", DepartmentSchema);
export default DepartmentModel;
