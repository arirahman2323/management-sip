package filteryears

import (
	"database/sql"
)

func QueryTotalStockAll(db *sql.DB) (TotalStockAll, error) {
	query := `
		SELECT 
			COALESCE(SUM(quantity), 0) as total_stock
		FROM products_in
	`
	var total TotalStockAll
	err := db.QueryRow(query).Scan(&total.TotalStock)
	if err != nil {
		return total, err
	}

	return total, nil
}
