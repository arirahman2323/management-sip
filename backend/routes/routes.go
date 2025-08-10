package routes

import (
	"database/sql"
	"net/http"

	"github.com/gorilla/mux"

	"github.com/arirahman2323/managment-sip/handler/auth"
	"github.com/arirahman2323/managment-sip/handler/dashboard"
	dbmigrate "github.com/arirahman2323/managment-sip/handler/db-migrate"
	filteryears "github.com/arirahman2323/managment-sip/handler/filterYears"
	"github.com/arirahman2323/managment-sip/handler/itemType"
	"github.com/arirahman2323/managment-sip/handler/middleware"
	"github.com/arirahman2323/managment-sip/handler/product"
	productexpired "github.com/arirahman2323/managment-sip/handler/productExpired"
	"github.com/arirahman2323/managment-sip/handler/productIn"
	productout "github.com/arirahman2323/managment-sip/handler/productOut"
	inventoryreport "github.com/arirahman2323/managment-sip/handler/report/inventoryReport"
	"github.com/arirahman2323/managment-sip/handler/report/productInReport"
	"github.com/arirahman2323/managment-sip/handler/report/productOutReport"
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

	// Item types
	protected.HandleFunc("/item-types", itemType.GetAllItemTypes(db)).Methods("GET")
	protected.HandleFunc("/item-types", itemType.CreateItemType(db)).Methods("POST")
	protected.HandleFunc("/item-types/{id}", itemType.UpdateItemType(db)).Methods("PUT")
	protected.HandleFunc("/item-types/{id}", itemType.DeleteItemType(db)).Methods("DELETE")

	// Unit types
	protected.HandleFunc("/unit-types", unitType.GetAllUnitTypes(db)).Methods("GET")
	protected.HandleFunc("/unit-types", unitType.CreateUnitType(db)).Methods("POST")
	protected.HandleFunc("/unit-types/{id}", unitType.UpdateUnitType(db)).Methods("PUT")
	protected.HandleFunc("/unit-types/{id}", unitType.DeleteUnitType(db)).Methods("DELETE")

	// Product
	protected.HandleFunc("/product", product.GetAllProducts(db)).Methods("GET")
	protected.HandleFunc("/product", product.CreateProduct(db)).Methods("POST")
	protected.HandleFunc("/product/{id}", product.UpdateProduct(db)).Methods("PUT")
	protected.HandleFunc("/product/{id}", product.DeleteProduct(db)).Methods("DELETE")

	// Product In
	protected.HandleFunc("/product-in", productIn.GetAllProductsIn(db)).Methods("GET")
	protected.HandleFunc("/product-in", productIn.CreateProductIn(db)).Methods("POST")
	protected.HandleFunc("/product-in/{id}", productIn.UpdateProductIn(db)).Methods("PUT")
	protected.HandleFunc("/product-in/{id}", productIn.DeleteProductIn(db)).Methods("DELETE")

	// Product Out
	protected.HandleFunc("/product-out", productout.GetAllProductsOut(db)).Methods("GET")
	protected.HandleFunc("/product-out", productout.CreateProductOut(db)).Methods("POST")
	protected.HandleFunc("/product-out/{id}", productout.UpdateProductOut(db)).Methods("PUT")
	protected.HandleFunc("/product-out/{id}", productout.DeleteProductOut(db)).Methods("DELETE")

	// FilterYear
	protected.HandleFunc("/filter-years", filteryears.GetFilterYearsHandler(db)).Methods("GET")

	// Product Expired
	protected.HandleFunc("/product-expired", productexpired.GetProductExpired(db)).Methods("GET")

	// Reports
	protected.HandleFunc("/reports/stock", inventoryreport.GetInventoryReport(db)).Methods("GET")
	protected.HandleFunc("/reports/product-in", productInReport.GetProductInReport(db)).Methods("GET")
	protected.HandleFunc("/reports/product-out", productOutReport.GetProductOutReport(db)).Methods("GET")

	return router
}
