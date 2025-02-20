import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";

import type { ChangeEvent, FormEvent } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export const Route = createFileRoute("/example/ai-chat")({
  component: AIChat,
});

const chat = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    return data as Array<Message>;
  })
  .handler(({ data }) => {
    return fetch("http://localhost:3000/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: data,
      }),
    });
  });

function AIChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<Message>>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const out = await chat({ data: messages });
    console.log(out);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex flex-col py-10 px-10 text-2xl">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit} className="fixed bottom-0 mb-10 w-full">
        <input
          className="w-3/4 text-3xl px-4 py-2 border rounded-md"
          value={input}
          placeholder="Ask me a question..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
