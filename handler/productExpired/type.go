package productexpired

type ExpiredProduct struct {
	ProductID   string `json:"product_id"`
	ProductName string `json:"product_name"`
	Quantity    int    `json:"quantity"`
	Supplier    string `json:"supplier"`
	UpdatedAt   string `json:"updated_at"`
	ExpiredDate string `json:"expired_date"`
	Message     string `json:"message"`
}
