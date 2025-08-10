package inventoryreport

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"github.com/arirahman2323/managment-sip/handler/report"
	"github.com/arirahman2323/managment-sip/utils"
)

func GetInventoryReport(db *sql.DB) http.HandlerFunc {
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
				p.id,
				p.sku,
				p.name,
				p.item_id,
				COALESCE(it.name, '') AS item_name,
				p.unit_id,
				COALESCE(ut.name, '') AS unit_name,
				p.price,
				p.price_sell,
				p.profit_amount,
				p.min_stock,
				p.stock,
				p.created_at,
				p.updated_at,
				COALESCE(SUM(pi.quantity), 0) AS quantity_in,
				COALESCE(SUM(po.quantity), 0) AS quantity_out
			FROM products p
			LEFT JOIN item_types it ON p.item_id = it.id
			LEFT JOIN unit_types ut ON p.unit_id = ut.id
			LEFT JOIN products_in pi ON pi.product_id = p.id
			LEFT JOIN products_out po ON po.product_id = p.id
		`)

		var where []string
		var args []any

		// filter tanggal opsional (pakai created_at full datetime)
		if !start.IsZero() && !end.IsZero() {
			end = end.Add(24 * time.Hour) // cover sampai akhir hari
			where = append(where, `p.created_at >= ? AND p.created_at < ?`)
			args = append(args, start.Format("2006-01-02"), end.Format("2006-01-02"))
		} else if !start.IsZero() {
			where = append(where, `p.created_at >= ?`)
			args = append(args, start.Format("2006-01-02"))
		} else if !end.IsZero() {
			end = end.Add(24 * time.Hour)
			where = append(where, `p.created_at < ?`)
			args = append(args, end.Format("2006-01-02"))
		}

		if len(where) > 0 {
			sb.WriteString(" WHERE ")
			sb.WriteString(strings.Join(where, " AND "))
		}
		sb.WriteString(`
			GROUP BY 
				p.id,
				p.sku,
				p.name,
				p.item_id,
				it.name,
				p.unit_id,
				ut.name,
				p.price,
				p.price_sell,
				p.profit_amount,
				p.min_stock,
				p.stock,
				p.created_at,
				p.updated_at
		`)
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

		var items []report.InventoryReportItem
		for rows.Next() {
			var it report.InventoryReportItem
			if err := rows.Scan(
				&it.ID,
				&it.Sku,
				&it.Name,
				&it.ItemID,
				&it.ItemName,
				&it.UnitID,
				&it.UnitName,
				&it.Price,
				&it.PriceSell,
				&it.ProfitAmount,
				&it.MinStock,
				&it.Stock,
				&it.CreatedAt,
				&it.UpdatedAt,
				&it.QuantityIn,
				&it.QuantityOut,
			); err != nil {
				http.Error(w, "Scan error: "+err.Error(), http.StatusInternalServerError)
				return
			}
			items = append(items, it)
		}
		if err := rows.Err(); err != nil {
			http.Error(w, "Rows error: "+err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(items)
	}
}
