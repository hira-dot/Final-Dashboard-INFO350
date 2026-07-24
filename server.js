// import Express and path
const express = require("express");
const path = require("path");

// create the Express application
const app = express();

// use the deployment port or port 3000 locally
const PORT = process.env.PORT || 3000;

// read a message from the environment
const APP_MESSAGE =
    process.env.APP_MESSAGE || "Welcome to Hira's Dashboard API!";

// temporary activity data
let items = [
    {
        id: 1,
        activity: "Finished AWS Certification",
        date: "2025-07-01"
    },
    {
        id: 2,
        activity: "Completed Capstone Project",
        date: "2025-07-02"
    }
];

// allow Express to read JSON request bodies
app.use(express.json());

// log each request
app.use(function(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
});

// serve the front-end files
app.use(express.static(path.join(__dirname, "public")));

// GET endpoint returns all items
app.get("/api/items", function(req, res) {
    res.json({
        message: APP_MESSAGE,
        items: items
    });
});

// POST endpoint adds a new item
app.post("/api/items", function(req, res) {
    const activity = req.body.activity;
    const date = req.body.date;

    // validate submitted data
    if (!activity || !date) {
        return res.status(400).json({
            error: "Activity and date are required."
        });
    }

    const newItem = {
        id: items.length + 1,
        activity: activity,
        date: date
    };

    items.push(newItem);

    res.status(201).json({
        message: "Activity saved successfully!",
        item: newItem
    });
});

// start the server
app.listen(PORT, function() {
    console.log(`Server is running on http://localhost:${PORT}`);
});