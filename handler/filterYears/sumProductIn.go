package filteryears

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

func GetFilterYears(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		yearStr := r.URL.Query().Get("year")
		if yearStr == "" {
			http.Error(w, "Missing year parameter", http.StatusBadRequest)
			return
		}

		year, err := strconv.Atoi(yearStr)
		if err != nil {
			http.Error(w, "Invalid year format", http.StatusBadRequest)
			return
		}

		query := `
			SELECT strftime('%m', updated_at) AS month, SUM(quantity) AS total_quantity
			FROM products_in
			WHERE strftime('%Y', updated_at) = ?
			GROUP BY month
			ORDER BY month;
		`
		rows, err := db.Query(query, fmt.Sprintf("%04d", year))
		if err != nil {
			http.Error(w, "Database query error: "+err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		type MonthlyQuantity struct {
			Month         string `json:"month"`          // "01", "02", ..., "12"
			TotalQuantity int    `json:"total_quantity"` // jumlah total quantity bulan itu
		}

		var results []MonthlyQuantity
		for rows.Next() {
			var m MonthlyQuantity
			if err := rows.Scan(&m.Month, &m.TotalQuantity); err != nil {
				http.Error(w, "Error scanning data", http.StatusInternalServerError)
				return
			}
			results = append(results, m)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(results)
	}
}
