const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const app = express();
app.use(cors({
    origin: "https://aungsoe2.github.io"
}));
app.use(express.json());
app.post("/contact", async function (req, res) {
    const { name, email, message } = req.body;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "New Portfolio Contact Message",
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        });

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
