import useGetConversation from "../../hooks/useGetConversation";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversation();
  console.log(typeof conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation) => (
        <Conversation key={conversation._id} conversation={conversation} />
      ))}
      {loading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : null}
    </div>
  );
};

export default Conversations;
