import { Principal } from "@dfinity/principal";
import classNames from "classnames";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AiOutlineLoading } from "react-icons/ai";
import { useTransfer } from "../../lib/hooks/useTransfer";
import { TypedItem } from "../../lib/types";
import { formatNumber } from "../../lib/utils";
import SpinnerButton from "../Buttons/SpinnerButton";
import ErrorAlert from "../Labels/ErrorAlert";
import Modal from "../Layout/Modal";
import {
  useDrip,
  useBag,
  useGlobalContext,
} from "../Store/Store";


export default function EquipModal({ item }: { item: TypedItem }) {

  const {
    state: { principal },
  } = useGlobalContext();
  const bag = useBag();
  const drip = useDrip();
  const queryClient = useQueryClient();

  const [loading,setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const unbundleItem = () => {
    setLoading(true);
    setIsOpen(false)
    
  
      // drip.transfer_with_notify(Principal.fromText("rvzx7-oqaaa-aaaaj-qagxq-cai"), BigInt(item.id));
      bag.equip(BigInt(item.id)).then((r)=> {
        setLoading(false)
        console.log(r)
        queryClient.refetchQueries("inventory");
      })
   
    
  };

  return (
    <>
      <div>
        {loading &&
         <AiOutlineLoading className="ml-2 inline-block animate-spin" />
        }
        
        {!loading && ((item.type === "Bag" && item.children.length > 0) || item.type === "Drip") &&
          <button type="button" onClick={openModal} className="btn-inventory">
          Equip
        </button>
        }
        
      </div>
      <Modal
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
        title="Equip Item"
      >
        Are you sure to equip this item?
        <button type="button" onClick={unbundleItem} className="btn-inventory">yes</button>
      </Modal>
    </>
  );
}
