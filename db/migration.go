package db

import (
	"database/sql"
	"log"
)

func Migrate(db *sql.DB) {
	createUsersTable(db)
	createProductsTable(db)
	createOrdersTable(db)
	// tambahkan lagi di sini kalau ada tabel lain
}

func createUsersTable(db *sql.DB) {
	query := `
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		email TEXT NOT NULL UNIQUE,
		password TEXT NOT NULL
	);`
	execQuery(db, query, "users")
}

func createProductsTable(db *sql.DB) {
	query := `
	CREATE TABLE IF NOT EXISTS products (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		price REAL NOT NULL,
		stock INTEGER DEFAULT 0
	);`
	execQuery(db, query, "products")
}

func createOrdersTable(db *sql.DB) {
	query := `
	CREATE TABLE IF NOT EXISTS orders (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id INTEGER NOT NULL,
		total REAL NOT NULL,
		created_at TEXT,
		FOREIGN KEY(user_id) REFERENCES users(id)
	);`
	execQuery(db, query, "orders")
}

// Fungsi bantu supaya log rapi
func execQuery(db *sql.DB, query string, table string) {
	_, err := db.Exec(query)
	if err != nil {
		log.Fatalf("Failed to create table %s: %v", table, err)
	} else {
		log.Printf("✅ Migrated table: %s", table)
	}
}
