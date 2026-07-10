import "dotenv/config";

const api = process.env.API_KEY;

const getGeminiAIAPIResponse = async (message) => {
    const options = {
        method : "POST",
        headers : {
            "Content-Type": "application/json",
            
        },
        body : JSON.stringify({
            contents: [{
                    parts: [{
                            text: message,
                        }]
                }]
        })
    };
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${api}`, options);
        const data = await response.json();
        if (!response.ok) {
            console.error(data);
            throw new Error(data.error?.message || "Gemini API Error");
        }
        console.log(data);
        return data.candidates[0].content.parts[0].text;
    }
    catch(err) {
        console.log(err);
        throw(err);
    }
}

export default getGeminiAIAPIResponse;