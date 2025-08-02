package product

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/arirahman2323/managment-sip/model"
)

func GetAllProducts(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rows, err := db.Query(`
			SELECT 
				p.id, 
				p.sku, 
				p.name,
				p.item_id, 
				it.name AS item_name,
				p.unit_id, 
				ut.name AS unit_name,
				p.price, 
				p.price_sell, 
				p.profit_amount,
				p.min_stock,
				p.stock,
				p.created_at,
				p.updated_at
			FROM products p
			LEFT JOIN item_types it ON p.item_id = it.id
			LEFT JOIN unit_types ut ON p.unit_id = ut.id
		`)
		if err != nil {
			http.Error(w, "Query error: "+err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var products []model.Product
		for rows.Next() {
			var p model.Product
			err := rows.Scan(
				&p.ID,
				&p.Sku,
				&p.Name,
				&p.ItemID,
				&p.ItemName,
				&p.UnitID,
				&p.UnitName,
				&p.Price,
				&p.PriceSell,
				&p.ProfitAmount,
				&p.MinStock,
				&p.Stock,
				&p.CreatedAt,
				&p.UpdatedAt,
			)
			if err != nil {
				http.Error(w, "Scan error: "+err.Error(), http.StatusInternalServerError)
				return
			}

			if p.ItemName == "" {
				http.Error(w, fmt.Sprintf("Item ID '%s' tidak ditemukan di tabel item_types", p.ItemID), http.StatusBadRequest)
				return
			}
			if p.UnitName == "" {
				http.Error(w, fmt.Sprintf("Unit ID '%s' tidak ditemukan di tabel unit_types", p.UnitID), http.StatusBadRequest)
				return
			}

			products = append(products, p)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"data":    products,
			"message": "Berhasil mengambil data produk",
		})
	}
}
