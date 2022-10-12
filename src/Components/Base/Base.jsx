import React, {useState, useEffect}  from "react";
import Form from "../Form/Form";
import Header from "../Header/Header";
import './Base.css'
import GetService from "../API/GetService"

const Base = () => {

    
    // const[data, setData] = useState([]);
    // const[restid, setRestid] = useState([]);

    // async function fetchPosts(){
    //     const posts = await GetService.getAll();
    // }
    // useEffect(() => {
    //     fetchPosts()
    // }, [])

    

    return(
        <>
        <Header/>
        <main>
            <Form/>
        </main>
        </>
    )
}

export default Base;