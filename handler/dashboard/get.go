package dashboard

import (
	"encoding/json"
	"net/http"

	"github.com/arirahman2323/managment-sip/handler/middleware"
)

type Response struct {
	Message string      `json:"message"`
	UserID  interface{} `json:"user_id"`
	Note    string      `json:"note"`
}

func Handler(dbDependency string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := r.Context().Value(middleware.UserIDKey)

		response := Response{
			Message: "Welcome to the dashboard!",
			UserID:  userID,
			Note:    "Kamu berhasil login dan token valid 🎉",
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}
