import { Principal } from "@dfinity/principal";
import classNames from "classnames";
import React, { useState } from "react";
import { useTransfer } from "../../lib/hooks/useTransfer";
import { TypedItem } from "../../lib/types";
import { formatNumber } from "../../lib/utils";
import SpinnerButton from "../Buttons/SpinnerButton";
import ErrorAlert from "../Labels/ErrorAlert";
import Modal from "../Layout/Modal";

export default function BoundleModal(props) {

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const balance = BigInt(1);
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [error, setError] = useState("");

  const [items, setItems] = useState(props.items);
  
  const itemCheckList = props.items && props.items.map(item => (
    <>
    <input type="checkbox" name={item.name} value={item.id}/>
    <label > {item.name}</label><br></br>
    </>
  ));

  const bundleItem = (e) => {
    e.preventDefault();
    //
    setError("");
    
 
  };


  return (
    <>
      <div>
        <button type="button" onClick={openModal} className="btn-inventory">
          Bundle
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
        title="Bundle Item"
      >
        <form>
          <input type="text" placeholder="boundle name" />
          <br/><br/>

          {itemCheckList}
          
          <button className="btn-inventory" onClick={bundleItem}>Boundle</button>
          </form>
      </Modal>
    </>
  );
}
