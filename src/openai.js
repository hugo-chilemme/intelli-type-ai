const OpenAI = require('openai');

async function generateResponse(prompt) {
    try {
        const openai = new OpenAI(process.env.OPENAI_API_KEY);
        const gptResponse = await openai.chat.completions.create({
            messages: [{ "role": "user", "content": prompt }],
            model: "gpt-3.5-turbo",
            max_tokens: 60,
        });

        return gptResponse.data.choices[0].text.trim();
    } catch (error) {
        if (error.code === 'insufficient_quota') {
            console.error("Quota exceeded. Please check your OpenAI plan and billing details.");
            // Add your logic here to handle quota exceeded error
        } else {
            console.error("Failed to generate response", error);
        }
    }
}

module.exports = {
    generateResponse,
};