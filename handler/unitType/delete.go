package unitType

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

func DeleteUnitType(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		params := mux.Vars(r)
		id := params["id"]
		if id == "" {
			http.Error(w, "Missing ID", http.StatusBadRequest)
			return
		}

		_, err := db.Exec("DELETE FROM unit_types WHERE id = ?", id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{
			"message": "Unit type deleted successfully",
		})

	}
}
