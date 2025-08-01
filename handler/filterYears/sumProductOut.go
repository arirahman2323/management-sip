package filteryears

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"
)

func SumProductOut(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		yearStr := r.URL.Query().Get("year")
		year, err := strconv.Atoi(yearStr)
		if err != nil {
			http.Error(w, "Invalid or missing year", http.StatusBadRequest)
			return
		}

		monthly, total, err := QueryProductByYear(db, "products_out", year)
		if err != nil {
			http.Error(w, "Database error: "+err.Error(), http.StatusInternalServerError)
			return
		}

		response := map[string]interface{}{
			"monthly":      monthly,
			"yearly_total": total,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}
