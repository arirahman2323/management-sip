package productIn

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/arirahman2323/managment-sip/model"
)

func GetAllProductsIn(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rows, err := db.Query(`SELECT id, product_id, quantity, supplier, note, received_by, expired_date, created_at, updated_at FROM products_in`)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var list []model.ProductIn
		for rows.Next() {
			var p model.ProductIn
			err := rows.Scan(&p.ID, &p.ProductID, &p.Quantity, &p.Supplier, &p.Note, &p.ReceivedBy, &p.ExpiredDate, &p.CreatedAt, &p.UpdatedAt)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			list = append(list, p)
		}

		json.NewEncoder(w).Encode(list)
	}
}
