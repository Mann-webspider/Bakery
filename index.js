
const express = require("express");

require("dotenv").config();

const cors = require("cors")
const app = express();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
app.use(express.json())
app.use(cors({origin:"*",allowedHeaders:"*"}))
// app.use(express.static("routes"))



var url = ""
const setUrl = (newData)=>{
  
  url = newData
}

app.get("/",(req,res)=>{
  res.send("hello")
})

const storeItems = new Map([
    [1,{priceInCents:12386,name:"Crossiant"}],
    [2,{priceInCents:24689,name:"Pan Cakes"}],
    [3,{priceInCents:41287,name:"Bread"}],
    [4,{priceInCents:16515,name:"Sandwich"}]
])



const DOMAIN = "https://bakery-front.vercel.app/"

app.post('/create-checkout-session',cors(), async (req, res) => {
  try{
    console.log("mil gaya")
    const session = await stripe.checkout.sessions.create({
        payment_method_types:['card'],
      
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: req.body.id,
          quantity: req.body.quantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.DOMAIN}/success.html`,
      cancel_url: `${process.env.DOMAIN}/cancel.html`,
      
    });
    setUrl(session.url)
    
    
    res.json({sessionId:session.id});
    
  }catch (e){
  
    console.log(e.massage);
  }
  });

  

app.listen(3000,()=>{
    console.log("server is runninh");
})
