import Message from "./Message.jsx";
import UserInputField from "./InputField.jsx";
import Dropdown from "./Dropdown.jsx";
import InputField from "./InputField.jsx";
import { useState, useEffect } from "react";

async function createCompletion(conversation, setConversation) {
  console.log("creating completion");
  try {
    console.log('messages before',conversation)
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ conversation }),
    });

    const json = await response.json();
    const responseConversation = json.conversation;
    console.log('response conver',responseConversation)
    if (responseConversation !== undefined) {
      setConversation(responseConversation);
    }
    // console.log('g',response,messages)
  } catch (error) {
    console.error(error);
  }
}

const ORDER_A_DRINK_CONVERSATION_SEED = [
  {
    role: "system",
    content:
      "You are a Spanish chat bot roleplaying as a Spanish Barista. The user will submit messages in Spanish and as an assistant your job is to respond.",
  },
];

//[{role:"user","system","assistant", content:"string"}]
export default function Chat() {
  const [conversation, setConversation] = useState(ORDER_A_DRINK_CONVERSATION_SEED);

  useEffect(() => {
    createCompletion(conversation, setConversation);
  }, []);

  return (
    <>
      <Dropdown />
      <div className="chat">
        <div className="chatDisplay">
          {conversation.map((msg,indx) => (
            <Message key={indx} body={msg} />
          ))}
        </div>
        <div className="userInputField">
          <InputField />
        </div>
      </div>
    </>
  );
}