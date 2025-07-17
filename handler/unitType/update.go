package unitType

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/arirahman2323/managment-sip/model"
	"github.com/gorilla/mux"
)

func UpdateUnitType(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var unit model.UnitType

		if err := json.NewDecoder(r.Body).Decode(&unit); err != nil {
			http.Error(w, "Invalid JSON", http.StatusBadRequest)
			return
		}

		params := mux.Vars(r)
		id := params["id"]
		if id == "" {
			http.Error(w, "Missing ID in URL", http.StatusBadRequest)
			return
		}

		_, err := db.Exec("UPDATE unit_types SET name = ? WHERE id = ?", unit.Name, id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		unit.ID = id
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "unit type updated successfully",
			"data":    unit,
		})
	}
}
