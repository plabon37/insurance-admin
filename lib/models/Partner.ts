import { Schema, model, models } from "mongoose";

const LogoSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
      trim: true,
    },

    websiteUrl: {
      type: String,
      required: true,
      trim: true,
    },

    displayOrder: {
      type: Number,
      default: 1,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    _id: true,
  }
);

const PartnerSchema = new Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
    },

    logos: {
      type: [LogoSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Partner =
  models.Partner || model("Partner", PartnerSchema);

export default Partner;