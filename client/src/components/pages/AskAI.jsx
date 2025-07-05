import { marked } from "marked";
import { SendHorizontal } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function AskAI() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const handleChange = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto"; // Reset
    textarea.style.height = `${textarea.scrollHeight}px`; // Set new height
    setText(e.target.value);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim()) return;

    const newUserMessage = { role: "user", content: text.trim() };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setText("");

    // Custom static response for "what is your name"
    if (text.trim().toLowerCase() === "what is your name") {
      const assistantMessage = {
        role: "assistant",
        content: "My name is Campus Buddy. I'm an assistant bot.",
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      return;
    }

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "meta-llama/llama-4-scout-17b-16e-instruct",
            messages: updatedMessages,
          }),
        }
      );

      const data = await response.json();
      console.log("Groq response:", data);
      const assistantMessage = data.choices[0].message;
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    }
  };

  return (
    <div className="h-full md:px-10 md:py-5">
      <div className="h-full flex flex-col space-y-2 md:bg-white shadow-md rounded-md">
        <div
          className=" px-4  md:w-[60%] mx-auto flex-1 overflow-y-auto"
          style={{
            scrollBehavior: "smooth",
            scrollbarWidth: "none", // for Firefox
            msOverflowStyle: "none", // for IE
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`min-h-[2.5rem] text-sm md:text-md px-5 py-2 rounded-md w-fit max-w-[60%] whitespace-wrap ${
                msg.role === "user"
                  ? "bg-[#103d46] text-white self-end ml-auto my-5"
                  : "bg-gray-200 md:bg-gray-100 text-black self-start mr-auto my-5"
              }`}
            >
              <div
                dangerouslySetInnerHTML={{ __html: marked.parse(msg.content) }}
              />
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className=" w-[95%] sm:w-[80%] md:w-[60%] mx-auto relative bg-gray-50 shadow-inner rounded-md px-4 mb-10">
          <div className="w-full flex items-end">
            <textarea
              value={text}
              onChange={handleChange}
              className="w-full mr-10 max-h-[12rem] overflow-y-auto resize-none scrollbar-none placeholder-gray-500 placeholder:align-bottom text-gray-900 text-base focus:outline-none focus:ring-0 bg-none px-4 pt-6 pb-2 pr-14"
              placeholder="Ask anything..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            ></textarea>
          </div>
          <button
            onClick={handleSend}
            className="absolute bottom-6 right-4 text-gray-500 hover:text-black font-semibold rounded-md px-3 py-2"
          >
            <SendHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* Hide scrollbar for Webkit browsers */}
      <style>
        {`
          div::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
}
