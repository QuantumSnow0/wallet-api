import express, { json } from "express";
import "dotenv/config"
import { sql } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js"
const PORT = process.env.PORT || 5001
const app = express()
app.use(rateLimiter)
app.use("/api/transactions", transactionsRoute)
app.use(express.json())
async function initDB() {
try {
    await sql`
    CREATE TABLE IF NOT EXISTS transactions(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    category VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE

    )
    `
    console.log("database initialised successfully");    
} catch (error) {
    console.log("error initialising database:", error);
    process.exit(1)
}
}

initDB().then(() => {
    app.listen(PORT, () => console.log(`listening to http://localhost:${PORT}`))
})