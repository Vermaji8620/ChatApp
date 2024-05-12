import { useSocketContext } from "../../context/SocketContext.jsx";
import useConversation from "../../zustand/useConversation.js";

const Conversation = ({ conversation }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        onClick={() => setSelectedConversation(conversation)}
        className={`flex  ${
          isSelected ? "bg-sky-500" : ""
        } gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer`}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img
              src={
                "https://th.bing.com/th/id/OIP.cSPj7LvJYHZOnzdIyFok2gHaHT?w=198&h=196&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              }
              alt="https://th.bing.com/th/id/OIP.cSPj7LvJYHZOnzdIyFok2gHaHT?w=198&h=196&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            <span className="text-xl"></span>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
};

export default Conversation;
