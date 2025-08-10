package productOutReport

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"github.com/arirahman2323/managment-sip/handler/report"
	"github.com/arirahman2323/managment-sip/utils"
)

func GetProductOutReport(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		startRaw := r.URL.Query().Get("start") // YYYY-MM-DD
		endRaw := r.URL.Query().Get("end")     // YYYY-MM-DD

		start, err := utils.ParseDate(startRaw)
		if err != nil {
			http.Error(w, "Invalid start: "+err.Error(), http.StatusBadRequest)
			return
		}
		end, err := utils.ParseDate(endRaw)
		if err != nil {
			http.Error(w, "Invalid end: "+err.Error(), http.StatusBadRequest)
			return
		}

		// Pagination (default)
		page := utils.ToIntDefault(r.URL.Query().Get("page"), 1)
		limit := utils.ToIntDefault(r.URL.Query().Get("limit"), 50)
		if limit <= 0 || limit > 500 {
			limit = 50
		}
		offset := (page - 1) * limit

		// Sorting whitelist
		sortBy := r.URL.Query().Get("sort_by")
		if sortBy == "" {
			sortBy = "p.created_at"
		}
		if !utils.InStringSet(sortBy, "p.created_at", "p.name", "p.sku", "p.stock") {
			sortBy = "p.created_at"
		}
		sortDir := strings.ToUpper(r.URL.Query().Get("sort_dir"))
		if sortDir != "ASC" && sortDir != "DESC" {
			sortDir = "DESC"
		}

		// Build query
		var sb strings.Builder
		sb.WriteString(`
			SELECT 
				pin.product_id,
				pin.quantity,
				pin.created_at,
				COALESCE(p.name, '') AS product_name
			FROM products_out pin
			LEFT JOIN products p ON pin.product_id = p.id
		`)

		var where []string
		var args []any

		// filter tanggal opsional (pakai created_at full datetime)
		if !start.IsZero() && !end.IsZero() {
			end = end.Add(24 * time.Hour) // cover sampai akhir hari
			where = append(where, `pin.created_at >= ? AND pin.created_at < ?`)
			args = append(args, start.Format("2006-01-02"), end.Format("2006-01-02"))
		} else if !start.IsZero() {
			where = append(where, `pin.created_at >= ?`)
			args = append(args, start.Format("2006-01-02"))
		} else if !end.IsZero() {
			end = end.Add(24 * time.Hour)
			where = append(where, `pin.created_at < ?`)
			args = append(args, end.Format("2006-01-02"))
		}

		if len(where) > 0 {
			sb.WriteString(" WHERE ")
			sb.WriteString(strings.Join(where, " AND "))
		}
		// Order + pagination
		sb.WriteString(" ORDER BY ")
		sb.WriteString(sortBy)
		sb.WriteString(" ")
		sb.WriteString(sortDir)
		sb.WriteString(" LIMIT ? OFFSET ?")
		args = append(args, limit, offset)

		rows, err := db.Query(sb.String(), args...)
		if err != nil {
			http.Error(w, "Query error: "+err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var pinItems []report.InventoryReportProductOut
		for rows.Next() {
			var it report.InventoryReportProductOut
			if err := rows.Scan(
				&it.ProductID,
				&it.Quantity,
				&it.CreatedAt,
				&it.ProductName,
			); err != nil {
				http.Error(w, "Scan error: "+err.Error(), http.StatusInternalServerError)
				return
			}
			pinItems = append(pinItems, it)
		}
		if err := rows.Err(); err != nil {
			http.Error(w, "Rows error: "+err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(pinItems)
	}
}
