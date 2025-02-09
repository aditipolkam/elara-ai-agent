import { useState } from "react";
import Button from "../components/ui/Button.tsx";
import Input from "../components/ui/Input.tsx";
import useChat from "../hooks/useChat.tsx";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const exampleQueries = [
    "Who are the top accounts to follow for DeFi updates?",
    "What's the latest controversy on Crypto Twitter?",
    "Any big airdrops happening soon?",
    "Which projects are gaining traction in the bear market?",
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Meet Elara, Your Crypto Twitter Assistant
        </h1>

        {!isLoggedIn ? (
          <>
            <p className="text-center mb-8">
              Elara can help you with various tasks. Here are some example
              queries:
            </p>
            <ul className="list-disc pl-5 mb-8">
              {exampleQueries.map((query, index) => (
                <li key={index} className="mb-2">
                  {query}
                </li>
              ))}
            </ul>
            <div className="flex justify-center">
              <Button onClick={() => setIsLoggedIn(true)}>
                Login to Chat with Elara
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <Button onClick={() => setShowChat(!showChat)} className="mb-4">
              {showChat ? "Close Chat" : "Open Chat"}
            </Button>
            {showChat && (
              <div className="w-full max-w-md border rounded-lg p-4 bg-white shadow-lg">
                <div className="h-64 overflow-y-auto mb-4">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`mb-2 ${
                        m.role === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      <span
                        className={`inline-block p-2 rounded-lg ${
                          m.role === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {m.content}
                      </span>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask Elara anything..."
                    className="flex-grow"
                  />
                  <Button type="submit">Send</Button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
