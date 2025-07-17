package unitType

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
)

func CreateUnitType(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var input struct {
			Name string `json:"name"`
		}

		// Decode body
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, "Invalid JSON", http.StatusBadRequest)
			return
		}

		if input.Name == "" {
			http.Error(w, "Name is required", http.StatusBadRequest)
			return
		}

		// 🔢 Ambil jumlah data sekarang untuk bikin ID baru
		var count int
		err := db.QueryRow("SELECT COUNT(*) FROM unit_types").Scan(&count)
		if err != nil {
			http.Error(w, "Failed to count records", http.StatusInternalServerError)
			return
		}

		newID := fmt.Sprintf("UNT-%03d", count+1)

		// Insert ke DB
		_, err = db.Exec("INSERT INTO unit_types(id, name) VALUES (?, ?)", newID, input.Name)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Response
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "unit type created successfully",
			"data": map[string]string{
				"id":   newID,
				"name": input.Name,
			},
		})
	}
}
