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
