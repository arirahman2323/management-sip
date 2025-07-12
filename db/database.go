package db

import (
	"database/sql"
	"log"
)

func Connect() *sql.DB {
	db, err := sql.Open("sqlite", "./app.db")
	if err != nil {
		log.Fatal(err)
	}
	return db
}

func Migrate(db *sql.DB) {
	query := `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
    )`
	_, err := db.Exec(query)
	if err != nil {
		log.Fatal(err)
	}
}
