package report

type InventoryReportItem struct {
	ID           string  `json:"id"`
	Sku          string  `json:"sku"`
	Name         string  `json:"name"`
	ItemID       string  `json:"item_id"`
	ItemName     string  `json:"item_name"`
	UnitID       string  `json:"unit_id"`
	UnitName     string  `json:"unit_name"`
	Price        float64 `json:"price"`
	PriceSell    float64 `json:"price_sell"`
	ProfitAmount float64 `json:"profit_amount"`
	MinStock     int     `json:"min_stock"`
	Stock        int     `json:"stock"`
	CreatedAt    string  `json:"created_at"`
	UpdatedAt    string  `json:"updated_at"`
	QuantityIn   int     `json:"quantity_in"`
	QuantityOut  int     `json:"quantity_out"`
}

type InventoryReportProductIn struct {
	ProductID   string `json:"product_id"`
	Quantity    int    `json:"quantity"`
	CreatedAt   string `json:"created_at"`
	ProductName string `json:"product_name"`
	ExpiredDate string `json:"expired_date"`
}

type InventoryReportProductOut struct {
	ProductID   string `json:"product_id"`
	Quantity    int    `json:"quantity"`
	CreatedAt   string `json:"created_at"`
	ProductName string `json:"product_name"`
}
