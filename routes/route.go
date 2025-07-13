package routes

import (
	"database/sql"
	"net/http"

	"github.com/arirahman2323/managment-sip/handler/auth"
	"github.com/arirahman2323/managment-sip/handler/dashboard"
	"github.com/arirahman2323/managment-sip/handler/middleware"
	"github.com/arirahman2323/managment-sip/handler/user"
)

func SetupRoutes(mux *http.ServeMux, db *sql.DB) {
	mux.HandleFunc("/api/users", user.UsersHandler(db))
	mux.HandleFunc("/api/login", auth.HandleLogin(db))

	mux.Handle("/api/dashboard", middleware.JWTAuth(dashboard.Handler("inject-database-if-needed")))

}
