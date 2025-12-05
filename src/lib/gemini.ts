import { UNIVERSAL_SYSTEM_PROMPT } from './prompts';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent';

interface GeminiResponse {
    candidates?: {
        content: {
            parts: {
                text: string;
            }[];
        };
    }[];
    error?: {
        message: string;
    };
}

export async function callGeminiAPI(
    userInput: string
): Promise<string> {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error('API key not configured. Please set VITE_GEMINI_API_KEY environment variable.');
    }

    const requestBody = {
        contents: [
            {
                parts: [
                    {
                        text: `${UNIVERSAL_SYSTEM_PROMPT}\n\nUser's Input: "${userInput}"\n\nTransform this into an optimized, detailed prompt:`
                    }
                ]
            }
        ],
        generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
        }
    };

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
        }

        const data: GeminiResponse = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        if (!data.candidates || data.candidates.length === 0) {
            throw new Error('No response generated. Please try again.');
        }

        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('An unexpected error occurred. Please try again.');
    }
}
