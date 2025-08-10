package unitType

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/arirahman2323/managment-sip/model"
)

func GetAllUnitTypes(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rows, err := db.Query("SELECT id, name FROM unit_types")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var units []model.UnitType
		for rows.Next() {
			var unit model.UnitType
			if err := rows.Scan(&unit.ID, &unit.Name); err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			units = append(units, unit)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "List of unit types",
			"data":    units,
		})
	}
}
