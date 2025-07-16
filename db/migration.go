package db

import (
	"database/sql"
)

// Panggil di main.go
func Migrate(db *sql.DB) {
	migrations := []struct {
		name  string
		query string
	}{
		{
			name: "users",
			query: `
				CREATE TABLE IF NOT EXISTS users (
					id INTEGER PRIMARY KEY AUTOINCREMENT,
					name TEXT NOT NULL,
					email TEXT NOT NULL UNIQUE,
					password TEXT NOT NULL,
					created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
					updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
				);`,
		},
		{
			name: "item_types",
			query: `
				CREATE TABLE IF NOT EXISTS item_types (
					id TEXT PRIMARY KEY,
					name TEXT NOT NULL,
					created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
					updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
				);`,
		},
		// Tambahkan migrasi tabel lain di sini nanti
	}

	for _, m := range migrations {
		execQuery(db, m.query, m.name)
	}
}
