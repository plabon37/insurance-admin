import mongoose, { Document, Model, Schema } from "mongoose";

export interface IHero extends Document {
  badge: string;
  title: string;
  description: string;

  buttonText: string;
  buttonLink: string;

  videoText: string;
  videoUrl: string;

  backgroundImage: string;

  isActive: boolean;
}

const HeroSchema = new Schema<IHero>(
  {
    badge: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    buttonText: {
      type: String,
      default: "Discover More",
    },

    buttonLink: {
      type: String,
      default: "#",
    },

    videoText: {
      type: String,
      default: "Watch Video",
    },

    videoUrl: {
      type: String,
      default: "",
    },

    backgroundImage: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Hero: Model<IHero> =
  mongoose.models.Hero || mongoose.model<IHero>("Hero", HeroSchema);

export default Hero;