package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/arirahman2323/managment-sip/db"
	"github.com/arirahman2323/managment-sip/routes"

	_ "modernc.org/sqlite"

	"github.com/rs/cors"
)

func main() {
	database := db.Connect()
	defer database.Close()

	db.Migrate(database)

	mux := http.NewServeMux()
	routes.SetupRoutes(mux, database)

	handler := cors.Default().Handler(mux)

	fmt.Println("Server running at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
