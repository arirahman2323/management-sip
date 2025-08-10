package itemType

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/arirahman2323/managment-sip/model"
	"github.com/gorilla/mux"
)

func UpdateItemType(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var item model.ItemType

		if err := json.NewDecoder(r.Body).Decode(&item); err != nil {
			http.Error(w, "Invalid JSON", http.StatusBadRequest)
			return
		}

		params := mux.Vars(r)
		id := params["id"]
		if id == "" {
			http.Error(w, "Missing ID in URL", http.StatusBadRequest)
			return
		}

		_, err := db.Exec("UPDATE item_types SET name = ? WHERE id = ?", item.Name, id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		item.ID = id
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "Item type updated successfully",
			"data":    item,
		})
	}
}
