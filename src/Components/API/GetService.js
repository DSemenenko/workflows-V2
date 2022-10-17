const tele_id = window.Telegram.WebApp;
const chatIdTelegram = tele_id.initDataUnsafe.user.id
console.log('Telegram ID.......', chatIdTelegram); 

const chatIdfromapp = {
    'chatid': chatIdTelegram
}

console.log(chatIdfromapp)

module.exports = {chatIdfromapp}