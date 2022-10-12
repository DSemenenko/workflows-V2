// import axios from "axios";
// import React from "react";
// export default class GetService{
//     static async getAll(){
//         try{    
            
            
//             if(window.Telegram.WebApp.initDataUnsafe.user == undefined){
//                 const tele_id = window.Telegram.WebApp;
//                 const chatIdTelegram = 5591115278; //tele_id.initDataUnsafe.user.id
//                 console.log('Telegram ID.......', chatIdTelegram);

                
//                 //const url = "https://crm.axcap.ae/rest/1/y9x9q1wmj1mwq5bu/crm.lead.get.json?id=" + param1; 5591115278
//                 const url = "https://crm.axcap.ae/local/webhooks/get_user_by_tid.php?api_key=eLag57bO84&tid=" + chatIdTelegram;       
//                 const crm_id = await axios.get(url);
//                 console.log('ID', crm_id.data)

//                 const mtid = "https://crm.axcap.ae/local/webhooks/get_mtid_by_uid.php?api_key=eLag57bO84&uid=" + crm_id.data;
//                 const chat_id = await axios.get(mtid);
//                 console.log('чат', chat_id.data);

//             }else{
//                 console.log('empty')
//             }
            

            
        
            
//             // else if () {
                
//             // } else{

//             // }
            

//         } catch (e){
//             console.log('Ошииииииииииииибка', e); 
//         }
//     }
// }

    