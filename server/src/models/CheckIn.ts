import mongoose, { Schema, Document } from "mongoose";

export interface ICheckIn extends Document {
  userId: mongoose.Types.ObjectId;
  date: Date;
  tasksCompleted: string[];
  totalTasks: number;
  photo?: string;
  notes?: string;
  score: number;
  createdAt: Date;
}

const CheckInSchema = new Schema<ICheckIn>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      default: () => new Date().setHours(0, 0, 0, 0),
    },
    tasksCompleted: [{
      type: String,
      required: true,
    }],
    totalTasks: {
      type: Number,
      default: 8,
    },
    photo: {
      type: String,
      default: null,
    },
    notes: {
      type: String,
      default: null,
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Compound index for unique daily check-in per user
CheckInSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model<ICheckIn>("CheckIn", CheckInSchema);
