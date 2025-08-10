package main

import (
	"fmt"
	"log"
	"net/http"
	"os/exec"
	"runtime"

	"github.com/arirahman2323/managment-sip/db"
	"github.com/arirahman2323/managment-sip/handler/middleware"
	"github.com/arirahman2323/managment-sip/routes"
	"github.com/joho/godotenv"
	_ "modernc.org/sqlite"
)

func openBrowser(url string) {
	var err error
	switch runtime.GOOS {
	case "windows":
		err = exec.Command("rundll32", "url.dll,FileProtocolHandler", url).Start()
	case "linux":
		err = exec.Command("xdg-open", url).Start()
	case "darwin":
		err = exec.Command("open", url).Start()
	}
	if err != nil {
		log.Println("Gagal buka browser:", err)
	}
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	database := db.Connect()
	defer database.Close()

	// Setup router API
	apiRouter := routes.SetupRoutes(database)

	// Bungkus API router dengan middleware CORS
	apiHandler := middleware.CORSMiddleware(apiRouter)

	// Gabungkan API router & static file handler
	router := http.NewServeMux()

	// API handler
	router.Handle("/api/", apiHandler)

	// Static files handler untuk frontend
	frontendPath := "./frontend"
	fs := http.FileServer(http.Dir(frontendPath))
	router.Handle("/", fs)

	// Jalankan server
	go openBrowser("http://localhost:8080")
	fmt.Println("Server running at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", router))
}
