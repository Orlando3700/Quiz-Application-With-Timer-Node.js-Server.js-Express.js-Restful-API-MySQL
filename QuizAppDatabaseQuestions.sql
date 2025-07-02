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

INSERT INTO questions (question, option1, option2, option3, option4, answer)
VALUES
  ("What is the capital of France?", "Berlin", "Madrid", "Paris", "Lisbon", "Paris"),
  ("What is the capital of Spain?", "Berlin", "Madrid", "Paris", "Lisbon", "Madrid"),
  ("What is the capital of China?", "Shanghai", "Beijing", "Seoul", "Tokyo", "Beijing"),
  ("What is the capital of South Korea?", "Seoul", "Busan", "Daegu", "Incheon", "Seoul"),
  ("What is the capital of Japan?", "Tokyo", "Kyoto", "Osaka", "Nagoya", "Tokyo");
