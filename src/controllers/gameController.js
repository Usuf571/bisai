import GameSession from '../models/GameSession.js';
import Test from '../models/Test.js';

export async function createSession(req, res) {
  try {
    const { testId, teamRedName, teamBlueName } = req.body;

    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ error: 'Test not found' });
    }

    const session = new GameSession({
      testId,
      creatorId: req.userId,
      teams: {
        red: { name: teamRedName, color: 'red' },
        blue: { name: teamBlueName, color: 'blue' },
      },
      players: [],
    });

    await session.save();

    res.status(201).json({
      code: session.code,
      sessionId: session._id,
      test,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getSession(req, res) {
  try {
    const { code } = req.params;

    const session = await GameSession.findOne({ code })
      .populate('testId')
      .populate('creatorId', 'username');

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function addPlayer(req, res) {
  try {
    const { code } = req.params;
    const { name, teamColor } = req.body;

    const session = await GameSession.findOne({ code });

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    if (session.status !== 'waiting') {
      return res.status(400).json({ error: 'Game already started' });
    }

    await session.addPlayer(name, teamColor, req.userId || null);

    res.status(201).json({
      playerId: session.players[session.players.length - 1]._id,
      players: session.players,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function startGame(req, res) {
  try {
    const { code } = req.params;

    const session = await GameSession.findOne({ code }).populate('testId');

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    if (session.players.length === 0) {
      return res.status(400).json({ error: 'No players in game' });
    }

    await session.start();

    res.json({
      status: session.status,
      currentQuestionIndex: session.currentQuestionIndex,
      totalQuestions: session.testId.questions.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getCurrentQuestion(req, res) {
  try {
    const { code } = req.params;

    const session = await GameSession.findOne({ code }).populate('testId');

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    if (session.status !== 'in-progress') {
      return res.status(400).json({ error: 'Game not in progress' });
    }

    const question = session.testId.questions[session.currentQuestionIndex];

    if (!question) {
      return res.status(400).json({ error: 'No more questions' });
    }

    // Не отправляем правильный ответ на фронтенд
    const questionData = {
      _id: question._id,
      text: question.text,
      type: question.type,
      order: question.order,
      difficulty: question.difficulty,
      answers: question.answers.map((a) => ({
        _id: a._id,
        text: a.text,
        order: a.order,
      })),
      explanation: question.explanation,
      questionNumber: session.currentQuestionIndex + 1,
      totalQuestions: session.testId.questions.length,
    };

    const scores = session.getTeamScores();

    res.json({
      question: questionData,
      scores,
      currentQuestionIndex: session.currentQuestionIndex,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function submitAnswer(req, res) {
  try {
    const { code } = req.params;
    const { playerId, answerId } = req.body;

    const session = await GameSession.findOne({ code }).populate('testId');

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const question = session.testId.questions[session.currentQuestionIndex];
    const selectedAnswer = question.answers.find((a) => a._id.toString() === answerId);
    const isCorrect = selectedAnswer?.isCorrect || false;

    await session.submitAnswer(playerId, answerId, isCorrect, 0);

    const scores = session.getTeamScores();

    res.json({
      isCorrect,
      explanation: question.explanation,
      scores,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function nextQuestion(req, res) {
  try {
    const { code } = req.params;

    const session = await GameSession.findOne({ code }).populate('testId');

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    if (session.currentQuestionIndex >= session.testId.questions.length - 1) {
      await session.finish();
      return res.json({
        finished: true,
        results: session.results,
      });
    }

    await session.nextQuestion();

    res.json({
      currentQuestionIndex: session.currentQuestionIndex,
      totalQuestions: session.testId.questions.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getGameResults(req, res) {
  try {
    const { code } = req.params;

    const session = await GameSession.findOne({ code }).populate('testId');

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json({
      status: session.status,
      results: session.results,
      players: session.players,
      teams: session.teams,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getGameState(req, res) {
  try {
    const { code } = req.params;

    const session = await GameSession.findOne({ code });

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const scores = session.getTeamScores();

    res.json({
      status: session.status,
      players: session.players,
      scores,
      currentQuestionIndex: session.currentQuestionIndex,
      teams: session.teams,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
