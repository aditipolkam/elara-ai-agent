import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/ui/Button.tsx";
import Input from "../components/ui/Input.tsx";
import useChat from "../hooks/useChat.tsx";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { input, handleInputChange, handleSubmit } = useChat();

  // Predefined chat history (simulated conversation)
  const chatHistory = [
    {
      id: 1,
      role: "user",
      content: "Who are the top accounts to follow for DeFi updates?",
    },
    {
      id: 2,
      role: "assistant",
      content:
        "Some top DeFi accounts: @DegenSpartan, @Route2FI, @cryptomanran",
    },
    { id: 3, role: "user", content: "Any big airdrops happening soon?" },
    {
      id: 4,
      role: "assistant",
      content:
        "Rumors suggest zkSync, StarkNet, and LayerZero may do an airdrop soon!",
    },
  ];

  const exampleQueries = [
    "Who are the top accounts to follow for DeFi updates?",
    "What's the latest controversy on Crypto Twitter?",
    "Any big airdrops happening soon?",
    "Which projects are gaining traction in the bear market?",
  ];

  // State to control message visibility
  const [visibleMessages, setVisibleMessages] = useState<
    { id: number; role: string; content: string }[]
  >([]);

  // Show messages sequentially with delay
  useEffect(() => {
    if (showChat) {
      setVisibleMessages([]); // Reset messages when opening chat
      chatHistory.forEach((message, index) => {
        setTimeout(() => {
          setVisibleMessages((prev) => [...prev, message]);
        }, index * 1000); // Delay each message by 1s
      });
    }
  }, [showChat]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full font-mono text-sm">
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

            {/* Chat Box */}
            {showChat && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md border rounded-lg p-4 bg-white shadow-lg"
              >
                {/* Chat Messages (Sequential Animation) */}
                <div className="h-64 overflow-y-auto mb-4">
                  <AnimatePresence>
                    {visibleMessages.map((m, index) => (
                      <motion.div
                        key={m.id}
                        initial={{
                          opacity: 0,
                          x: m.role === "user" ? 30 : -30,
                        }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: m.role === "user" ? 30 : -30 }}
                        transition={{ duration: 0.5, delay: index * 1.5 }} // Staggered animation
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
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask Elara anything..."
                    className="flex-grow"
                  />
                  <Button type="submit">Send</Button>
                </form>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
