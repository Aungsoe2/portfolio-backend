const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const app = express();
app.use(cors({
    origin: [
        "https://aungsoe2.github.io",
        "http://localhost:8000"
    ]
}));
app.use(express.json());
app.post("/contact", async function (req, res) {
    const { name, email, message } = req.body;

    try {
        const { data, error } = await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: process.env.EMAIL_USER,
            subject: "New Portfolio Contact Message",
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        });

        if (error) {
            console.error(error);
            return res.status(500).json({
                message: "Failed to send message."
            });
        }

        res.json({
            message: "Message sent successfully!"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to send message."
        });
    }
});
app.get("/", function (req, res) {
    res.send("Portfolio backend is running!");
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log("Server is running on port " + PORT);
});
