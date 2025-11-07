import OpenAI from "openai";

// Reference: blueprint:javascript_openai
// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user

let openai: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured. Please add your OpenAI API key in the Secrets tab.");
  }
  
  if (!openai) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  
  return openai;
}

export async function getChatResponse(messages: { role: "user" | "assistant" | "system"; content: string }[]): Promise<string> {
  try {
    const client = getOpenAIClient();
    const response = await client.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: `You are a helpful library assistant AI. You help users with questions about the library management system, book recommendations, borrowing procedures, and general library inquiries. Be friendly, concise, and helpful. 
          
The library system allows:
- Users to browse available books, borrow books, return books, and view their reading history
- Admins to manage books (add, view, delete), manage users (view, remove), and see statistics
- Each user can see how many books they've borrowed and read
- Books have titles, authors, ISBN numbers, and categories

Keep responses brief and to the point.`,
        },
        ...messages,
      ],
      max_completion_tokens: 500,
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    if (error.status === 401) {
      throw new Error("Invalid OpenAI API key. Please check your configuration.");
    }
    throw new Error("Failed to get chat response. Please try again.");
  }
}
