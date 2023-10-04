import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import smiles from "../../assets/smilies.svg";
import close from "../../assets/icons/close.svg";
import "./Modal.scss";

const Modal = ({ children, title, toggleModal }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-header">
          <button onClick={toggleModal} className="modal-close-button">
            <img src={close} alt="close" />
          </button>
          <img className="modal-header-img" src={smiles} alt="smiles" />
          <h2 className="modal-header-title">{title}</h2>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>,
    elRef.current);
}

export default Modal;
