package auth

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"os"
	"time"

	lowproductnotif "github.com/arirahman2323/managment-sip/handler/lowProductNotif"
	"github.com/arirahman2323/managment-sip/model"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var jwtSecret = []byte(os.Getenv("JWT_SECRET")) // ganti di production ya

func HandleLogin(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Decode JSON input
		var input struct {
			Email    string `json:"email"`
			Password string `json:"password"`
		}
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, "Invalid JSON format", http.StatusBadRequest)
			return
		}

		// Ambil user dari DB
		var user model.User
		err := db.QueryRow("SELECT id, name, email, password FROM users WHERE email = ?", input.Email).
			Scan(&user.ID, &user.Name, &user.Email, &user.Password)
		if err != nil {
			http.Error(w, "Email not found", http.StatusUnauthorized)
			return
		}

		// Bandingkan password hash
		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
			http.Error(w, "Invalid credentials", http.StatusUnauthorized)
			return
		}

		// Buat token JWT
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"user_id": user.ID,
			"email":   user.Email,
			"exp":     time.Now().Add(2 * time.Hour).Unix(), // Token berlaku 2 jam
		})

		tokenString, err := token.SignedString(jwtSecret)
		if err != nil {
			http.Error(w, "Failed to generate token", http.StatusInternalServerError)
			return
		}

		lowStockProducts, err := lowproductnotif.GetLowStockProducts(db)
		if err != nil {
			http.Error(w, "Gagal cek stok minimal: "+err.Error(), http.StatusInternalServerError)
			return
		}
		// Kirim response
		user.Password = "" // jangan kirim hash ke frontend
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message":          "Login success",
			"user":             user,
			"token":            tokenString,
			"lowStockProducts": lowStockProducts,
		})
	}
}
