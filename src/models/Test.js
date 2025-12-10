import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Question text is required'],
  },
  type: {
    type: String,
    enum: ['multiple-choice', 'true-false'],
    default: 'multiple-choice',
  },
  order: {
    type: Number,
    required: true,
  },
  answers: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      text: String,
      isCorrect: Boolean,
      order: Number,
    },
  ],
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium',
  },
  explanation: String,
});

const testSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Test title is required'],
    },
    description: String,
    subject: String,
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    questions: [questionSchema],
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    timeLimit: {
      type: Number, // в секундах
      default: null,
    },
    pointsPerQuestion: {
      type: Number,
      default: 1,
    },
    tags: [String],
    stats: {
      plays: { type: Number, default: 0 },
      avgScore: { type: Number, default: 0 },
      ratings: { type: Number, default: 0 },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Методы для тестов
testSchema.methods.getQuestionCount = function () {
  return this.questions.length;
};

testSchema.methods.getCorrectAnswers = function () {
  return this.questions.map((q) => ({
    questionId: q._id,
    correctAnswerId: q.answers.find((a) => a.isCorrect)?._id,
  }));
};

testSchema.methods.publish = async function () {
  this.status = 'published';
  this.isPublic = true;
  return this.save();
};

testSchema.methods.archive = async function () {
  this.status = 'archived';
  return this.save();
};

export default mongoose.model('Test', testSchema);
