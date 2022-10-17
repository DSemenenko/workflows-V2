import React, {useState, useEffect}  from "react";
import Form from "../Form/Form";
import Header from "../Header/Header";
import './Base.css'
import * as GetService from '../API/GetService'




// export default getchatid () {
    
// }


const Base = () => {

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