import React from "react";
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


    const onSubmit = data => {
        
        Object.assign(data, {"IBLOCK_ID": 146})
        //Object.assign(data, {"IBLOCK_CODE": 146})
        Object.assign(data, {"IBLOCK_TYPE_ID": "bitrix_processes"})
        Object.assign(data, {"ELEMENT_CODE": 1241235124})
        Object.assign(data.fields, {"CREATED_BY": 82407})
        Object.assign(data.fields, {"NAME": "LEAVE REQUEST"})
        Object.assign(data.fields, {"PROPERTY_656": 6334})
        console.log('до отправки', data)
        Axios.post('https://crm.axcap.ae/rest/1/y9x9q1wmj1mwq5bu/lists.element.add', 
            data
        )
        .then(function (response){
            console.log(response);
        })
        .catch(function (error){
            console.log(error)
        });

        reset();
        console.log(data)
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
                                {...register("fields[PROPERTY_653]", {required: true})} 
                                type="date" className={`form-control ${errors.PROPERTY_653 && 'is-invalid'}`} id="from" 
                                placeholder="name@example.com" />
                            {errors.PROPERTY_653 && <span className="invalid-feedback">This field is required</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="To" className="form-label">To:</label>
                            <input 
                                {...register("fields[PROPERTY_654]", {required: true})}
                                type="date" className={`form-control  ${errors.PROPERTY_654 && "is-invalid"}`} id="To" 
                                placeholder="name@example.com" />
                            {errors.PROPERTY_654 && <span className="invalid-feedback">This field is required</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="reason" className="form-label">Absence type:</label>
                            <select 
                                {...register('fields[PROPERTY_657]', {required: true})}
                                id="reason"
                                className={`form-select ${errors.PROPERTY_657 && "is-invalid"}`} aria-label="Default select example">
                                <option value="">--Choose the reason--</option>
                                <option value="6337">Absent without reason</option>
                                <option value="6338">Annual leave</option>
                                <option value="6339">Business trip</option>
                                <option value="6340">Maternity leave</option>
                                <option value="6341">Unpaid leave</option>
                                <option value="6342">Personal Calendars</option>
                                <option value="6343">Other</option>
                            </select>
                            {errors.PROPERTY_657 && <span className="invalid-feedback">This field is required</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Notes:</label>
                            <textarea 
                                {...register('fields[PREVIEW_TEXT]', {required: true})}
                                className={`form-control ${errors.PREVIEW_TEXT && "is-invalid"}`} 
                                id="exampleFormControlTextarea1" 
                                rows="3"></textarea>
                                {errors.PREVIEW_TEXT && <span className="invalid-feedback">This field is required</span>}
                        </div>
                        {/* <div className="mb-3">
                            <label htmlFor="formFileMultiple" className="form-label">Documents</label>
                            <input 
                                {...register('docFile', {required: false})}
                                className="form-control" 
                                type="file" id="formFileMultiple" multiple/>
                        </div> */}
                         <input type="submit" className="btn btn-primary" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form;