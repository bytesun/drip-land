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

  const [items, setItems] = useState([])
  const [count,setCount] = useState(items.length);
  const [selectedItem, setSelectedItem] = useState<TypedItem>(null);
  const [itemtype, setItemtype] = useState("Drip");

  useEffect(() => {
    if (selectedItem) {
      const newSelectedItem = inventory.data.find(
        ({ id }) => id === selectedItem.id
      );
      setSelectedItem(newSelectedItem);
    }
    var titems = [];
    inventory.data && inventory.data.map(i=>{
      if(i.type == itemtype)titems.push(i);
    });
    setItems(titems);
    setCount(titems.length);
  }, [inventory.data,itemtype]);


  return (
    <div className="w-full flex flex-col-reverse sm:flex-row">
      <div className="p-4">
        <div>
          My Bag
          
          {inventory.isSuccess && ` (${count} ${pluralize("item", count)})`}
          {inventory.isFetching && (
            <AiOutlineLoading className="ml-2 inline-block animate-spin" />
          )}
          {inventory.isSuccess && <BundleModal items={inventory.data}/>}
        </div>

        <div className="grid grid-cols-12 gap-2">
          <div className="mt-2 flex-co col-span-2">
              <div className="bg-gray-400"> Drip Bundles</div>
              <div className="text-right cursor-pointer" onClick={()=>setItemtype("Drip")}>IC Drips</div>
              <div className="bg-gray-400"> Drip Gear</div>
              <div  className="text-right cursor-pointer"  onClick={()=>setItemtype("Bag")}> Items</div>
              <div className="text-right cursor-pointer"  onClick={()=>setItemtype("Tune")}> Tunes</div>
          </div>
            
        
        <div className="mt-2 flex flex-wrap items-stretch col-span-10 gap-2">
          {!inventory.isSuccess ? (
            <div className="w-full text-white text-center">
              Getting your things together...
            </div>
          ) : (
            Array.from({ length: Math.max(count, MINIMUM_ITEMS) }, (_, i) => {
              if (i < count) {
                const item = items[i];

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

      {inventory.isSuccess && (
        <div className="w-full sm:flex-none sm:w-72 p-4 bg-drip-purple-400 shadow-md">
          <div>{selectedItem && <ItemDetails item={selectedItem} />}</div>
        </div>
      )}
    </div>
  );
}
