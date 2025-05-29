CREATE TYPE "role" AS ENUM ('USER', 'ADMIN');

CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role "role" NOT NULL,
      create_date DATE DEFAULT CURRENT_DATE,
      avatar_link TEXT
);

CREATE TABLE trips(
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      date DATE NOT NULL,
      description TEXT,
      category TEXT NOT NULL,
      photo_link TEXT,
      creator_id INTEGER,
      FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE user_trips(
       user_id INTEGER NOT NULL,
       trip_id INTEGER NOT NULL,
       FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
       FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);