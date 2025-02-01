require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get("/", (req, res) => {
    res.send({ msg: "Lets crack the power of AI" });
})


app.get("/test-ai", async (req, res) => {
    const prompt = req.query?.prompt;

    if(!prompt){
        res.send({message: "please provide prompt in query"});
        return;
    }

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    res.send({ answer: result.response.text() });

})






app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})