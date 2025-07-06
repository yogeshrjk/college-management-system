import { marked } from "marked";
import { SendHorizontal, Copy } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function AskAI() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    //set textarea
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
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

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
            model: "llama-3.1-8b-instant",
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

  // Sanitize user input to prevent raw HTML rendering
  const escapeHTML = (str) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  // const wrapCode = (html) => {
  //   if (/<pre><code/.test(html)) return html; // already has code block
  //   if (/^<pre>.*<\/pre>$/.test(html)) {
  //     return html.replace(
  //       /^<pre>([\s\S]*)<\/pre>$/,
  //       "<pre><code>$1</code></pre>"
  //     );
  //   }
  //   return html;
  // };

  //upload files

  return (
    <div className="h-full md:px-10 md:py-5 select-text ">
      <div className="h-full flex flex-col space-y-2 rounded-md">
        {/* conversation area */}
        <div
          className="px-2 md:px-0 md:w-[60%] mx-auto flex-1 overflow-y-auto overflow-x-auto break-words max-w-full pb-4"
          style={{
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {messages.length === 0 && (
            <div className="flex justify-center items-center h-full text-[#103d46] text-xl font-bold ">
              What can I help with?
            </div>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`group relative shadow-inner min-h-[2.5rem] text-sm md:text-md px-4 md:px-6 py-4 rounded-md w-fit max-w-[80%] md:max-w-[60%] whitespace-wrap ${
                msg.role === "user"
                  ? "bg-[#103d46] text-white self-end ml-auto my-5"
                  : "bg-white text-black self-start mr-auto my-5"
              }`}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: escapeHTML(msg.content).replace(/\n/g, "<br/>"),
                }}
                className="break-words overflow-auto text-sm"
                style={{ wordBreak: "break-all", overflowWrap: "break-word" }}
              ></div>
              {msg.role === "assistant" && (
                <button
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Copy Message"
                  onClick={() => navigator.clipboard.writeText(msg.content)}
                >
                  <Copy className="w-4 h-4 text-gray-500 hover:text-gray-800" />
                </button>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* input area */}
        <div className=" w-[90%] sm:w-[80%] md:w-[60%] mx-auto relative bg-gray-200 shadow-inner rounded-md px-4 mt-2 mb-8">
          <div className="w-full flex items-end ">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleChange}
              className="w-full mr-10 md:px-2 pt-5 md:pt-5 md:mt-4 pb-2 pr-14 max-h-[12rem] overflow-y-auto resize-none scrollbar-none placeholder-gray-500 placeholder:align-bottom text-gray-900 text-base focus:outline-none focus:ring-0 bg-none"
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
            className="absolute bottom-3 md:bottom-6 right-4 text-gray-500 hover:text-[#103d46] font-semibold rounded-md px-3 py-2"
          >
            <SendHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
