import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  return (
    <div className="px-4 overflow-auto flex-1">
      {loading ? (
        Array.from({ length: 3 }, (_, idx) => <MessageSkeleton key={idx} />)
      ) : messages.length === 0 ? (
        <p className="text-center">Send a message to start a conversation</p>
      ) : (
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))
      )}
    </div>
  );
};

export default Messages;
