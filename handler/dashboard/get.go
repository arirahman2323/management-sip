package dashboard

import (
	"encoding/json"
	"net/http"

	"github.com/arirahman2323/managment-sip/handler/middleware"
)

// Struktur response bisa kamu sesuaikan lagi untuk kebutuhan grafik/statistik dashboard
type DashboardData struct {
	TotalUsers     int         `json:"total_users"`
	TotalItems     int         `json:"total_items"`
	RecentActivity []string    `json:"recent_activity"`
	UserID         interface{} `json:"user_id"`
	Message        string      `json:"message"`
	Note           string      `json:"note"`
}

func DashboardHandler(db any) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := r.Context().Value(middleware.UserIDKey)

		// Simulasi statistik yang nanti bisa kamu ambil dari database
		data := DashboardData{
			TotalUsers:     12,
			TotalItems:     42,
			RecentActivity: []string{"Login Admin", "Tambah Barang", "Cetak Laporan"},
			UserID:         userID,
			Message:        "Welcome to the dashboard!",
			Note:           "Kamu berhasil login dan token valid 🎉",
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(data)
	}
}
