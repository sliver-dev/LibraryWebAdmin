import ChatBot from "../ChatBot";

export default function ChatBotExample() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">AI Chatbot Example</h2>
        <p className="text-muted-foreground mb-8">
          Click the chat button in the bottom right corner to start a conversation with the library assistant.
        </p>
      </div>
      <ChatBot />
    </div>
  );
}
