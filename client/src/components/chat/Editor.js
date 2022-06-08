import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "./../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Editor.css";
import { MdSend } from "react-icons/md";
import bold from "./assets/bold-svgrepo-com.svg";
import italic from "./assets/italic-svgrepo-com.svg";
import strike from "./assets/strikethrough-svgrepo-com.svg";
import code from "./assets/code-svgrepo-com.svg";
import emoji from "./assets/emoji-svgrepo-com.svg";
import link from "./assets/link-svgrepo-com.svg";
import ul from "./assets/bulleted-list-svgrepo-com.svg";
import ol from "./assets/numbered-list-svgrepo-com.svg";
import at from "./assets/at-sign-svgrepo-com.svg";
import add from "./assets/add-svgrepo-com.svg";
import underline from "./assets/underline-svgrepo-com.svg";
import arrow from "./assets/right-arrow-send-svgrepo-com.svg";

function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.imgur.com/3/image");
    xhr.setRequestHeader("Authorization", "Client-ID XXXXX");
    const data = new FormData();
    data.append("image", file);
    xhr.send(data);
    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.responseText);
      resolve(response);
    });
    xhr.addEventListener("error", () => {
      const error = JSON.parse(xhr.responseText);
      reject(error);
    });
  });
}

const toolbar = {
  options: ["inline", "blockType", "list", "link", "emoji", "image"],
  inline: {
    inDropdown: false,
    component: undefined,
    dropdownClassName: undefined,
    options: ["bold", "italic", "underline", "strikethrough"],
    bold: {
      icon: bold,
      className: "button",
    },
    italic: { icon: italic, className: "button" },
    underline: { icon: underline, className: "button" },
    strikethrough: { icon: strike, className: "button" },
  },
  blockType: {
    inDropdown: false,
    options: ["Code"],
    icon: code,
    className: "button",
  },
  list: {
    inDropdown: false,
    options: ["unordered", "ordered"],
    unordered: { className: "button", icon: ul },
    ordered: { className: "button", icon: ol },
  },
  link: {
    inDropdown: false,
    options: ["link"],
    link: { icon: link, className: "button" },
  },
  emoji: {
    emojis: [
      "😀",
      "😁",
      "😂",
      "😃",
      "😉",
      "😋",
      "😎",
      "😍",
      "😗",
      "🤗",
      "🤔",
      "😣",
      "😫",
      "😴",
      "😌",
      "🤓",
      "😛",
      "😜",
      "😠",
      "😇",
      "😷",
      "😈",
      "👻",
      "😺",
      "😸",
      "😹",
      "😻",
      "😼",
      "😽",
      "🙀",
      "🙈",
      "🙉",
      "🙊",
      "👼",
      "👮",
      "🕵",
      "💂",
      "👳",
      "🎅",
      "👸",
      "👰",
      "👲",
      "🙍",
      "🙇",
      "🚶",
      "🏃",
      "💃",
      "⛷",
      "🏂",
      "🏌",
      "🏄",
      "🚣",
      "🏊",
      "⛹",
      "🏋",
      "🚴",
      "👫",
      "💪",
      "👈",
      "👉",
      "👉",
      "👆",
      "🖕",
      "👇",
      "🖖",
      "🤘",
      "🖐",
      "👌",
      "👍",
      "👎",
      "✊",
      "👊",
      "👏",
      "🙌",
      "🙏",
      "🐵",
      "🐶",
      "🐇",
      "🐥",
      "🐸",
      "🐌",
      "🐛",
      "🐜",
      "🐝",
      "🍉",
      "🍄",
      "🍔",
      "🍤",
      "🍨",
      "🍪",
      "🎂",
      "🍰",
      "🍾",
      "🍷",
      "🍸",
      "🍺",
      "🌍",
      "🚑",
      "⏰",
      "🌙",
      "🌝",
      "🌞",
      "⭐",
      "🌟",
      "🌠",
      "🌨",
      "🌩",
      "⛄",
      "🔥",
      "🎄",
      "🎈",
      "🎉",
      "🎊",
      "🎁",
      "🎗",
      "🏀",
      "🏈",
      "🎲",
      "🔇",
      "🔈",
      "📣",
      "🔔",
      "🎵",
      "🎷",
      "💰",
      "🖊",
      "📅",
      "✅",
      "❎",
      "💯",
    ],
    icon: emoji,
    className: "button",
  },
  image: {
    icon: add,
    className: "button",
    urlEnabled: true,
    uploadEnabled: true,
    alignmentEnabled: true,
    uploadCallback: uploadImageCallBack,
    previewImage: true,
    inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
    alt: { present: false, mandatory: false },
    defaultSize: {
      height: "auto",
      width: "auto",
    },
  },
};

class RichEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    this.props.setContent(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };
  render() {
    const { editorState } = this.state;
    // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    return (
      <div className="relative">
        <Editor
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor hover:overflow-y-auto overflow-hidden"
          toolbarClassName="demo-toolbar"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={toolbar}
          placeholder="Chat goes here"
        />
        <button
          className="absolute right-3 bottom-2 z-10 bg-green-500 p-2 hover:bg-green-600 rounded-md"
          onClick={() => {
            this.props.handleSendMsg(this.props.content);
          }}
        >
          <MdSend style={{ color: "white" }} />
        </button>
      </div>
    );
  }
}
export default RichEditor;
