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
import { set } from "object-path-immutable";
import { Item } from "../../declarations/Bag/Bag.did";
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
  const [isRequired, setIsRequired] = useState(false)

  const [isStepOneOpen, setIsStepOneOpen] = useState(false);
  const [isStepTwoOpen, setIsStepTwoOpen] = useState(false);
  const [isStepThreeOpen, setIsStepThreeOpen] = useState(false);
  const [isCreateStepOneOpen, setIsCreateStepOneOpen] = useState(false);
  const [isCreateStepTwoOpen, setIsCreateStepTwoOpen] = useState(false);
  const [isCreateStepThreeOpen, setIsCreateStepThreeOpen] = useState(false);

  const [items, setItems] = useState(props.items);
  const [name, setName] = useState("");
  const [checkedIds, setCheckedIds] = useState([])
  const [stageItems, setStageItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState("");
  const changeFilter = (filter) => setActiveFilter(filter); 


  useEffect(()=>{
    setItems(props.items);
  },[props.items]);
  const itemlist = items.map(item => (
    
    <div className="cursor-pointer" onClick={()=>addToStage(item)}> +{item.name}</div>
    
  ));
  const addToStage = (i: Item) =>{
    var tstageItems = stageItems;
    tstageItems.push(i);
    console.log(tstageItems)
    setIsRequired(false);
    setStageItems(tstageItems);
    let restitems = items.filter(it=>it.id != i.id);
    setItems(restitems);
    
  }

  const stageItemList = stageItems && stageItems.map(item => (
   
    <div className="cursor-pointer" onClick={()=>removeFromStage(item)}>  - {item.name}</div>
   
  ));
  const confirmItemList = stageItems && stageItems.map(item => (
   
    <div className="cursor-pointer" >   {item.name}</div>
   
  ));
  const removeFromStage = (i:Item) =>{
    let restitems = stageItems.filter(it=>it.id != i.id)
    setStageItems(restitems);

    var existitems = items;
    existitems.push(i);
    setItems(existitems);
    
  }

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
    if(stageItems.length>1){
      setLoading(true)
      let itemids = stageItems.map(i=>i.id)
      try{
        bag.bundle({ids:itemids.map(Number),name}).then((r)=>{
          queryClient.refetchQueries("inventory");
          setName('');
          console.log(r)
          setLoading(false)
          setStageItems([]);
          setIsOpen(false)
          setIsCreateStepThreeOpen(false)
          
        })
      }catch(err){
        setName('');
        
          console.error(err)
          setLoading(false)
          setIsOpen(false)
          setIsCreateStepThreeOpen(false)
      }
      
   
    }else{
      setIsRequired(true);
    }
    
  };

  function handleChange(e){
    setIsRequired(false)
    if(e.target.name == "bundleName"){
      setName(e.target.value);
    }
  }
  function checkItem(e){
    console.log(e.target.name + " : "+ e.target.value)
    console.log("checked: "+e.target.checked)
    setIsRequired(false)
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

  const goTwo = (e) =>{
    e.preventDefault();
    
      setIsStepOneOpen(false);
      setIsStepTwoOpen(true);
   

  }
  const backToOne = (e) =>{
    e.preventDefault();
    
      setIsStepOneOpen(true);
      setIsStepTwoOpen(false);
   

  }

  const cancel = (e) =>{
    e.preventDefault();
      setName('');
      setStageItems([]);
      setIsStepOneOpen(false);
      setIsStepTwoOpen(false);
      setIsCreateStepOneOpen(false);
      setIsCreateStepTwoOpen(false);
      setIsCreateStepThreeOpen(false);
   
  }

  const nextCreateOne = (e)=>{
      setIsStepOneOpen(false)
      setIsCreateStepOneOpen(true);
    
  }


  const nextCreateTwo = (e) => {
    e.preventDefault();
    if(name == "") setIsRequired(true)

    else{
      setIsCreateStepOneOpen(false);
      setIsCreateStepTwoOpen(true);
      setActiveFilter("items")
    }
    
  }

  const backCreateOne = (e) =>{
    e.preventDefault();
    setIsCreateStepOneOpen(true);
    setIsCreateStepTwoOpen(false);

  }

  const goCreateThree = (e) =>{
    e.preventDefault();
    if(stageItems.length < 2){
      setIsRequired(true);
    }else{
      setIsCreateStepTwoOpen(false)
      setIsCreateStepThreeOpen(true);
    }
  }
  const backCreateTwo = (e) =>{
    e.preventDefault();
    setIsCreateStepTwoOpen(true);
    setIsCreateStepThreeOpen(false);

  }
  return (
    <>
      <div>
        <button type="button" onClick={()=>setIsStepOneOpen(true)} className="btn-create-bundle flex-grow ">
        Add/Create Bundle
        </button>
      </div>

      
      <Modal // STEP 1
        isOpen={isStepOneOpen}
        openModal={()=>setIsStepOneOpen(true)}
        closeModal={cancel}
        title="Add/Create Bundle"
      >
        <div className="flex">
          Would you like to add items to an existing bundle or create a new bundle? 
        </div>
         
          <button className="btn-inventory ml-20 mr-20 mt-10" onClick={goTwo}> Add </button>

          <button className="btn-inventory" onClick={nextCreateOne}> Create </button>

          
      </Modal>


      <Modal // Create Step 2
        isOpen={isCreateStepOneOpen}
        openModal={()=>setIsCreateStepOneOpen(true)}
        closeModal={cancel}
        title="Create Bundle"
      >
        <form >
          <label>Please name you new Drip bundle </label><br/>
          <input name="bundleName" value={name} disabled={loading} type="text"  onChange={handleChange}/>
          {isRequired && <span className="text-red-500">*A bundle name is required</span>}
         
          
          {loading &&
          <AiOutlineLoading className="ml-2 inline-block animate-spin" />
          }
          <div >
          
          <button className="btn-inventory  bg-gray-500 mt-3 mr-40" onClick={backToOne}> Back</button>          

          <button className="btn-inventory  self-end" onClick={nextCreateTwo}> Next</button>
          </div>
          </form>
      </Modal>

      <Modal // Create Step 2
        isOpen={isCreateStepTwoOpen}
        openModal={()=>setIsCreateStepTwoOpen(true)}
        closeModal={cancel}
        title="Bundle Item"
      >
        <form>
          <div className="mb-10 text-center text-3xl font-bold text-blue-400"> {name}</div>

          <div>
            <label onClick={()=>changeFilter("items")} className={" cursor-pointer mr-5 "+(activeFilter == "items" ? "bg-yellow-400": "bg-gray-400")}>Items</label>
            <label  onClick={()=>changeFilter("bundles")} className={" cursor-pointer mr-5 "+(activeFilter == "bundles" ? "bg-yellow-400": "bg-gray-400")}>Bundles</label>
          </div>


          {itemlist}

{/*           
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
          {itemCheckList_foot}<br/> */}
          
          <div className="flex mt-2 grid grid-cols-1 border-4">
            {stageItemList}
            {isRequired && <span className="text-red-500">At least two items needed for bundle</span>}
          </div>
          <div >
          
          <button className="btn-inventory  bg-gray-500 mt-5  mr-10" onClick={backCreateOne}> Back</button>


          <button className="btn-inventory object-right bg-gray-500 "onClick={goCreateThree}> Next</button>
          </div>
          </form>
      </Modal>

      <Modal // Create Step 3 - confirm
        isOpen={isCreateStepThreeOpen}
        openModal={()=>setIsCreateStepThreeOpen(true)}
        closeModal={cancel}
        title="Custom Bundle Creator"
      >
        <form>
          <div className="mb-10 text-center text-3xl font-bold text-blue-400"> {name}</div>

          {confirmItemList}
          <button className="btn-inventory  bg-gray-500 mt-5  mr-10" onClick={backCreateTwo}> Back</button>

          {loading &&
          <AiOutlineLoading className="ml-2 inline-block animate-spin" />
          }
          {!loading && <button className="btn-inventory object-right bg-gray-500 "onClick={bundleItem}> Confirm</button>}
          
          </form>
      </Modal>
    </>
  );
}
