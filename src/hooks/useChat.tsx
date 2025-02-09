import { useState } from "react";

interface Message {
  id: number;
  content: string;
  role: "user" | "assistant";
}

const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      content: input,
      role: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");

    // Simulate bot response (optional)
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          content: `You said: "${input}"`,
          role: "assistant",
        },
      ]);
    }, 500);
  };

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
  };
};

export default useChat;
