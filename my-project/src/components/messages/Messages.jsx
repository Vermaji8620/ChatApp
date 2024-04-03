import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const endofMessageRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      endofMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  return (
    <div className="px-4 overflow-auto flex-1">
      {loading ? (
        Array.from({ length: 3 }, (_, idx) => <MessageSkeleton key={idx} />)
      ) : messages.length === 0 ? (
        <p className="text-center">Send a message to start a conversation</p>
      ) : (
        messages.map((message) => (
          <div key={message._id} ref={endofMessageRef}>
            <Message message={message} />
          </div>
        ))
      )}
    </div>
  );
};

export default Messages;
