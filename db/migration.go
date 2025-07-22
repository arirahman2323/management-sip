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
					name TEXT NOT NULL,								-- Nama pengguna
					email TEXT NOT NULL UNIQUE,						-- Email unik
					password TEXT NOT NULL,							-- Password terenkripsi
					created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
					updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
				);`,
		},
		{
			name: "item_types",
			query: `
				CREATE TABLE IF NOT EXISTS item_types (
					id TEXT PRIMARY KEY,							-- ID sistem (e.g. ITM-001)	
					name TEXT NOT NULL,								-- Nama jenis item (e.g. rokok, minuman)
					created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
					updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
				);`,
		},
		{
			name: "unit_types",
			query: `
				CREATE TABLE IF NOT EXISTS unit_types (
					id TEXT PRIMARY KEY,							-- ID sistem (e.g. UNT-001)
					name TEXT NOT NULL,								-- Nama satuan (e.g. pcs, botol)
					created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
					updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
				);`,
		},
		{
			name: "products",
			query: `
			CREATE TABLE IF NOT EXISTS products (
				id TEXT PRIMARY KEY,                          		-- ID sistem (e.g. PRD-001)
				sku TEXT UNIQUE NOT NULL,                     		-- Kode barcode produk
				name TEXT NOT NULL,                           		-- Nama produk
				item_id TEXT NOT NULL,                    		-- Kategori produk (ex: rokok, minuman)
				unit_id TEXT NOT NULL,                        		-- Satuan dasar (pcs, botol)
				stock INTEGER NOT NULL DEFAULT 0,             		-- Stok saat ini
				min_stock INTEGER NOT NULL DEFAULT 0,         		-- Minimal stok sebelum reorder
				price INTEGER NOT NULL DEFAULT 0,             		-- Harga beli
				price_sell INTEGER NOT NULL DEFAULT 0,        		-- Harga jual
				expired_date TEXT,                            		-- Tanggal kadaluarsa (jika ada)
				created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
				updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

				FOREIGN KEY (item_id) REFERENCES item_types(id),
				FOREIGN KEY (unit_id) REFERENCES unit_types(id)
			);`,
		},
		// Tambahkan migrasi tabel lain di sini nanti
	}

	for _, m := range migrations {
		execQuery(db, m.query, m.name)
	}
}
