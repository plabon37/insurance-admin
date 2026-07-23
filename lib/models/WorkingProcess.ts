import mongoose, { Schema, Document, models } from "mongoose";

export interface IWorkingProcess extends Document {
  badge: string;
  heading: string;
  description: string;
  backgroundImage: string;
  isActive: boolean;
  steps: {
    image: string;
    stepNumber: number;
    title: string;
    description: string;
    displayOrder: number;
    isActive: boolean;
  }[];
}

const StepSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },

    stepNumber: {
      type: Number,
      required: true,
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

const WorkingProcessSchema = new Schema(
  {
    badge: {
      type: String,
      required: true,
      trim: true,
    },

    heading: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    backgroundImage: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    steps: {
      type: [StepSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default models.WorkingProcess ||
  mongoose.model<IWorkingProcess>(
    "WorkingProcess",
    WorkingProcessSchema
  );