import { Principal } from "@dfinity/principal";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
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
import useItems from "../../lib/hooks/useItems";
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

 const {drips,bundles,heads,chests,waists,hands,underwares,pants,accessories,foots } = useItems(props.items);
  const itemCheckList_drip = drips && drips.map(item => (
    <>

    <input type="checkbox" name={item.name} value={item.id} onChange={checkItem}/>
    
    <label > {item.name}</label><br></br>
    </>
  ));

  const itemCheckList_bundle = bundles && bundles.map(item => (
    <>

    <input type="checkbox" name={item.name} value={item.id} onChange={checkItem}/>
    
    <label > {item.name}</label><br></br>
    </>
  ));

  const itemCheckList_hand = hands && hands.map(item => (
    <> 
    <input type="checkbox" name={item.name} value={item.id} onChange={checkItem}/>    
    <label > {item.name}</label><br></br>
    </>
  ));
  const itemCheckList_chest = chests && chests.map(item => (
    <> 
    <input type="checkbox" name={item.name} value={item.id} onChange={checkItem}/>    
    <label > {item.name}</label><br></br>
    </>
  ));
  const itemCheckList_waist = waists && waists.map(item => (
    <> 
    <input type="checkbox" name={item.name} value={item.id} onChange={checkItem}/>    
    <label > {item.name}</label><br></br>
    </>
  ));
  const itemCheckList_head = heads && heads.map(item => (
    <> 
    <input type="checkbox" name={item.name} value={item.id} onChange={checkItem}/>    
    <label > {item.name}</label><br></br>
    </>
  ));
  const itemCheckList_underware = underwares && underwares.map(item => (
    <> 
    <input type="checkbox" name={item.name} value={item.id} onChange={checkItem}/>    
    <label > {item.name}</label><br></br>
    </>
  ));
  const itemCheckList_pants = pants && pants.map(item => (
    <> 
    <input type="checkbox" name={item.name} value={item.id} onChange={checkItem}/>    
    <label > {item.name}</label><br></br>
    </>
  ));
  const itemCheckList_accessory = accessories && accessories.map(item => (
    <> 
    <input type="checkbox" name={item.name} value={item.id} onChange={checkItem}/>    
    <label > {item.name}</label><br></br>
    </>
  ));
  const itemCheckList_foot = foots && foots.map(item => (
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
          {/* {drips.length >0 && <><b>[Drip] </b><br/></>}
          {itemCheckList_drip}<br/> */}
          {bundles.length>0 && <><b>[Bundle] </b><br/></>}
          {itemCheckList_bundle}
          {heads.length > 0 && <><b>[Head] </b><br/></>}
          {itemCheckList_head}
          {chests.length>0 && <><b>[Chest] </b><br/></>}
          {itemCheckList_chest}
          {waists.length > 0 && <><b>[Waist]</b><br/></>}
          {itemCheckList_waist}
          {hands.length > 0 && <><b>[Hand] </b><br/></>}
          {itemCheckList_hand}
          {underwares.length>0 && <><b>[Underwear] </b><br/></>}
          {itemCheckList_underware}
          {pants.length>0 && <><b>[Pants] </b><br/></>}
          {itemCheckList_pants}
          {accessories.length>0&& <><b>[Accessory]</b><br/></>}
          {itemCheckList_accessory}
          {foots.length>0 && <><b>[Foot] </b><br/></>}
          {itemCheckList_foot}<br/>
          
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
