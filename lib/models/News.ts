import mongoose, { Schema } from "mongoose";

const NewsItemSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    buttonText: {
      type: String,
      default: "Read More",
    },

    buttonLink: {
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

const NewsSchema = new Schema(
  {
    badge: {
      type: String,
      required: true,
    },

    heading: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    newsItems: {
      type: [NewsItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.News ||
  mongoose.model("News", NewsSchema);