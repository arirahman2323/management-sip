package routes

import (
	"database/sql"
	"net/http"

	"github.com/arirahman2323/managment-sip/handler/auth"
	"github.com/arirahman2323/managment-sip/handler/user"
)

func SetupRoutes(mux *http.ServeMux, db *sql.DB) {
	mux.HandleFunc("/api/users", user.UsersHandler(db))
	mux.HandleFunc("/api/login", auth.HandleLogin(db))
	// tambahkan route lainnya di sini
}
