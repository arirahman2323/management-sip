package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/arirahman2323/managment-sip/db"
	"github.com/arirahman2323/managment-sip/handler/user"

	_ "modernc.org/sqlite"

	"github.com/rs/cors"
)

func main() {
	database := db.Connect()
	defer database.Close()

	db.Migrate(database) // buat tabel

	mux := http.NewServeMux()

	mux.HandleFunc("/api/users", user.UsersHandler(database))

	handler := cors.Default().Handler(mux)
	fmt.Println("Server running at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
