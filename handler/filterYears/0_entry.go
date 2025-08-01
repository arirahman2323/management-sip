package filteryears

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"
)

func GetFilterYearsHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		yearStr := r.URL.Query().Get("year")
		year, err := strconv.Atoi(yearStr)
		if err != nil {
			http.Error(w, "Invalid or missing year", http.StatusBadRequest)
			return
		}

		// Query total products in
		productInMonthly, productInTotal, err := QueryProductByYear(db, "products_in", year)
		if err != nil {
			http.Error(w, "Error querying products_in: "+err.Error(), http.StatusInternalServerError)
			return
		}

		// Query total products out
		productOutMonthly, productOutTotal, err := QueryProductByYear(db, "products_out", year)
		if err != nil {
			http.Error(w, "Error querying products_out: "+err.Error(), http.StatusInternalServerError)
			return
		}

		// Query profit & transaction summary
		profitSummary, err := QueryProfitSummary(db, year)
		if err != nil {
			http.Error(w, "Error querying profit summary: "+err.Error(), http.StatusInternalServerError)
			return
		}

		response := map[string]interface{}{
			"product_in": map[string]interface{}{
				"monthly":      productInMonthly,
				"yearly_total": productInTotal,
			},
			"product_out": map[string]interface{}{
				"monthly":      productOutMonthly,
				"yearly_total": productOutTotal,
			},
			"summary": map[string]interface{}{
				"total_profit":      profitSummary.TotalProfit,
				"total_transaction": profitSummary.TotalTransaction,
			},
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}
