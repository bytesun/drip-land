import React from "react";


export default function Sortby(props){

  function handleSelect(e){
    console.log("select option: "+e.target.value);
    props.sort(e.target.value)
}
    return(
        <div className="">Sort by         
          <select className="bg-gray-500 ..." onChange={handleSelect}>
            <option value="price">Price</option>
            <option value="rarity">Rarity</option>
            
          </select>

      </div>
    )

}