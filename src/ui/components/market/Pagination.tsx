
import React, { useEffect, useState } from "react";

export default function Pagination(props){
    const [page,setPage] = useState(props.page);
    const [pages, setPages] = useState([1])
    const pageSize=12;
    let pageCount =1;
    useEffect(()=>{
        const total = props.total;
        

        if(total > pageSize){
            if(total % pageSize == 0) pageCount = total %pageSize;
            else pageCount = total % pageSize +1;
           
        }
        console.log("page count:"+pageCount)
        let npages = [];
        for(let i=1;i<=pageCount;i++){
            npages.push(i);
        }
        setPages(npages);
    },[])
    
    const pageList = pages.map(page=><a onClick={()=>handleChange(page)} href="#">{page} {pageCount > page && "|"} </a>);

    function handleChange(page){
        props.goto(page)
    }
    return (
        <nav>
            {pageList}
        </nav>
    )
}