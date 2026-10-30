import "dotenv/config";

const api = process.env.API_KEY;

const model = process.env.GEMINI_MODEL || "gemini-3.8-flash";

const getGeminiAIAPIResponse = async (message) => {
    const bodyPayload = {
        contents: [{
            parts: [{
                text: message,
            }]
        }]
    };

    // If using a reasoning model, request minimal thinking overhead
    if (model.includes("3")) {
        bodyPayload.generationConfig = {
            thinkingConfig: { thinkingLevel: "LOW" }
        };
    }

    const options = {
        method : "POST",
        headers : {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(bodyPayload)
    };
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${api}`, options);
        const data = await response.json();
        if (!response.ok) {
            console.error(data);
            throw new Error(data.error?.message || "Gemini API Error");
        }
        console.log(data);

        // In models with thinking, the first part may be thought tokens; pick the non-thought text part
        const parts = data.candidates?.[0]?.content?.parts || [];
        const answerPart = parts.find(p => !p.thought) || parts[parts.length - 1];
        return answerPart?.text || "";
    }
    catch(err) {
        console.log(err);
        throw(err);
    }
}

export default getGeminiAIAPIResponse;