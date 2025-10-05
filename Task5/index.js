const fetchData = async () =>
{
    try{
        const res = await fetch("https://dummyjson.com/products?limit=5");
        const data = await res.json();
        console.log(data.products)
        displayData(data.products)
    }
    catch(err)
    {
        console.log(err)
    }
}
fetchData()
const topDiv=document.getElementById('top')
function displayData(data)
{
  console.log(data);
  data.forEach((v,i) =>
  {
   const pDiv = document.createElement('div');
   pDiv.classList.add('card')
   const img =  document.createElement('img');
   img.src = v.thumbnail;
   img.alt = v.title;
   img.classList.add('card-img-top')
   const title =  document.createElement('h2');
   title.textContent = v.title;
   title.classList.add('card-title')
   const price = document.createElement('p');
   price.textContent ="$"+v.price
   price.classList.add('card-text')
   const addcart = document.createElement('button');
   addcart.textContent = "Add To Cart"
   addcart.classList.add('btn','btn-outline-success')
   pDiv.append(img,title,price,addcart);
   topDiv.appendChild(pDiv)
  })

}