# Geography Quiz App

A web-based interactive geography quiz game built with HTML, CSS, JavaScript, Node.js, Express.js, and MySQL. Users can enter their name, answer multiple-choice questions, and submit their scores to a leaderboard stored in a MySQL database.

---

## Built With
- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- MySQL
- RESTful API

---

## Demo
Users start by entering their name, then begin the quiz. The app displays one question at a time, tracks the score, and saves the result at the end.

---

## Features

- Multiple-choice geography questions
- Countdown timer (30 seconds for entire quiz)
- Score tracking
- Results submitted to a backend API
- Scores stored in MySQL
- Leaderboard endpoint to fetch top scores
- Responsive UI
- Name stored in localStorage

---

## Technologies Used

- Frontend:	HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Relational Database: MySQL
- Styling	Custom: CSS, Font Awesome Icons
- Data Format:	RESTful API (JSON)

---

## Folder Structure

- project-root/
- public/
- index.html
- quiz.html
- style.css
- quizStyle.css
- script.js
- server.js

---

- README.md

---

## Setup Instructions

Prerequisites
- Node.js (v18+)
- MySQL installed and running

### 1. Clone the Repository
- git clone https://github.com/your-username/geography-quiz.git
- cd geography-quiz

### 2. Install Node Dependencies
- npm install

### 3. Configure the MySQL Database
- Create Database and Tables

Run the following SQL in your MySQL Workbench):

CREATE DATABASE quiz_app;

USE quiz_app;

CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question TEXT NOT NULL,
  option1 VARCHAR(255),
  option2 VARCHAR(255),
  option3 VARCHAR(255),
  option4 VARCHAR(255),
  answer VARCHAR(255)
);

INSERT INTO questions (question, option1, option2, option3, option4, answer) VALUES
('What is the capital of France?', 'Berlin', 'Madrid', 'Paris', 'Lisbon', 'Paris'),
('What is the capital of Spain?', 'Berlin', 'Madrid', 'Paris', 'Lisbon', 'Madrid'),
('What is the capital of China?', 'Shanghai', 'Beijing', 'Seoul', 'Tokyo', 'Beijing'),
('What is the capital of South Korea?', 'Seoul', 'Busan', 'Daegu', 'Incheon', 'Seoul'),
('What is the capital of Japan?', 'Tokyo', 'Kyoto', 'Osaka', 'Nagoya', 'Tokyo');

CREATE TABLE scores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  score INT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

### 4. Update server.js MySQL Config

Inside server.js, update the MySQL credentials:

const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'quiz_app'
});

### 5. Start the Server
- node server.js
- Server runs at: http://localhost:3000

---

## How to Run the App

- Open index.html in your browser.
- Enter your name and click Start Quiz.
- Answer questions within 30 seconds.
- View your score and restart if desired.
- Scores are stored in MySQL via a POST /result API call.

---

## API Endpoints

- Method	Endpoint	Description
- GET	/quiz	Fetches quiz questions
- POST	/result	Saves user score
- GET	/leaderboard	Returns top 10 scores

---

## Author

Orlando Fernand
