package productout

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

func DeleteProductOut(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id := vars["id"]
		if id == "" {
			http.Error(w, "Missing id parameter", http.StatusBadRequest)
			return
		}

		// Ambil product_id dan quantity sebelum delete
		var productID string
		var quantity int
		err := db.QueryRow("SELECT product_id, quantity FROM products_out WHERE id = ?", id).Scan(&productID, &quantity)
		if err != nil {
			http.Error(w, "Data not found", http.StatusNotFound)
			return
		}

		// Hapus dari tabel products_out
		_, err = db.Exec("DELETE FROM products_out WHERE id = ?", id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Revert stok produk
		_, _ = db.Exec("UPDATE products SET stock = stock + ? WHERE id = ?", quantity, productID)

		json.NewEncoder(w).Encode(map[string]any{
			"message": "Product out berhasil dihapus",
		})
	}
}
