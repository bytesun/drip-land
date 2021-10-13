import React from "react";

export default function Category(props){

    function handleSelect(e){
        console.log("select option: "+e.target.value);
        props.filter(e.target.value)
    }
    return(
        <div>
            Category: 
            <select className="bg-gray-500 ..." onChange={handleSelect}>
                <option value="hand">Hand</option>
                <option value="shirt">Shirt</option>   
                <option value="head">Head</option>   
                <option value="waist">Waist</option>   
                <option value="foot">Foot</option>   
                <option value="pants">Pants</option>   
                <option value="underware">Underware</option>   
                <option value="acc">Acc</option>              
            </select>
        </div>
    )

}