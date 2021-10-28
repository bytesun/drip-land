import { Principal } from "@dfinity/principal";
import classNames from "classnames";
import React, { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useTransfer } from "../../lib/hooks/useTransfer";
import { useMutation, useQueryClient } from "react-query";
import { TypedItem } from "../../lib/types";
import { formatNumber } from "../../lib/utils";
import SpinnerButton from "../Buttons/SpinnerButton";
import ErrorAlert from "../Labels/ErrorAlert";
import Modal from "../Layout/Modal";
import {
  useDrip,
  useBag,
  useGlobalContext,
} from "../../components/Store/Store";
import { load } from "protobufjs";
export default function BoundleModal(props) {

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


  const [items, setItems] = useState(props.items);
  const [name, setName] = useState("");
  const [checkedIds, setCheckedIds] = useState([])

  
  const itemCheckList = props.items && props.items.map(item => (
    <>
    <input type="checkbox" name={item.name} value={item.id} onChange={checkItem}/>
    <label > {item.name}</label><br></br>
    </>
  ));

  const bundleItem = (e) => {
    e.preventDefault();
    if(name != ""){
      setLoading(true)
      bag.bundle({ids:checkedIds.map(Number),name}).then((r)=>{
        console.log(r)
        setLoading(false)
        setIsOpen(false)
        queryClient.refetchQueries("inventory");
      })
   
    }
    
  };

  function handleChange(e){
    if(e.target.name == "bundleName"){
      setName(e.target.value);
    }
  }
  function checkItem(e){
    console.log(e.target.name + " : "+ e.target.value)
    console.log("checked: "+e.target.checked)

    if(e.target.checked && e.target.value){
      var ids = checkedIds;
      ids.push(e.target.value);
      console.log(ids);
      setCheckedIds(ids);
    }else if(!e.target.checked){
      var ids = checkedIds.filter((id)=>id != e.target.value);
      console.log("unchecked ids: "+ids);
      setCheckedIds(ids);
    }

  }
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
          <input name="bundleName" type="text" placeholder="boundle name" onChange={handleChange}/>
          <br/><br/>

          {itemCheckList}
          
          {loading &&
          <AiOutlineLoading className="ml-2 inline-block animate-spin" />
          }
          {!loading &&
          <button className="btn-inventory" onClick={bundleItem}>Boundle</button>
          }
          
          </form>
      </Modal>
    </>
  );
}
