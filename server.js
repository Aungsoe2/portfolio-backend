const express = require("express");

const app = express();
app.use(express.json());
app.post("/contact", function (req, res) {
    console.log(req.body);

    res.json({
        message: "Message received successfully!"
    });
});
app.get("/", function (req, res) {
    res.send("Portfolio backend is running!");
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log("Server is running on port " + PORT);
});
