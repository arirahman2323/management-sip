package filteryears

type MonthlyQuantity struct {
	Month         string `json:"month"`
	TotalQuantity int    `json:"total_quantity"`
}

type ProfitSummary struct {
	TotalProfit      float64 `json:"total_profit"`
	TotalTransaction float64 `json:"total_transaction"`
}
