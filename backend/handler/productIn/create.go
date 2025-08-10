package productIn

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/arirahman2323/managment-sip/model"
	"github.com/google/uuid"
)

func CreateProductIn(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var porductIn model.ProductIn
		if err := json.NewDecoder(r.Body).Decode(&porductIn); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		porductIn.ID = "PIN-" + uuid.New().String()

		query := `
			INSERT INTO products_in (id, product_id, quantity, supplier, note, received_by, expired_date)
			VALUES (?, ?, ?, ?, ?, ?, ?)
		`
		_, err := db.Exec(
			query,
			porductIn.ID,
			porductIn.ProductID,
			porductIn.Quantity,
			porductIn.Supplier,
			porductIn.Note,
			porductIn.ReceivedBy,
			porductIn.ExpiredDate,
		)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Update stok produk
		_, _ = db.Exec("UPDATE products SET stock = stock + ? WHERE id = ?", porductIn.Quantity, porductIn.ProductID)

		json.NewEncoder(w).Encode(map[string]any{
			"message": "Product in berhasil ditambahkan",
			"data":    porductIn,
		})
	}
}
