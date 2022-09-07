console.log('Script is online')


// подсветка категории
let headBtn = document.querySelectorAll('.btn-head-style');


for (let i of headBtn){
  i.addEventListener('click', function(event){
    for(let j of headBtn){
      
            j.classList.remove('btn-active');
        
      
    };
    i.classList.add('btn-active');
  })
}


//filter

/*
let filterBtn = document.querySelector('.filter-btn');
let checkboxBlock = document.querySelector('.checkbox-block')

let n = function(){
    console.log('toggle')
        //появление чекбоксов
        if (filterBtn.classList.contains('btn-active')){
            checkboxBlock.classList.add('display-none');
            console.log('display none')
        }
        if (!filterBtn.classList.contains('btn-active')){
            
            checkboxBlock.classList.remove('display-none');
            console.log('display block')
        }
        filterBtn.classList.toggle('btn-active')
        console.log(checkboxBlock)
}


let sotr = document.querySelector('.sotr');
sotr.addEventListener('click', function(e){
    filterBtn = document.querySelector('.filter-btn');
    console.log(filterBtn);
    console.log(31);
//    filterBtn.removeEventListener('click', n);
    filterBtn.addEventListener('click', n);
})


console.log(filterBtn)
if(filterBtn){
    filterBtn.addEventListener('click', n)
}



*/