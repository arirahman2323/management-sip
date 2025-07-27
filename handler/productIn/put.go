package productIn

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"time"

	"github.com/arirahman2323/managment-sip/model"
	"github.com/gorilla/mux"
)

func UpdateProductIn(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := mux.Vars(r)["id"]

		var p model.ProductIn
		if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// Ambil quantity lama
		var oldQty int
		err := db.QueryRow("SELECT quantity FROM products_in WHERE id = ?", id).Scan(&oldQty)
		if err != nil {
			http.Error(w, "Data tidak ditemukan", http.StatusNotFound)
			return
		}

		// Update products_in
		_, err = db.Exec(`
			UPDATE products_in SET product_id = ?, quantity = ?, supplier = ?, note = ?, received_by = ?, updated_at = ?, expired_date = ?
			WHERE id = ?
		`, p.ProductID, p.Quantity, p.Supplier, p.Note, p.ReceivedBy, time.Now(), p.ExpiredDate, id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Hitung selisih quantity dan update stok
		diff := p.Quantity - oldQty
		_, _ = db.Exec("UPDATE products SET stock = stock + ? WHERE id = ?", diff, p.ProductID)

		json.NewEncoder(w).Encode(map[string]string{
			"message": "Product in berhasil diupdate",
		})
	}
}
