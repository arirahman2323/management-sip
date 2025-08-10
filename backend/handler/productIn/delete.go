package productIn

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

func DeleteProductIn(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := mux.Vars(r)["id"]

		// Ambil data untuk rollback stok
		var productID string
		var qty int
		err := db.QueryRow("SELECT product_id, quantity FROM products_in WHERE id = ?", id).Scan(&productID, &qty)
		if err != nil {
			http.Error(w, "Data tidak ditemukan", http.StatusNotFound)
			return
		}

		// Hapus dari tabel
		_, err = db.Exec("DELETE FROM products_in WHERE id = ?", id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Rollback stok
		_, _ = db.Exec("UPDATE products SET stock = stock - ? WHERE id = ?", qty, productID)

		json.NewEncoder(w).Encode(map[string]string{
			"message": "Data berhasil dihapus",
		})
	}
}
