package dbmigrate

import (
	"database/sql"
	"net/http"

	"github.com/arirahman2323/managment-sip/db"
)

func Handler(dbConn *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		db.Migrate(dbConn)

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"message": "Migration completed successfully"}`))
	}
}
