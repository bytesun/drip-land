import React, { useState } from "react";
import Footer from "../components/Layout/Footer";

import ListItem from '../components/market/ListItem';
import Category from '../components/market/Category';
import Sortby  from "../components/market/Sortby";
import Pagination from "../components/market/Pagination";

export default function MarketplacePage() {

  const [items,setItems] = useState( [
    {
      id: "459",
      NRI: "99",
      url: "https://d3ttm-qaaaa-aaaai-qam4a-cai.raw.ic0.app/?tokenId=459",
      price: "1.4"
  },

  {
    id: "459",
    NRI: "99",
    url: "https://e3izy-jiaaa-aaaah-qacbq-cai.raw.ic0.app/?tokenid=4sxsr-vakor-uwiaa-aaaaa-b4aaq-maqca-aacdr-q",
    price: "1.9"
},
{
  id: "459",
  NRI: "99",
  url: "https://nbg4r-saaaa-aaaah-qap7a-cai.raw.ic0.app/?tokenid=te6y5-6ikor-uwiaa-aaaaa-b4ad7-yaqca-aabc4-a",
  price: "3"
},
{
  id: "459",
  NRI: "99",
  url: "https://d3ttm-qaaaa-aaaai-qam4a-cai.raw.ic0.app/?tokenId=459",
  price: "6"
},
{
  id: "459",
  NRI: "99",
  url: "https://d3ttm-qaaaa-aaaai-qam4a-cai.raw.ic0.app/?tokenId=459",
  price: "8"
},
]);
  const [page, setPage] = useState(1);
 
  const itemlist = items.map(item => <ListItem id={item.id} NRI={item.NRI} url={item.url} price={item.price}/>)

  function findListByCategory(category){
    console.log("select category:"+category)
  }

  function sortby(sortby){
    console.log("select sortby:"+sortby)
  }

  function changePage(page){
    console.log("change page to :"+page)
  }

  return (
    <>
      
      <div className="p-8">
        
       <div className="text-center" ><Category filter={findListByCategory}/></div>
       <div><Sortby sort={sortby}/></div>
       <div className="text-right"><Pagination total={items.length} page={page} goto={changePage}/></div>
        

        <div className="flex flex-wrap flex-row gap-8 ...">          
          {itemlist}
        </div>
      </div>
      <Footer />
    </>
  );
}
