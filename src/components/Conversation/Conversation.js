import useContentView from "hooks/useContentView";
import Message from "components/Message/Message";

import "components/Conversation/Conversation.scss";
import world from "assets/icons/world.svg";

const Conversation = () => {
  const { displayedComponentData } = useContentView();
  const { conversationId } = displayedComponentData;

  return (
    <div className="conversation">
      <div className="conversation__container">
        <div className="conversation__header">
          <img src={world} alt="world" />

          <div className="conversation__partner-info">
            <h2>José Gazzano</h2>
            <p>Teo va a Camboya</p>
          </div>
        </div>

        <section className="conversation__messages">
            <Message deliveryStatus="received" text="¡Hola! A dónde querés viajar?" time="10.15 pm" />
            <Message deliveryStatus="received" text="Estoy buscando compañero de viaje" time="10.15 pm" />

            <Message deliveryStatus="sent" text="Hola! A mi me encantaría conocer Camboya" time="10.15 pm" />
            <Message deliveryStatus="sent" text="Vos?" time="10.15 pm" />
          </section>
      </div>
    </div>
  );
};

export default Conversation;
