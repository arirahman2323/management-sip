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

		productInMonthly, productInTotal, err := QueryProductByYear(db, "products_in", year)
		if err != nil {
			http.Error(w, "Error querying products_in: "+err.Error(), http.StatusInternalServerError)
			return
		}

		productOutMonthly, productOutTotal, err := QueryProductByYear(db, "products_out", year)
		if err != nil {
			http.Error(w, "Error querying products_out: "+err.Error(), http.StatusInternalServerError)
			return
		}

		profitSummary, err := QueryProfitSummary(db, year)
		if err != nil {
			http.Error(w, "Error querying profit summary: "+err.Error(), http.StatusInternalServerError)
			return
		}

		totalAll, err := QueryTotalStockAll(db)
		if err != nil {
			http.Error(w, "Error querying total stock: "+err.Error(), http.StatusInternalServerError)
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
			"total_stock_all": totalAll.TotalStock,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}
