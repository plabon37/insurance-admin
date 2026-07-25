import mongoose, { Schema, model, models } from "mongoose";

const MenuSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      required: true,
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
    _id: false,
  }
);

const PaymentMethodSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      default: "#",
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
    _id: false,
  }
);

const FooterCTASchema = new Schema(
  {
    topText: {
      type: String,
      required: true,
    },

    heading: {
      type: String,
      required: true,
    },

    buttonText: {
      type: String,
      required: true,
    },

    buttonLink: {
      type: String,
      required: true,
    },

    officeTime: {
      type: String,
      required: true,
    },

    paymentTitle: {
      type: String,
      required: true,
    },

    facebook: {
      type: String,
      default: "",
    },

    twitter: {
      type: String,
      default: "",
    },

    instagram: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    menus: [MenuSchema],

    paymentMethods: [PaymentMethodSchema],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const FooterCTA =
  models.FooterCTA ||
  model("FooterCTA", FooterCTASchema);

export default FooterCTA;