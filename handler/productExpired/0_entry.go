package productexpired

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
)

func GetProductExpired(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		data, err := GetExpiringSoon(db)
		if err != nil {
			http.Error(w, "Error retrieving expiring products: "+err.Error(), http.StatusInternalServerError)
			return
		}

		expired, err := GetExpiredStatus(db)
		if err != nil {
			log.Println("Error updating expired status:", err)
			http.Error(w, "Error updating expired status: "+err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"expiring_soon": data,
			"expired":       expired,
		})
	}
}
