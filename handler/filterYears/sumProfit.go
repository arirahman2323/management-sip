package filteryears

import (
	"database/sql"
	"strconv"
)

func QueryProfitSummary(db *sql.DB, year int) (ProfitSummary, error) {
	query := `
		SELECT 
			p.id AS product_id,
			IFNULL(SUM(po.quantity), 0) AS total_quantity,
			p.price_sell AS sell_price,
			p.profit_amount
		FROM products_out po
		JOIN products p ON p.id = po.product_id
		WHERE strftime('%Y', po.updated_at) = ?
		GROUP BY p.id, p.price_sell, p.profit_amount
	`

	rows, err := db.Query(query, strconv.Itoa(year))
	if err != nil {
		return ProfitSummary{}, err
	}
	defer rows.Close()

	var summary ProfitSummary

	for rows.Next() {
		var (
			productID    string
			quantity     int
			sellPrice    float64
			profitAmount float64
		)

		if err := rows.Scan(&productID, &quantity, &sellPrice, &profitAmount); err != nil {
			return summary, err
		}

		profit := profitAmount * float64(quantity)
		transaction := sellPrice * float64(quantity)

		summary.TotalProfit += profit
		summary.TotalTransaction += transaction
	}

	return summary, nil
}
