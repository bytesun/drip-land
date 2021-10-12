import React from "react";

/**
 * Items (NFTs) in marketplace
 * @returns 
 */
export default function ListItem(props){

    return (
        <div className=" w-96 h-100 border-2 p-4 border-black bg-white hover:ring-2 ring-pink-500 cursor-pointer">
            
              <div className="flex flex-col-2 h-10 text-black"> 
              <div className="w-48">#{props.id}</div>
              <div className="w-48 text-right">NRI: {props.NRI}%<div className="inline text-red-500">*</div></div></div>
              <div className="w-84 h-84"><img src={props.url}/></div>
              <div className="h-10 text-black text-center font-bold text-2xl">{props.price} ICP</div>
            
      </div>
    );
}