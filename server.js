const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'OrlandoFRN',
  password: 'Fernand18',
  database: 'quiz_app'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

// Return quiz data
app.get('/quiz', (req, res) => {
  const query = 'SELECT * FROM questions';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching questions:', err);
      return res.status(500).json({ message: 'Error retrieving questions' });
    }

    // Format results for frontend
    const formatted = results.map(q => ({
      question: q.question,
      options: [q.option1, q.option2, q.option3, q.option4],
      answer: q.answer
    }));

    res.json(formatted);
  });
});

// Save score to database
app.post('/result', (req, res) => {
  const { name, score } = req.body;

  if (typeof name !== 'string' || typeof score !== 'number') {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const query = 'INSERT INTO scores (name, score) VALUES (?, ?)';
    db.query(query, [name, score], (err, result) => {
      if (err) {
        console.error('Error saving score:', err);
        return res.status(500).json({ message: 'Database error' });
      }
      res.json({ message: 'Score saved successfully' });
    });
  });

  // GET: Leaderboard
  app.get('/leaderboard', (req, res) => {
    db.query('SELECT name, score, timestamp FROM scores ORDER BY score DESC LIMIT 10', (err, results) => {
      if (err) return res.status(500).json({ message: 'Error fetching leaderboard' });
      res.json(results);
    });
  });

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });



