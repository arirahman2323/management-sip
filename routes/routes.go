package routes

import (
	"database/sql"
	"net/http"

	"github.com/gorilla/mux"

	"github.com/arirahman2323/managment-sip/handler/auth"
	"github.com/arirahman2323/managment-sip/handler/dashboard"
	dbmigrate "github.com/arirahman2323/managment-sip/handler/db-migrate"
	"github.com/arirahman2323/managment-sip/handler/itemType"
	"github.com/arirahman2323/managment-sip/handler/middleware"
	"github.com/arirahman2323/managment-sip/handler/unitType"
	"github.com/arirahman2323/managment-sip/handler/user"
)

func SetupRoutes(db *sql.DB) http.Handler {
	router := mux.NewRouter()

	// Public routes
	router.HandleFunc("/api/login", auth.HandleLogin(db)).Methods("POST")
	router.HandleFunc("/api/users", user.UsersHandler(db)).Methods("GET", "POST")

	// Migration route
	router.HandleFunc("/api/db-migrate", dbmigrate.Handler(db)).Methods("POST")

	// Protected routes (JWT required)
	protected := router.PathPrefix("/api").Subrouter()
	protected.Use(middleware.JWTAuth)

	protected.HandleFunc("/dashboard", dashboard.DashboardHandler(db)).Methods("GET")

	// Item types CRUD
	protected.HandleFunc("/item-types", itemType.GetAllItemTypes(db)).Methods("GET")
	protected.HandleFunc("/item-types", itemType.CreateItemType(db)).Methods("POST")
	protected.HandleFunc("/item-types/{id}", itemType.UpdateItemType(db)).Methods("PUT")
	protected.HandleFunc("/item-types/{id}", itemType.DeleteItemType(db)).Methods("DELETE")

	// Unit types CRUD
	protected.HandleFunc("/unit-types", unitType.GetAllUnitTypes(db)).Methods("GET")
	protected.HandleFunc("/unit-types", unitType.CreateUnitType(db)).Methods("POST")
	protected.HandleFunc("/unit-types/{id}", unitType.UpdateUnitType(db)).Methods("PUT")
	protected.HandleFunc("/unit-types/{id}", unitType.DeleteUnitType(db)).Methods("DELETE")

	return router
}
