import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useInventory } from "../../lib/hooks/useInventory";
import { TypedItem } from "../../lib/types";
import { bagUrl, dripUrl } from "../../lib/url";
import { pluralize } from "../../lib/utils";
import { ItemDetails } from "./ItemDetails";
import BundleModal from "./BundleModal";

const MINIMUM_ITEMS = 8;

export function Inventory() {
  const inventory = useInventory();

  const [items, setItems] = useState([]);

  const [drips, setDrips] = useState([]);
  const [bags, setBags] = useState([]);
  const [count,setCount] = useState(items.length);
  const [dripCount, setDripCount] = useState(drips.length);
  const [bagCount, setBagCount] = useState(bags.length);
  

  const [selectedItem, setSelectedItem] = useState<TypedItem>(null);
  const [itemtype, setItemtype] = useState("Drip");
  const [typeItems, setTypeItems] = useState(drips);
  


  useEffect(() => {
    if (selectedItem) {
      const newSelectedItem = inventory.data.find(
        ({ id }) => id === selectedItem.id
      );
      setSelectedItem(newSelectedItem);
    }
    var titems = [];
    var tdrips = [];
    var tbags = [];
    inventory.data && inventory.data.map(i=>{
      if(i.type == "Drip")tdrips.push(i);
      else if(i.type == "Bag") tbags.push(i);
      else titems.push(i);
    });

    setItems(titems);
    setCount(titems.length);

    setDrips(tdrips);
    setDripCount(tdrips.length);

    //setTypeItems(tdrips);
    if(itemtype == "Drip") setTypeItems(drips);
    else if(itemtype == "Bag") setTypeItems(bags);
    else setTypeItems(items);

    setBags(tbags);
    setBagCount(tbags.length);

  }, [inventory.data]);

  function selectType(itemType){
    console.log("select: "+itemType)
    setItemtype(itemType);
    if(itemType == "Drip") setTypeItems(drips);
    else if(itemType == "Bag") setTypeItems(bags);
    else setTypeItems(items);
  }

  return (
    <div className="w-full flex flex-col-reverse sm:flex-row">
      <div className="p-4">
        <div>
          My Bag
          
          {inventory.isSuccess && ` (${inventory.data ?inventory.data.length : 0} ${pluralize("item", inventory.data ?inventory.data.length : 0)})`}
          {inventory.isFetching && (
            <AiOutlineLoading className="ml-2 inline-block animate-spin" />
          )}
          
        </div>

        <div className="grid grid-cols-12 gap-2">
          <div className="mt-2 flex-co col-span-2">
              <div className="bg-gray-400"> Drip Bundles</div>
              <div className="text-right cursor-pointer" onClick={()=>selectType("Drip")}><div className={itemtype == "Drip" ? "text-yellow-500" : ""}>IC Drips({dripCount})</div></div>
              
              <div className="bg-gray-400"> Drip Gear</div>
              <div  className="text-right cursor-pointer"  onClick={()=>selectType("Bag")}> <div className={itemtype == "Bag" ? "text-yellow-500" : ""}>Items({bagCount})</div></div>
              <div className="text-right cursor-pointer"  onClick={()=>selectType("Tune")}> <div className={itemtype == "Tune" ? "text-yellow-500" : ""}>Tunes({count})</div></div>

              <div className="bg-gray-400"> Non-Drip NFTs</div>
              <div  className="text-right cursor-pointer"  onClick={()=>selectType("Astronaut")}><div className={itemtype == "Astronaut" ? "text-yellow-500" : ""}> Inter-Astronauts({count})</div></div>
              <div className="text-right cursor-pointer"  onClick={()=>selectType("IC3D")}> <div className={itemtype == "IC3D" ? "text-yellow-500" : ""}>IC3D NFTs({count})</div></div>
              <div className="text-right cursor-pointer"  onClick={()=>selectType("Moonwalker")}> <div className={itemtype == "Moonwalker" ? "text-yellow-500" : ""}>Moonwalkers({count})</div></div>
              <div className="text-right cursor-pointer"  onClick={()=>selectType("Infernal")}> <div className={itemtype == "Infernal" ? "text-yellow-500" : ""}>Infernal Vampires({count})</div></div>
              <div className="text-right cursor-pointer"  onClick={()=>selectType("Ape")}> <div className={itemtype == "Ape" ? "text-yellow-500" : ""}>IC Apes({count})</div></div>
              <div className="text-right cursor-pointer"  onClick={()=>selectType("Poked")}> <div className={itemtype == "Poked" ? "text-yellow-500" : ""}>Poked Bots({count})</div></div>


          </div>
        <div  className="mt-2 flex flex-wrap items-stretch col-span-10 gap-2">    
        {inventory.isSuccess && itemtype == "Bag" && <BundleModal  items={inventory.data}/>}
        <div className="mt-2 flex flex-wrap items-stretch col-span-10 gap-2">
          
          {!inventory.isSuccess ? (
            <div className="w-full text-white text-center">
              Getting your things together...
            </div>
          ) : (
            
            Array.from({ length: Math.max(typeItems.length, MINIMUM_ITEMS) }, (_, i) => {
              if (i < typeItems.length) {
                const item = typeItems[i];

                return (
                  <div
                    key={i}
                    className={classNames(
                      "relative w-48 h-48 border-2 border-black bg-black hover:ring-2 ring-pink-500 cursor-pointer",
                      {
                        "ring-2 ring-pink-500": selectedItem?.id === item.id,
                      }
                    )}
                    onClick={() => setSelectedItem(item)}
                  >
                    <img
                      src={
                        item.type === "Bag" ? bagUrl(item.id) : dripUrl(item.id)
                      }
                    />
                    {item.extWrapped && (
                      <div className="absolute bg-green-800 opacity-70 right-0 bottom-0 px-2 py-1 text-xs uppercase">
                        Wrapped
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <div key={i} className="border-2 border-black w-48 h-48">
                  <div className="bg-black opacity-10 w-full h-full" />
                </div>
              );
            })
          )}
        </div>
        </div>
        </div>
      </div>

      {inventory.isSuccess && (
        <div className="w-full sm:flex-none sm:w-72 p-4 bg-drip-purple-400 shadow-md">
          <div>{selectedItem && <ItemDetails item={selectedItem} />}</div>
        </div>
      )}
    </div>
  );
}
