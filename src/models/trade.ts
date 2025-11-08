export interface Trade {
    id: number,
    user_id: number,
    market_id: number,
    outcome: string,
    shares: number,
    price: number
}