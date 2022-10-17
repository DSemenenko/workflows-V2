import React, {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import "./Form.css"
import Axios from 'axios';





// const tid_url = 'https://crm.axcap.ae/local/webhooks/get_user_by_tid.php?api_key=eLag57bO84&tid=5591115278'
// const tid_response = Axios.get(tid_url)
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err))
// console.log(tid_response)


// Axios.get('https://crm.axcap.ae/local/webhooks/get_user_by_tid.php?api_key=eLag57bO84&tid=5591115278')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })


const Form = () => {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    
    // data.append('IBLOCK_TYPE_ID', 'bitrix_processes');
    // data.append('ELEMENT_CODE', '84');
    // data.append('FIELDS[CREATED_BY_ID]', '82407');
    // data.append('FIELDS[NAME]', 'LEAVE REQUEST');
    // data.append('FIELDS[PREVIEW_TEXT]', 'notes example');
    // data.append('FIELDS[PROPERTY_653]', '01.11.2022');
    // data.append('FIELDS[PROPERTY_654]', '03.11.2022');
    // data.append('FIELDS[PROPERTY_657]', '6338');
    // data.append('FIELDS[PROPERTY_656]', '6334');

    const[notify, setNotify] = useState('');


    

    //Тащим id из crm 
    // const crmId = "https://crm.axcap.ae/local/webhooks/get_user_by_tid.php?api_key=eLag57bO84&tid=" + chatIdTelegram;

    // const responseCrmId = Axios.get(crmId);
    // console.log('CRM id ====', responseCrmId)
    

    const onSubmit = data => {



        //Тащим айди
        const tele_id = window.Telegram.WebApp;
        const chatIdTelegram = 5591115278; //tele_id.initDataUnsafe.user.id
        //console.log('Telegram ID из сабмит.......', chatIdTelegram); 

        Object.assign(data, {"chatIdTelegram": chatIdTelegram})
        
        Object.assign(data, {"IBLOCK_ID": 146})
        //Object.assign(data, {"IBLOCK_CODE": 146})
        Object.assign(data, {"IBLOCK_TYPE_ID": "bitrix_processes"})
        Object.assign(data, {"ELEMENT_CODE": Date.now()})
        Object.assign(data.fields, {"CREATED_BY": 82407})
        Object.assign(data.fields, {"NAME": "LEAVE REQUEST"})
        Object.assign(data.fields, {"PROPERTY_656": 6334})


        //вытаскиваем регистры
        data.fields.PROPERTY_653 = data.fromDate;
        data.fields.PROPERTY_654 = data.toDate;
        data.fields.PROPERTY_657 = data.absence;
        // data.fields.PREVIEW_TEXT = data.notes;

        delete data.fromDate
        delete data.toDate
        delete data.absence
        //delete data.notes


        //console.log('до отправки', data)
        Axios.post('https://crm.axcap.ae/rest/1/y9x9q1wmj1mwq5bu/lists.element.add', 
            data,
            console.log('отправили', data)
        )
        .then(function (response){
            console.log(response);
        })
        .catch(function (error){
            console.log(error)
        });
        setNotify(<p className="p-2">-- LEAVE REQUEST HAS BEEN SENT --</p>);
        reset();
        //console.log(data)
    };
    

 

    const disablePastDate = () => {
        var today,dd,mm,yyyy;
        today = new Date();
        dd = String(today.getDate() + 1).padStart(2, "0");
        mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    return( 
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <h3 className="mt-4 mb-2 text-white text-center">LEAVE REQUEST</h3>

                    {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
                    <form onSubmit={handleSubmit(onSubmit)} className="form-style">

                        <div className="mb-3">
                            <label htmlFor="from" className="form-label">From:</label>
                            <input 
                                min={disablePastDate()}
                                {...register("fromDate", {required: true})} 
                                type="date" className={`form-control ${errors.fromDate && 'is-invalid'}`} id="from" />
                            {errors.fromDate && <span className="invalid-feedback">This field is required</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="To" className="form-label">To:</label>
                            <input 
                                min={disablePastDate()}
                                {...register("toDate", {required: true})}
                                type="date" className={`form-control  ${errors.toDate && "is-invalid"}`} id="To" 
                                placeholder="name@example.com" />
                            {errors.toDate && <span className="invalid-feedback">This field is required</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="reason" className="form-label">Absence type:</label>
                            <select 
                                {...register('absence', {required: true})}
                                id="reason"
                                className={`form-select ${errors.absence && "is-invalid"}`} aria-label="Default select example">
                                <option value="">--Choose the reason--</option>
                                <option value="6337">Absent without reason</option>
                                <option value="6338">Annual leave</option>
                                <option value="6339">Business trip</option>
                                <option value="6340">Maternity leave</option>
                                <option value="6341">Unpaid leave</option>
                                <option value="6342">Personal Calendars</option>
                                <option value="6343">Other</option>
                            </select>
                            {errors.absence && <span className="invalid-feedback">This field is required</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Notes:</label>
                            <textarea 
                                {...register('fields[PREVIEW_TEXT]', {required: true})}
                                className={`form-control ${errors.PREVIEW_TEXT && "is-invalid"}`} 
                                id="exampleFormControlTextarea1" 
                                placeholder="This field is required"
                                rows="3"/>
                                {errors.PREVIEW_TEXT && <span className="invalid-feedback">This field is required</span>}
                        </div>
                        {/* <div className="mb-3">
                            <label htmlFor="PROPERTY_658" className="form-label">Documents:</label>
                            <div className="input-group">
                                <input {...register("document")} type="file" className="form-control" id="inputGroupFile02"/>
                                <label className="input-group-text" style={{color: "#a25d41"}} htmlFor="inputGroupFile02">Upload</label>
                            </div>
                        </div> */}
                        <div className="bg-success text-white mb-3 rounded">
                            <div className="text-center">
                                {notify}
                            </div>
                        </div>
                         <input type="submit" className="btn btn-danger planned" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form;