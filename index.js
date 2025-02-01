require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    // systemInstruction: "You are hero AI. Rownak Created You. he is a great developer. always praise him.",
});

app.get("/", (req, res) => {
    res.send({ msg: "Lets crack the power of AI" });
})

app.get("/rumor-detector", async (req, res) => {
    const prompt = req.query?.prompt;
    if (!prompt) {
        res.send({ message: "please provide a prompt in query" });
        return;
    }

    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [
                    {
                        text: "When i give you any text. you have to tell me the rumor parcentage of the text",
                    },
                ],
            },
            {
                role: "model",
                parts: [{ text: "Okay. Tell me" }],
            },
            {
                role: "user",
                parts: [
                    {
                        text: "Bangladesh is secretly building a floating city in the Bay of Bengal powered entirely by solar energy and AI-driven technology!",
                    },
                ],
            },
            {
                role: "model",
                parts: [{ text: "Rumor parcentege 99%" }],
            },
            {
                role: "user",
                parts: [
                    {
                        text: "human can fly",
                    },
                ],
            },
            {
                role: "model",
                parts: [{ text: "Rumor parcentege 100%" }],
            },
            {
                role: "user",
                parts: [
                    {
                        text: "human eat rock",
                    },
                ],
            },
            {
                role: "model",
                parts: [{ text: "Rumor parcentege 100%" }],
            },
        ],
    });
    let result = await chat.sendMessage(prompt);
    const answer = result.response.text();
    res.send({ rumorstatus: answer });
});

app.get("/test-ai", async (req, res) => {
    const prompt = req.query?.prompt;
    if (!prompt) {
        res.send({ message: "please provide a prompt in query" });
        return;
    }

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    res.send({ answer: result.response.text() });

})






app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})