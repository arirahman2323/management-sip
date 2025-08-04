package auth

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"os"
	"time"

	lowproductnotif "github.com/arirahman2323/managment-sip/handler/lowProductNotif"
	productexpired "github.com/arirahman2323/managment-sip/handler/productExpired"
	"github.com/arirahman2323/managment-sip/model"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var jwtSecret = []byte(os.Getenv("JWT_SECRET")) // ganti di production ya

type LoginResponse struct {
	Message          string                       `json:"message"`
	Token            string                       `json:"token"`
	User             model.User                   `json:"user"`
	LowStockProducts []model.Product              `json:"lowStockProducts"`
	ExpiringSoon     []productexpired.ExpiredSoon `json:"expiringSoon"` // Ganti sesuai return GetExpiringSoon
}

func HandleLogin(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var input struct {
			Email    string `json:"email"`
			Password string `json:"password"`
		}
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, "Invalid JSON format", http.StatusBadRequest)
			return
		}

		var user model.User
		err := db.QueryRow("SELECT id, name, email, password FROM users WHERE email = ?", input.Email).
			Scan(&user.ID, &user.Name, &user.Email, &user.Password)
		if err != nil {
			http.Error(w, "Email not found", http.StatusUnauthorized)
			return
		}

		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
			http.Error(w, "Invalid credentials", http.StatusUnauthorized)
			return
		}

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"user_id": user.ID,
			"email":   user.Email,
			"exp":     time.Now().Add(2 * time.Hour).Unix(),
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

		expiringSoon, err := productexpired.GetExpiringSoon(db)
		if err != nil {
			http.Error(w, "Error retrieving expiring products: "+err.Error(), http.StatusInternalServerError)
			return
		}

		user.Password = "" // aman dari expose
		response := LoginResponse{
			Message:          "Login success",
			Token:            tokenString,
			User:             user,
			LowStockProducts: lowStockProducts,
			ExpiringSoon:     expiringSoon,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}
