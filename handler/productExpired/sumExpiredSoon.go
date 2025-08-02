package productexpired

import (
	"database/sql"
	"time"
)

func GetExpiringSoon(db *sql.DB) ([]ExpiredProduct, error) {
	query := `
		SELECT 
			pi.product_id,
			p.name,
			pi.quantity,
			pi.supplier,
			pi.updated_at,
			pi.expired_date
		FROM products_in pi
		JOIN products p ON pi.product_id = p.id
		WHERE pi.expired_date IS NOT NULL
	`

	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var results []ExpiredProduct
	now := time.Now()

	for rows.Next() {
		var (
			productID   string
			productName string
			quantity    int
			supplier    string
			updatedAt   string
			expiredDate string
		)

		if err := rows.Scan(&productID, &productName, &quantity, &supplier, &updatedAt, &expiredDate); err != nil {
			return nil, err
		}

		expiredTime, err := time.Parse("2006-01-02", expiredDate)
		if err != nil {
			continue // skip invalid date
		}

		daysLeft := int(expiredTime.Sub(now).Hours() / 24)
		if daysLeft <= 7 {
			results = append(results, ExpiredProduct{
				ProductID:   productID,
				ProductName: productName,
				Quantity:    quantity,
				Supplier:    supplier,
				UpdatedAt:   updatedAt,
				ExpiredDate: expiredDate,
				Message:     "akan kedaluarsa",
			})
		}
	}

	return results, nil
}
