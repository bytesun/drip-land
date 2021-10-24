import { Principal } from "@dfinity/principal";
import classNames from "classnames";
import React, { useState } from "react";
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

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const unbundleItem = () => {
    bag.unbundle(item.id);    
  };

  return (
    <>
      <div>
        <button type="button" onClick={openModal} className="btn-inventory">
          Unbundle
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
        title="Unbundle Item"
      >
        Are you sure to unboundle this item?
        <button type="button" onClick={unbundleItem} className="btn-inventory"/>
      </Modal>
    </>
  );
}
