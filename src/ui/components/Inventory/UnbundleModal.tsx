import { Principal } from "@dfinity/principal";
import classNames from "classnames";
import React, { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useTransfer } from "../../lib/hooks/useTransfer";
import { TypedItem } from "../../lib/types";
import { formatNumber } from "../../lib/utils";
import SpinnerButton from "../Buttons/SpinnerButton";
import ErrorAlert from "../Labels/ErrorAlert";
import Modal from "../Layout/Modal";
import {
  useBag,
  useGlobalContext,
} from "../../components/Store/Store";


export default function UnboundleModal({ item }: { item: TypedItem }) {

  const {
    state: { principal },
  } = useGlobalContext();
  const bag = useBag();

  const [loading,setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const unbundleItem = () => {
    setLoading(true);
    setIsOpen(false)
    bag.unbundle(item.id).then((r)=> {
      setLoading(false)
      console.log(r)
    })    
  };

  return (
    <>
      <div>
        {loading &&
         <AiOutlineLoading className="ml-2 inline-block animate-spin" />
        }
        {!loading &&
          <button type="button" onClick={openModal} className="btn-inventory">
          Unbundle
        </button>
        }
        
      </div>
      <Modal
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
        title="Unbundle Item"
      >
        Are you sure to unbundle this item?
        <button type="button" onClick={unbundleItem} className="btn-inventory">yes</button>
      </Modal>
    </>
  );
}
