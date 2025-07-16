package db

import (
	"database/sql"
	"fmt"
	"log"
)

func execQuery(db *sql.DB, query, table string) {
	var exists int
	_ = db.QueryRow("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = ?", table).Scan(&exists)

	if exists > 0 {
		log.Printf("🔄 Table %s already exists. Replacing...", table)

		// Drop previous *_old if exists
		db.Exec(fmt.Sprintf("DROP TABLE IF EXISTS %s_old", table))

		// Rename current table to *_old
		_, err := db.Exec(fmt.Sprintf("ALTER TABLE %s RENAME TO %s_old", table, table))
		if err != nil {
			log.Fatalf("❌ Failed to rename old table %s: %v", table, err)
		}
	}

	// Buat tabel baru
	if _, err := db.Exec(query); err != nil {
		log.Fatalf("❌ Failed to migrate %s: %v", table, err)
	}
	log.Printf("✅ Migrated table: %s", table)

	// 🔁 Salin data dari *_old ke tabel baru
	oldTable := table + "_old"

	// Coba salin data jika tabel lama ada
	var oldExists int
	_ = db.QueryRow("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = ?", oldTable).Scan(&oldExists)

	if oldExists > 0 {
		copyQuery := fmt.Sprintf("INSERT INTO %s SELECT * FROM %s", table, oldTable)
		if _, err := db.Exec(copyQuery); err != nil {
			log.Printf("⚠️ Gagal menyalin data dari %s ke %s: %v", oldTable, table, err)
		} else {
			log.Printf("📥 Data lama berhasil disalin dari %s ke %s", oldTable, table)
		}
	}
}
