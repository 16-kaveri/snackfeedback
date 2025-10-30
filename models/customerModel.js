import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rating:{type:Number,required:true},
  feedback: { type: String },
   product: { type: String, required: true },
});

export default mongoose.models.Customer ||
  mongoose.model("Customer", CustomerSchema);
