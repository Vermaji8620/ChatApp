import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetConversation from "../../hooks/useGetConversation";
import useConversation from "../../zustand/useConversation";
const SeachInput = () => {
  const [inputValue, setInputValue] = useState("");

  const { conversations } = useGetConversation();
  const { setSelectedConversation } = useConversation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) return;
    const finding = conversations.filter((conversation) =>
      conversation.fullName.includes(inputValue)
    );
    setSelectedConversation(finding[0]);
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="input input-bordered rounded-full"
        placeholder="Search..."
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <FaSearch className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SeachInput;
