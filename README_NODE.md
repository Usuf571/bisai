# ⚔️ BiSAI - Node.js Version

Team-based quiz game with Tug of War mechanics, built with **Node.js + Express + MongoDB**.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- MongoDB 4.4+
- npm or yarn

### Installation

```bash
# 1. Clone repository
git clone https://github.com/yourusername/bisai.git
cd bisai

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env
# Edit .env with your MongoDB URL and secrets

# 4. Run server
npm start
# Server will run on http://localhost:3000
```

### Development Mode

```bash
npm run dev
# Auto-reload with nodemon on file changes
```

## 📚 Features

✅ **User Management** - Registration, login, profiles  
✅ **Test Creation** - Create, edit, publish quizzes  
✅ **Team Games** - 1v1 or multi-player modes  
✅ **Tug of War** - Visual rope animation showing team dominance  
✅ **Real-time Scoring** - Live score updates during gameplay  
✅ **Responsive Design** - Works on desktop, tablet, mobile  

## 🏗️ Project Structure

```
bisai/
├── src/
│   ├── config/          # Configuration (database, env)
│   ├── models/          # Mongoose schemas
│   ├── controllers/     # Business logic
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth, validation
│   └── server.js        # Express app entry
├── public/
│   ├── index.html       # Main HTML
│   └── assets/
│       ├── css/         # Stylesheets
│       └── js/          # Client-side scripts
├── package.json         # Dependencies
└── .env                 # Environment variables
```

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register       # Create account
POST   /api/auth/login          # Login user
GET    /api/auth/profile        # Get profile
PUT    /api/auth/profile        # Update profile
```

### Tests
```
GET    /api/tests/list          # Get published tests
GET    /api/tests/:testId       # Get test details
POST   /api/tests               # Create new test
PUT    /api/tests/:testId       # Update test
POST   /api/tests/:testId/questions     # Add question
DELETE /api/tests/:testId/questions/:qId # Delete question
POST   /api/tests/:testId/publish       # Publish test
DELETE /api/tests/:testId               # Delete test
GET    /api/tests/my/tests              # Get my tests
```

### Games
```
POST   /api/games/session                    # Create game session
GET    /api/games/session/:code              # Get session info
POST   /api/games/session/:code/players      # Add player
POST   /api/games/session/:code/start        # Start game
GET    /api/games/session/:code/question     # Get current question
POST   /api/games/session/:code/answer       # Submit answer
POST   /api/games/session/:code/next         # Next question
GET    /api/games/session/:code/state        # Get game state
GET    /api/games/session/:code/results      # Get results
```

## 🔐 Authentication

Uses **JWT tokens** for API authentication:

```javascript
// Login
POST /api/auth/login
{
  "username": "john",
  "password": "password123"
}

// Response
{
  "token": "eyJhbGc...",
  "user": { ... }
}

// Use token in requests
fetch('/api/tests', {
  headers: {
    'Authorization': 'Bearer eyJhbGc...'
  }
})
```

## 🎮 Game Mechanics

1. **Setup**: Create team names
2. **Questions**: Players answer multiple-choice questions
3. **Scoring**: Correct answer = 1 point for team
4. **Rope**: Visual animation showing team advantage
5. **Results**: Winner is team with more correct answers

## 💾 Database Schema

### Collections

- **users** - User accounts with passwords (hashed)
- **tests** - Quiz tests with questions
- **gamesessions** - Active game instances
- **statistics** - Player performance tracking

See `src/models/` for full schemas.

## 🎨 Frontend Technologies

- **HTML5** - Semantic structure
- **CSS3** - Responsive design with flexbox/grid
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **Canvas API** - Rope animation
- **Fetch API** - AJAX requests

## 🚢 Deployment

### Heroku
```bash
heroku create bisai-app
git push heroku main
```

### AWS/DigitalOcean
```bash
npm install
npm start
# Set MONGODB_URL and other env vars on server
```

### Docker
```bash
docker build -t bisai .
docker run -p 3000:3000 bisai
```

## 🐛 Troubleshooting

**MongoDB connection error**
```
Check DATABASE_URL in .env
Make sure MongoDB is running
```

**Port already in use**
```
PORT=3001 npm start
```

**JWT errors**
```
Clear browser localStorage
Make sure JWT_SECRET is set in .env
```

## 📄 License

MIT © BISAI Team

## 🤝 Contributing

Contributions welcome! Please:
1. Fork repository
2. Create feature branch
3. Commit changes
4. Push and submit PR

---

**Made with ❤️ by BISAI Team**
