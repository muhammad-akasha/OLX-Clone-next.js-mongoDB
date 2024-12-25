import mongoose from "mongoose";

const olxAdSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required"] },
    description: {
      type: String,
      required: [true, "description is required"],
      maxlength: [4096, "description cannot exceed 4096 characters"],
    },
    brand: {
      type: String,
      required: [true, "brand is required"],
    },
    condition: {
      type: String,
      required: [true, "condition is required"],
    },
    location: {
      type: String,
      required: [true, "location is required"],
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    images: [{ type: String, required: true }],
    showPhoneNumber: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("olxAd", olxAdSchema);
