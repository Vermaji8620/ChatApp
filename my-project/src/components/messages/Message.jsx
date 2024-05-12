import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";

function extractTime(dateString) {
  const date = new Date(dateString);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${hours}:${minutes}`;
}
function padZero(number) {
  return number.toString().padStart(2, "0");
}
const Message = ({ message }) => {
  const { selectedConversation } = useConversation();
  const { authUser } = useAuthContext();
  const din = message.senderId;

  const fromMe = authUser._id === din;
  console.log("authUser", authUser);
  console.log("selectedConversation", selectedConversation);

  const chatClassName = fromMe ? "chat-end" : "chat-start";
  // const profilePic = fromMe
  //   ? authUser.profilePic
  //   : selectedConversation.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  const getTime = extractTime(message.createdAt);

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={
              "https://th.bing.com/th/id/OIP.cSPj7LvJYHZOnzdIyFok2gHaHT?w=198&h=196&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            }
          />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {getTime}
      </div>
    </div>
  );
};

export default Message;
