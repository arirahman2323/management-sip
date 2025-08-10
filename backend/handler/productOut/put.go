package productout

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/arirahman2323/managment-sip/model"
	"github.com/gorilla/mux"
)

func UpdateProductOut(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id := vars["id"]
		if id == "" {
			http.Error(w, "Missing id parameter", http.StatusBadRequest)
			return
		}

		var updated model.ProductOut
		if err := json.NewDecoder(r.Body).Decode(&updated); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// Ambil quantity lama
		var oldQuantity int
		err := db.QueryRow("SELECT quantity FROM products_out WHERE id = ?", id).Scan(&oldQuantity)
		if err != nil {
			http.Error(w, "Data not found", http.StatusNotFound)
			return
		}

		// Update record
		_, err = db.Exec(`
			UPDATE products_out SET product_id = ?, quantity = ? WHERE id = ?
		`, updated.ProductID, updated.Quantity, id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Update stok produk
		_, _ = db.Exec(`
			UPDATE products SET stock = stock + ? - ? WHERE id = ?
		`, oldQuantity, updated.Quantity, updated.ProductID)

		updated.ID = id
		json.NewEncoder(w).Encode(map[string]any{
			"message": "Product out berhasil diperbarui",
			"data":    updated,
		})
	}
}
