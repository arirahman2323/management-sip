package productout

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/arirahman2323/managment-sip/model"
	"github.com/google/uuid"
)

func CreateProductOut(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var porductOut model.ProductOut
		if err := json.NewDecoder(r.Body).Decode(&porductOut); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		porductOut.ID = "POUT-" + uuid.New().String()

		query := `
			INSERT INTO products_out (id, product_id, quantity)
			VALUES (?, ?, ?)
		`
		_, err := db.Exec(
			query,
			porductOut.ID,
			porductOut.ProductID,
			porductOut.Quantity,
		)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Update stok produk
		_, _ = db.Exec("UPDATE products SET stock = stock - ? WHERE id = ?", porductOut.Quantity, porductOut.ProductID)

		json.NewEncoder(w).Encode(map[string]any{
			"message": "Product in berhasil ditambahkan",
			"data":    porductOut,
		})
	}
}
