package lowproductnotif

import (
	"database/sql"

	"github.com/arirahman2323/managment-sip/model"
)

func GetLowStockProducts(db *sql.DB) ([]model.Product, error) {
	rows, err := db.Query(`
		SELECT 
			p.id,
			p.name,
			p.stock,
			p.min_stock
		FROM products p
		WHERE p.stock <= p.min_stock
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var lowStockProducts []model.Product
	for rows.Next() {
		var p model.Product
		if err := rows.Scan(&p.ID, &p.Name, &p.Stock, &p.MinStock); err != nil {
			return nil, err
		}
		lowStockProducts = append(lowStockProducts, p)
	}
	return lowStockProducts, nil
}
