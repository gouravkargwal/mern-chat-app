import React, { useContext, useState } from "react";
import RichEditor from "./Editor";
import { ChatContext } from "../../context/ChatContext";

const ChatInput = () => {
  let { handleSendMsg } = useContext(ChatContext);
  const [content, setContent] = useState("");

  return (
    <div>
      <RichEditor
        setContent={setContent}
        handleSendMsg={handleSendMsg}
        content={content}
      />
    </div>
  );
};

export default ChatInput;
