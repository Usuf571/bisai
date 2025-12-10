import Test from '../models/Test.js';
import mongoose from 'mongoose';

export async function listTests(req, res) {
  try {
    const { skip = 0, limit = 10, subject, difficulty } = req.query;

    const filter = { status: 'published', isPublic: true };
    if (subject) filter.subject = subject;
    if (difficulty) filter.difficulty = difficulty;

    const tests = await Test.find(filter)
      .populate('creatorId', 'username firstName lastName')
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Test.countDocuments(filter);

    res.json({
      tests,
      total,
      page: Math.floor(parseInt(skip) / parseInt(limit)) + 1,
      pages: Math.ceil(total / parseInt(limit)),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getTest(req, res) {
  try {
    const { testId } = req.params;

    const test = await Test.findById(testId).populate('creatorId', 'username');

    if (!test) {
      return res.status(404).json({ error: 'Test not found' });
    }

    res.json(test);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createTest(req, res) {
  try {
    const { title, description, subject, difficulty } = req.body;

    const test = new Test({
      title,
      description,
      subject,
      difficulty,
      creatorId: req.userId,
      questions: [],
    });

    await test.save();

    res.status(201).json(test);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateTest(req, res) {
  try {
    const { testId } = req.params;
    const { title, description, subject, difficulty } = req.body;

    const test = await Test.findById(testId);

    if (!test) {
      return res.status(404).json({ error: 'Test not found' });
    }

    if (test.creatorId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    test.title = title || test.title;
    test.description = description || test.description;
    test.subject = subject || test.subject;
    test.difficulty = difficulty || test.difficulty;

    await test.save();

    res.json(test);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function addQuestion(req, res) {
  try {
    const { testId } = req.params;
    const { text, answers, difficulty, explanation } = req.body;

    const test = await Test.findById(testId);

    if (!test) {
      return res.status(404).json({ error: 'Test not found' });
    }

    if (test.creatorId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const question = {
      _id: new mongoose.Types.ObjectId(),
      text,
      order: test.questions.length + 1,
      answers: answers.map((a, i) => ({
        _id: new mongoose.Types.ObjectId(),
        text: a.text,
        isCorrect: a.isCorrect,
        order: i + 1,
      })),
      difficulty,
      explanation,
    };

    test.questions.push(question);
    await test.save();

    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteQuestion(req, res) {
  try {
    const { testId, questionId } = req.params;

    const test = await Test.findById(testId);

    if (!test) {
      return res.status(404).json({ error: 'Test not found' });
    }

    if (test.creatorId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    test.questions = test.questions.filter((q) => q._id.toString() !== questionId);

    // Пересчитать порядок
    test.questions.forEach((q, i) => {
      q.order = i + 1;
    });

    await test.save();

    res.json({ message: 'Question deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function publishTest(req, res) {
  try {
    const { testId } = req.params;

    const test = await Test.findById(testId);

    if (!test) {
      return res.status(404).json({ error: 'Test not found' });
    }

    if (test.creatorId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    if (test.questions.length === 0) {
      return res.status(400).json({ error: 'Test must have at least one question' });
    }

    await test.publish();

    res.json(test);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteTest(req, res) {
  try {
    const { testId } = req.params;

    const test = await Test.findById(testId);

    if (!test) {
      return res.status(404).json({ error: 'Test not found' });
    }

    if (test.creatorId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await Test.findByIdAndDelete(testId);

    res.json({ message: 'Test deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getMyTests(req, res) {
  try {
    const { status = 'draft', skip = 0, limit = 10 } = req.query;

    const tests = await Test.find({ creatorId: req.userId, status })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Test.countDocuments({ creatorId: req.userId, status });

    res.json({
      tests,
      total,
      pages: Math.ceil(total / parseInt(limit)),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
