package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/arirahman2323/managment-sip/db"
	"github.com/arirahman2323/managment-sip/routes"
	"github.com/joho/godotenv"

	"github.com/rs/cors"
	_ "modernc.org/sqlite"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	database := db.Connect()
	defer database.Close()

	//db.Migrate(database)

	// ✅ Gunakan router hasil dari SetupRoutes
	router := routes.SetupRoutes(database)

	handler := cors.Default().Handler(router)

	fmt.Println("Server running at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
