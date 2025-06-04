const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const allPathRoutes = require("./routes/allPath");
const cartRoutes = require("./routes/cart");
const qrRoute = require("./payment");
require("dotenv").config();


const app = express();
app.use(cors());

// Constants
const PORT = process.env.PORT || 1729;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/royal";

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

// Routes
app.use("/api", routes);
app.use("/info", allPathRoutes);
app.use('/payment', qrRoute)
app.use('/cart', cartRoutes);

// main route
app.get("/", (req, res) => {
    res.send("Welcome to The Royal Mobiles!");
});

// Global error handler 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
