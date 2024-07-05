DROP TABLE IF EXISTS feed;
DROP TABLE IF EXISTS follow;
DROP TABLE IF EXISTS hash_feed;
DROP TABLE IF EXISTS hashtag;
DROP TABLE IF EXISTS user;

CREATE TABLE `feed` (
  `id` int NOT NULL AUTO_INCREMENT,
  `writer` varchar(45) NOT NULL,
  `subject` varchar(100) DEFAULT NULL,
  `content` varchar(45) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  `savefilename` varchar(45) DEFAULT NULL,
  `writedate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `follow` (
  `id` int NOT NULL AUTO_INCREMENT,
  `follow_to` varchar(45) DEFAULT NULL,
  `follow_from` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `hash_feed` (
  `id` int NOT NULL AUTO_INCREMENT,
  `feed_id` int NOT NULL,
  `hash_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `hashtag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `word` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user` (
  `email` varchar(100) NOT NULL,
  `nickname` varchar(45) DEFAULT NULL,
  `pwd` varchar(200) DEFAULT NULL,
  `provider` varchar(45) DEFAULT NULL,
  `indate` datetime DEFAULT CURRENT_TIMESTAMP,
  `sns-id` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
