const {Telegraf, Markup} = require('telegraf');
const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body')
//const {chatIdfromapp} = require('../src/Components/API/GetService')

// console.log(chatIdfromapp)

const bot = new Telegraf('5460764354:AAFJq8j0DDivRJABpBGBjYq2BJqcyg7gInc');
bot.telegram.setWebhook(`https://edda-91-72-172-198.in.ngrok.io`)
bot.startWebhook(`/`, null, 3000);


const app = new Koa()
app.use(koaBody())
// app.use(async (ctx, next) => {
//   if (ctx.method !== 'POST' || ctx.url !== '/secret-path') {
//     return next()
//   }
  
//   await bot.handleUpdate(ctx.request.body, ctx.response)
//   ctx.status = 200
//   console.log(ctx.request.body[0].name)
//   const name = ctx.request.body[0].name
//   const from = ctx.request.body[0].from
//   const to = ctx.request.body[0].to
//   const duration = ctx.request.body[0].duration
//   const status = ctx.request.body[0].status
  
//   ctx.reply = bot.telegram.sendMessage(5591115278, `Leave request of ${name}; From ${from} to ${to}, has been ${status} DURATION: ${duration}.`)
// })



// bot.use((ctx) => {
//     console.log(ctx.message)
// })


// bot.message(async (ctx) => {
//     ctx.reply('Это будет тест')
//   })

const startDesc = `
|
|
*Please if you have any questions fill free to contact with our IT team 👨‍💻*
`


const seackLeave =`
You will be eligible for annual leave of twenty four (24) working days per annum. All leave requests must be documented in the CRM without fail. \n
You must indicate the type of leave as annual for the dates to calculate accordingly and indicate the balance. \n
Leave requests are to be planned in advance and submitted two weeks before the scheduled leave date.\n
Annual leave is not to extend beyond a two week period unless it is discussed in advance with your line manager for approval from CEO/Head of Department.
`
const addchat = `
Please find the app below to add the SALES to specific chat.
`




bot.telegram.setMyCommands([
    {command: "/addtochats", description: "Add to Chats ➕💬"},
    {command: "/leaverequest", description: "Leave Request❓"}
])


bot.command('start', async (ctx) =>{
    await ctx.replyWithMarkdown('*👋Grettings from AX Capital Workflows Bot*')
    await ctx.replyWithMarkdown(`${ctx.message.chat.first_name}, * In the lower left corner you will find your standard commands🤔* ` + startDesc)
    console.log(ctx.message.chat.first_name)
})

// bot.start((ctx) => {
//     ctx.replyWithMarkdown('*👋Grettings from AX Capital Workflows Bot*')
//     ctx.replyWithMarkdown("*🤔In the lower left corner you will find your standard commands* " + commandslist)
// })

bot.command('addtochats', async (ctx) => {
    await ctx.reply(addchat, Markup.inlineKeyboard([
        [Markup.button.webApp('Open CRM', 'https://benevolent-biscuit-aa5e51.netlify.app/')],
    ]))
})

bot.command('leaverequest', async (ctx) => {
    await ctx.reply(seackLeave, Markup.inlineKeyboard([
        [Markup.button.webApp('Open CRM', 'https://workflow.axcap.ae/')],
    ]))
    // const leavefromuser = ctx.update.message.from.id;
    // console.log('ID на leave', leavefromuser)
})


bot.command('test', async (ctx) => {
    await ctx.reply('this is test', Markup.inlineKeyboard([
        Markup.button.callback('accept', 'accept'),
        Markup.button.callback('reject', 'reject')
    ]))
    const delete_btn_id = ctx.message.message_id
    console.log(ctx.message.message_id)
})



// if(ctx.message.chat.id = 5591115278){
//     console.log("true")
// }


bot.help((ctx) => {
    ctx.reply('I will send you your Workflows, Activity Stream and Updates about your requests \n\nWorkflows - The place where you can requests different thins(Sick Leave, Vacation, Book a car and etc) \n\nWeb version https://crm.axcap.ae/stream/')
})

// app.use(async (ctx) => {
//     // ctx.body = "Hello world"
//     console.log(ctx.request.body.callback_query);
//     console.log('используется')
//     const data = ctx.request.body.callback_query.message.text
    
//     ctx.reply = bot.telegram.sendMessage(5591115278, `${data}`)
// })

bot.use(function(ctx, next){
        // if(ctx.chat == undefined) return;
        // console.log("Hello World");

        // let data;
        // let message_id;
    
        // if(ctx.message.message_id !== undefined){
        //     message_id = ctx.message.message_id
        // }
        // console.log('message_id', message_id)
        // console.log("Action data", ctx)
        // if (ctx.request !== undefined) {
        //     data = ctx.request.body.callback_query.message.text;
        //     console.log(data);
        //     ctx.reply = bot.telegram.sendMessage(5591115278, `${data}`)
        // } else {
        //     console.log('empty')
        // }

        //console.log(ctx.update.callback_query.message.reply_markup)
        //console.log(ctx.update.callback_query.message.from.id)
        
        next();
        //bot.telegram.sendMessage(5591115278, 'hey');
        let call_data;

        //получаем и разделяем данные 
        if (ctx.update.callback_query !== undefined) {
            console.log(ctx.update.callback_query.data)
            call_data = ctx.update.callback_query.data.split(':');
        } else {
            return
        }
        //console.log('тесты', call_data[2]); 

        //console.log('Маркааааап', ctx.update.callback_query.message.text)
        const ed_mess = ctx.update.callback_query.message.from.id
        const ed_text = ctx.update.callback_query.message.text

        console.log(ctx.update.callback_query.message.from)

        if(call_data[2] !== '0'){
            ctx.editMessageReplyMarkup();
            ctx.editMessageText(ed_text + '\nLeave request has been accepted 🟢🟢🟢')
            ctx.reply = bot.telegram.sendMessage(154679895, `\nYour leave has been accepted`)
        }else if(call_data[2] !== '1'){
            ctx.editMessageReplyMarkup();
            ctx.editMessageText(ed_text + '\nleave request has been rejected 🛑🛑🛑')
        }else{
            return;
        }
        


});


// bot.action('1', async(ctx) => {
//     await ctx.answerCbQuery();
//     ctx.reply('leave has been accepted 🟢🟢🟢')
//     console.log(ctx)
// })

// bot.action('0', async(ctx) => {
//     await ctx.answerCbQuery();
//     ctx.editMessageReplyMarkup();
//     ctx.reply('leave has been rejected 🛑🛑🛑')
//     console.log(ctx)
// })
 
// bot.telegram.setWebhook(`https://185.251.90.198:8443/bot`, {
//     source: `public-nodejs.pem`
// });
 
bot.launch();
//app.listen(3000, () => console.log("Listening on port", 3000));