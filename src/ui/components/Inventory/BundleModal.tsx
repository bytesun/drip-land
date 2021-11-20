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

  const [items, setItems] = useState([]);
  const [itempages,setItempages] = useState([[]])
  const [bundles,setBundles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [name, setName] = useState("");
  const [checkedIds, setCheckedIds] = useState([])
  const [stageItems, setStageItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState("");
  const changeFilter = (filter) => setActiveFilter(filter); 


  useEffect(()=>{
    //separate drip, items and bundles
    const pitems = props.items;
    pitems.map(pi=>{
      console.log("item :"+pi.name+" ,properties:"+pi.properties.length +",children :"+pi.children +", childOf: "+pi.childOf+",dripProperties:"+pi.dripProperties )
    })
    
    
    let titems = pitems && pitems.filter(i => i.properties.length == 0 );
    
    setBundles(titems);
    let bitems = pitems && pitems.filter(i => i.properties.length > 0 );
    
    if(bitems.length > 12){//page size = 12
    
      let ppitems = [];
      let pppitems = [];
      console.log("items:"+bitems.length)
      for(var i=0; i<bitems.length; i++){
        pppitems.push(bitems[i]);
        console.log("i="+i)
        if(i%12 == 11){          
          ppitems.push(pppitems);
          console.log("i="+i+",page:"+ppitems.length)
          pppitems = [];
        } 

      }
      if(pppitems.length>0)ppitems.push(pppitems);
      console.log("pages:"+ppitems.length)
      setItempages(ppitems);
      setItems(ppitems[0]);
    }else{
      setItems(bitems);
    }
    
    

  },[]);

  const itemlist = items.map(item => (
    
    <div className="cursor-pointer" onClick={()=>addToStage(item)}> +{item.name}</div>
    
  ));
  const itempagination = itempages.map((ip,i)=>
    <span>{i>0 && ","}<a href="#" onClick={()=>changePage(i)}>{i+1}</a></span>
  )
  const bundlelist = bundles && bundles.map(bi=> (
    <div className="cursor-pointer" onClick={()=>addToStage(bi)}> +{bi.name}</div>
  ))
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

//  const {drips,bundles,heads,chests,waists,hands,underwares,pants,accessories,foots } = useItems(props.items);
//   const itemCheckList_drip = drips && drips.map(item => (
//     <>

//     <input type="checkbox" name={item.name} value={item.id} onChange={checkItem}/>
    
//     <label > {item.name}</label><br></br>
//     </>
//   ));

//   const itemCheckList_bundle = bundles && bundles.map(item => (
//     <>

//     <input type="checkbox" name={item.name} value={item.id} onChange={checkItem}/>
    
//     <label > {item.name}</label><br></br>
//     </>
//   ));

//   const itemCheckList_hand = hands && hands.map(item => (
//     <> 
//     <input type="checkbox" name={item.name} value={item.id} onChange={checkItem}/>    
//     <label > {item.name}</label><br></br>
//     </>
//   ));
//   const itemCheckList_chest = chests && chests.map(item => (
//     <> 
//     <input type="checkbox" name={item.name} value={item.id} onChange={checkItem}/>    
//     <label > {item.name}</label><br></br>
//     </>
//   ));
//   const itemCheckList_waist = waists && waists.map(item => (
//     <> 
//     <input type="checkbox" name={item.name} value={item.id} onChange={checkItem}/>    
//     <label > {item.name}</label><br></br>
//     </>
//   ));
//   const itemCheckList_head = heads && heads.map(item => (
//     <> 
//     <input type="checkbox" name={item.name} value={item.id} onChange={checkItem}/>    
//     <label > {item.name}</label><br></br>
//     </>
//   ));
//   const itemCheckList_underware = underwares && underwares.map(item => (
//     <> 
//     <input type="checkbox" name={item.name} value={item.id} onChange={checkItem}/>    
//     <label > {item.name}</label><br></br>
//     </>
//   ));
//   const itemCheckList_pants = pants && pants.map(item => (
//     <> 
//     <input type="checkbox" name={item.name} value={item.id} onChange={checkItem}/>    
//     <label > {item.name}</label><br></br>
//     </>
//   ));
//   const itemCheckList_accessory = accessories && accessories.map(item => (
//     <> 
//     <input type="checkbox" name={item.name} value={item.id} onChange={checkItem}/>    
//     <label > {item.name}</label><br></br>
//     </>
//   ));
//   const itemCheckList_foot = foots && foots.map(item => (
//     <> 
//     <input type="checkbox" name={item.name} value={item.id} onChange={checkItem}/>    
//     <label > {item.name}</label><br></br>
//     </>
//   ));

  
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

  const changePage = (page) =>{
    setItems(itempages[page])
  }

  const previousePage = ()=>{
    var cpage = currentPage;
    cpage--;
    setCurrentPage(cpage);
    setItems(itempages[cpage]);
  }

  const nextPage = () => {
    var cpage = currentPage;
    cpage++;
    setCurrentPage(cpage);
    setItems(itempages[cpage]);
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

          <div className="mt-3">
            Sort:
            <select name="sort" id="sort">
              <option value="category">Item Category</option>
              <option value="name">Item Name</option>
              <option value="numer">Item #</option>
            </select>
            Filter:
            <select name="filter" id="filter">
              <option value="category">Item Category</option>
              <option value="name">Item Name</option>
            
            </select>
           </div> 
          <div className="grid grid-cols-3 mt-3">


            <div className="inline-block  align-middle">
              {activeFilter == "items" && currentPage > 0 &&
              <div className="text-center cursor-pointer " onClick={previousePage}>
                {"\<\<"}
            </div>
            }
            </div>
            <div className="grid-span-3">
              {activeFilter == "items" && itemlist}          
              {activeFilter == "bundles" && bundlelist}
            </div>
            <div>

            {currentPage < itempages.length-1 && <div className="text-center cursor-pointer " onClick={nextPage}>           
                {"\>\>"}
              </div>}
            </div>
            
          </div>
          

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
