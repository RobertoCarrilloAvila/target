import './Message.scss';

const Message = ({ deliveryStatus = 'received', text, time }) => (
  <div className={`message message--${deliveryStatus}`}>
    <p className="message__text">{text}</p>
    <time className="message__time">{time}</time>
  </div>
);

export default Message;
