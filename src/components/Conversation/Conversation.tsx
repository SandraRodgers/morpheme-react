import './ConversationStyles.css';
import { FaUser, FaRobot } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';

interface ConversationProps {
  messages: any[];
  onClose?: () => void;
  showCloseButton?: boolean;
}

const Conversation: React.FC<ConversationProps> = ({
  messages,
  onClose,
  showCloseButton = false,
}) => {
  const conversationMessages = messages.filter((msg) => msg.type === 'ConversationText');

  const closeConversation = () => {
    onClose?.();
  };

  return (
    <div className="conversation-container">
      {showCloseButton && (
        <span className="close-button" onClick={closeConversation}>
          <FaXmark />
        </span>
      )}
      <ul className="conversation-list">
        {conversationMessages.map((msg, index) => (
          <li
            className={`message-container ${msg.role === 'user' ? 'user-message-container' : 'agent-message-container'}`}
            key={index}
          >
            <span className="message-icon message-icon-user">
              {msg.role === 'user' ? <FaUser /> : null}
            </span>
            <span className={`${msg.role === 'user' ? 'user-message' : 'agent-message'}`}>
              {msg.content}
            </span>
            <span className="message-icon message-icon-agent">
              {msg.role === 'assistant' ? <FaRobot /> : null}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Conversation;
