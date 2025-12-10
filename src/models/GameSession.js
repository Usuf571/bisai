import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const gamePlayerSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  teamColor: {
    type: String,
    enum: ['red', 'blue'],
  },
  score: {
    type: Number,
    default: 0,
  },
  attempts: {
    type: Number,
    default: 0,
  },
  correctAnswers: {
    type: Number,
    default: 0,
  },
  answers: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      answerId: mongoose.Schema.Types.ObjectId,
      isCorrect: Boolean,
      time: Number, // в секундах
    },
  ],
});

const gameSessionSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      default: () => uuidv4().substring(0, 8).toUpperCase(),
    },
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Test',
      required: true,
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    teams: {
      red: {
        name: String,
        color: { type: String, default: 'red' },
      },
      blue: {
        name: String,
        color: { type: String, default: 'blue' },
      },
    },
    players: [gamePlayerSchema],
    status: {
      type: String,
      enum: ['waiting', 'in-progress', 'finished'],
      default: 'waiting',
    },
    currentQuestionIndex: {
      type: Number,
      default: -1,
    },
    results: {
      winner: String, // 'red', 'blue', 'draw'
      redScore: Number,
      blueScore: Number,
      redTeam: Object,
      blueTeam: Object,
    },
    startedAt: Date,
    finishedAt: Date,
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

// Методы для игровой сессии
gameSessionSchema.methods.addPlayer = async function (name, teamColor, userId) {
  const player = {
    _id: new mongoose.Types.ObjectId(),
    name,
    teamColor,
    userId,
    score: 0,
    attempts: 0,
    correctAnswers: 0,
    answers: [],
  };
  this.players.push(player);
  return this.save();
};

gameSessionSchema.methods.start = async function () {
  this.status = 'in-progress';
  this.startedAt = new Date();
  this.currentQuestionIndex = 0;
  return this.save();
};

gameSessionSchema.methods.nextQuestion = async function () {
  this.currentQuestionIndex += 1;
  return this.save();
};

gameSessionSchema.methods.submitAnswer = async function (playerId, answerId, isCorrect, time) {
  const player = this.players.id(playerId);
  if (!player) throw new Error('Player not found');

  const question = this.populate('testId');
  const currentQuestion = (await this.populate('testId')).testId.questions[this.currentQuestionIndex];

  player.attempts += 1;
  if (isCorrect) {
    player.correctAnswers += 1;
    player.score += 1;
  }

  player.answers.push({
    questionId: currentQuestion._id,
    answerId,
    isCorrect,
    time,
  });

  return this.save();
};

gameSessionSchema.methods.finish = async function () {
  this.status = 'finished';
  this.finishedAt = new Date();

  const redScore = this.players
    .filter((p) => p.teamColor === 'red')
    .reduce((sum, p) => sum + p.score, 0);
  const blueScore = this.players
    .filter((p) => p.teamColor === 'blue')
    .reduce((sum, p) => sum + p.score, 0);

  let winner = 'draw';
  if (redScore > blueScore) winner = 'red';
  if (blueScore > redScore) winner = 'blue';

  this.results = {
    winner,
    redScore,
    blueScore,
    redTeam: this.teams.red,
    blueTeam: this.teams.blue,
  };

  return this.save();
};

gameSessionSchema.methods.getTeamScores = function () {
  const redScore = this.players
    .filter((p) => p.teamColor === 'red')
    .reduce((sum, p) => sum + p.score, 0);
  const blueScore = this.players
    .filter((p) => p.teamColor === 'blue')
    .reduce((sum, p) => sum + p.score, 0);

  return { redScore, blueScore };
};

export default mongoose.model('GameSession', gameSessionSchema);
