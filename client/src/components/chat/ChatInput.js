import React, { useState } from "react";
import RichEditor from "./Editor";

const ChatInput = ({ handleSendMsg }) => {
  const [content, setContent] = useState("");
  console.log(content);
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
