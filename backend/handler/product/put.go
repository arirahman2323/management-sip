package product

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/arirahman2323/managment-sip/model"
	"github.com/gorilla/mux"
)

func UpdateProduct(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := mux.Vars(r)["id"]
		var input model.Product

		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, "Invalid JSON format", http.StatusBadRequest)
			return
		}

		// Validasi wajib
		if input.Sku == "" || input.Name == "" {
			http.Error(w, "SKU and Product Name are required", http.StatusBadRequest)
			return
		}

		// Cek apakah SKU sudah dipakai produk lain
		var existingID string
		err := db.QueryRow("SELECT id FROM products WHERE sku = ? AND id != ?", input.Sku, id).Scan(&existingID)
		if err != nil && err != sql.ErrNoRows {
			http.Error(w, "Database error: "+err.Error(), http.StatusInternalServerError)
			return
		}
		if existingID != "" {
			http.Error(w, fmt.Sprintf("SKU '%s' is already used by another product (ID: %s)", input.Sku, existingID), http.StatusConflict)
			return
		}

		// Hitung ulang profit
		profitAmount := input.PriceSell - input.Price
		input.ProfitAmount = profitAmount

		// Eksekusi update termasuk profit_amount
		_, err = db.Exec(`
			UPDATE products SET
				sku = ?, name = ?, item_id = ?, unit_id = ?,
				price = ?, price_sell = ?, profit_amount = ?, min_stock = ?,
				updated_at = CURRENT_TIMESTAMP
			WHERE id = ?`,
			input.Sku, input.Name, input.ItemID, input.UnitID,
			input.Price, input.PriceSell, profitAmount, input.MinStock, id,
		)
		if err != nil {
			http.Error(w, "Update failed: "+err.Error(), http.StatusInternalServerError)
			return
		}

		// Response sukses
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"data": map[string]interface{}{
				"id":            id,
				"sku":           input.Sku,
				"name":          input.Name,
				"item_id":       input.ItemID,
				"unit_id":       input.UnitID,
				"price":         input.Price,
				"price_sell":    input.PriceSell,
				"profit_amount": input.ProfitAmount,
				"min_stock":     input.MinStock,
			},
			"message": "Product updated successfully",
		})
	}
}
