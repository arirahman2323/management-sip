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
			http.Error(w, "Error retrieving expired products: "+err.Error(), http.StatusInternalServerError)
			return
		}

		if err := GetExpiredStatus(db); err != nil {
			log.Println("Error updating expired status:", err)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"data": data,
		})
	}
}
