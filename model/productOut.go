package model

type ProductOut struct {
	ID         string `json:"id"`
	ProductID  string `json:"product_id"`
	Quantity   int    `json:"quantity"`
	Note       string `json:"note"`
	ReceivedBy string `json:"received_by"`
	CreatedAt  string `json:"created_at"`
	UpdatedAt  string `json:"updated_at"`
}
