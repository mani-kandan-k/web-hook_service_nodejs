   CREATE TABLE IF NOT EXISTS Accounts (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     email TEXT NOT NULL UNIQUE,
     accountId TEXT NOT NULL UNIQUE,
     accountName TEXT NOT NULL,
     appSecret TEXT NOT NULL,
     website TEXT,
     createdBy TEXT,
     updatedBy TEXT,
     createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
     updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
 );


   CREATE TABLE IF NOT EXISTS  Destinations (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   account_id TEXT NOT NULL,
   url TEXT NOT NULL,
   method TEXT NOT NULL,
   headers TEXT NOT NULL,
   created_by TEXT,
   updated_by TEXT,
   created_date TEXT DEFAULT CURRENT_TIMESTAMP,
   updated_date TEXT DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (account_id) REFERENCES Accounts(accountId) ON DELETE CASCADE
 );


