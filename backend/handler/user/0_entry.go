package user

import (
	"database/sql"
	"net/http"
)

func UsersHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case "GET":
			getUsers(w, db)
		case "POST":
			createUser(w, r, db)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	}
}
