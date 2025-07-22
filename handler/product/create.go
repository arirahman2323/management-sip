package product

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/arirahman2323/managment-sip/model"
)

func CreateProduct(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var input model.Product

		// Decode JSON
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, "Invalid JSON format", http.StatusBadRequest)
			return
		}

		// Validasi wajib
		if input.Sku == "" || input.Name == "" {
			http.Error(w, "SKU and Product Name are required", http.StatusBadRequest)
			return
		}

		// Cek SKU sudah ada?
		var exists int
		err := db.QueryRow("SELECT COUNT(*) FROM products WHERE sku = ?", input.Sku).Scan(&exists)
		if err != nil {
			http.Error(w, "Database error: "+err.Error(), http.StatusInternalServerError)
			return
		}
		if exists > 0 {
			http.Error(w, "Product with this barcode (SKU) already exists", http.StatusConflict)
			return
		}

		// Generate ID otomatis
		var count int
		_ = db.QueryRow("SELECT COUNT(*) FROM products").Scan(&count)
		input.ID = fmt.Sprintf("PRD-%03d", count+1)

		// Insert ke DB
		_, err = db.Exec(`
			INSERT INTO products (id, sku, name, item_id, unit_id, price, price_sell, min_stock)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
			input.ID, input.Sku, input.Name, input.ItemID, input.UnitID,
			input.Price, input.PriceSell, input.MinStock,
		)
		if err != nil {
			http.Error(w, "Insert failed: "+err.Error(), http.StatusInternalServerError)
			return
		}

		// Respon sukses
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "Product created successfully",
			"data":    input,
		})
	}
}
