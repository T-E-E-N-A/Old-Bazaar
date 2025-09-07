// going to use AJAX 

const allLikeButton = document.querySelectorAll('.like-btn')

async function like(productId,btn){
    try{
        // sent post request without refreshing page
        let response = await axios({
            method: 'post',
            url: `/product/${productId}/like`,
            headers: {'X-Requested-With': 'XMLHttpRequest'},
        })

        // change the button status toggle case
        if(btn.children[0].classList.contains('fas')){
            btn.children[0].classList.remove('fas')
            btn.children[0].classList.add('far')
        } else{
            btn.children[0].classList.remove('far')
            btn.children[0].classList.add('fas')
        }
        
    }
    catch(error){
        // can't do res.send or render
        console.log(error);
        window.location.replace('/login')
    }
}

for(let btn of allLikeButton){
    btn.addEventListener('click' , ()=>{
        let productId = btn.getAttribute('product-id'); 
        like(productId,btn);
    })
}