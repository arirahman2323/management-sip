package productout

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/arirahman2323/managment-sip/model"
)

func GetAllProductsOut(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rows, err := db.Query(`SELECT id, product_id, quantity, supplier, note, received_by, expired_date, created_at, updated_at FROM products_out`)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var list []model.ProductOut
		for rows.Next() {
			var p model.ProductOut
			err := rows.Scan(&p.ID, &p.ProductID, &p.Quantity, &p.Note, &p.ReceivedBy, &p.CreatedAt, &p.UpdatedAt)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			list = append(list, p)
		}

		json.NewEncoder(w).Encode(list)

	}
}
