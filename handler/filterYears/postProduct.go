package filteryears

import (
	"database/sql"
	"net/http"
)

func GetFilterYears(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

	}
}
