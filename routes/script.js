

const stripePublicKey = 'pk_test_51N9YCGSEIF6HvjniEsEYPlLdt6aeJ9jASELIrnTn2kyQ6DAyFQoQqibg4vaAaEVxaJ7Xd8tufAqvNA56HXlGGn4L00gYKnGD80';
const stripe = Stripe(stripePublicKey);

async function sendItem(id){
    const quan = document.querySelector(`#${id}`).value
    console.log("i clicked");
    const res =await fetch("/create-checkout-session",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            
                id:id,
                quantity:quan
            
        })
       
        
    })
    const { sessionId } = await res.json();
    console.log(sessionId);
    await stripe.redirectToCheckout({
          sessionId: sessionId
        });

}




// pay.addEventListener("click",sendItem())
