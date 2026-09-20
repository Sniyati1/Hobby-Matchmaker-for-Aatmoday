CREATE DATABASE hobby_matchmaker;

USE hobby_matchmaker;

CREATE TABLE user_preferences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    environment VARCHAR(20),
    social_preference VARCHAR(20),
    budget INT
);