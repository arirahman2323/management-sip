package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/arirahman2323/managment-sip/db"
	"github.com/arirahman2323/managment-sip/handler/middleware"
	"github.com/arirahman2323/managment-sip/routes"
	"github.com/joho/godotenv"
	_ "modernc.org/sqlite"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	database := db.Connect()
	defer database.Close()

	router := routes.SetupRoutes(database)

	// 🔥 Bungkus router dengan middleware CORS buatanmu
	handler := middleware.CORSMiddleware(router)

	fmt.Println("Server running at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
