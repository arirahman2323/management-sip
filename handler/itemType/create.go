package itemType

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/arirahman2323/managment-sip/utils"
)

func CreateItemType(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var input struct {
			Name string `json:"name"`
		}

		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, "Invalid JSON", http.StatusBadRequest)
			return
		}

		if input.Name == "" {
			http.Error(w, "Name is required", http.StatusBadRequest)
			return
		}

		newID, err := utils.GenerateNewID(db, "item_types", "ITM")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		_, err = db.Exec("INSERT INTO item_types(id, name) VALUES (?, ?)", newID, input.Name)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "Item type created successfully",
			"data": map[string]string{
				"id":   newID,
				"name": input.Name,
			},
		})
	}
}
