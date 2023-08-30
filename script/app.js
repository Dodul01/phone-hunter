// step 1: fetch the data
const fetchData = async (searchValue = '13', isShowAll = false) => {
  const req = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`);
  const res = await req.json();
  const data = res.data;

  showData(data, isShowAll);
}

// step 2: show the data
const showData = (data, isShowAll) => {
  // 1. get the container 
  const phonesContainer = document.getElementById('phones-container');

  //show all validation 
  const showAllBtnContainer = document.getElementById('show-all-container');

  if(data.length > 6 && !isShowAll){
    showAllBtnContainer.classList.remove('hidden');
    data = data.splice(0,6)
  } else{
    showAllBtnContainer.classList.add('hidden');
  }

  if(isShowAll){
    data = data;
  }
  // clear the phones container
  phonesContainer.innerHTML = ' ';
  // 2. make a dynamic card
  data.forEach((phone) => {
    const card = document.createElement('div');
    card.classList.add('card', 'm-4', 'bg-base-100', 'shadow-xl')

    const cardContent = `
    <figure>
      <img src=${phone.image} alt="Shoes" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
      <div class="card-actions justify-end">
        <button onclick="showDetail('${phone.slug}'); my_modal_5.showModal()" class="btn bg-black">Details</button>
      </div>
    </div>
  `;
    card.innerHTML = cardContent;

    // 3. add card to the container
    phonesContainer.appendChild(card);
  })
}

// step 3: search data
const searchPhone = (isShowAll)=>{
  const searchFild = document.getElementById('search-fild');
  const searchValue = searchFild.value;

  fetchData(searchValue, isShowAll);
}

// step 4: show more data
const showAll = () =>{
  searchPhone(true);
}

// step 5: show detail modal
const showDetail = async (phoneId)=>{
  const request = await fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`);
  const response = await request.json();
  const phoneDetais = response.data;
  showDetaisModal(phoneDetais);
}

const showDetaisModal = (phoneDetais) =>{
  const imgTag = document.getElementById('modalImg');
  const phoneNameElm = document.getElementById('phoneName');
  const featuresContainer = document.getElementById('featuresContainer');

  const {image, name} = phoneDetais;
  
  imgTag.src = image;
  phoneNameElm.innerText = name;

  const details = `
    <p><span class="font-semibold">Chip: </span>${phoneDetais.mainFeatures?.chipSet}</p>
    <p><span class="font-semibold">Display Size: </span>${phoneDetais.mainFeatures?.displaySize}</p>
    <p><span class="font-semibold">Memory: </span>${phoneDetais.mainFeatures?.memory}</p>
    <p><span class="font-semibold">Storage: </span>${phoneDetais.mainFeatures?.storage}</p>
    <h3 class="font-semibold text-xl">Extra Fetures</h3>
    <p><span class="font-semibold">Bluetooth: </span>${phoneDetais?.others?.Bluetooth ? phoneDetais?.others?.Bluetooth : 'not available'}</p>
    <p><span class="font-semibold">GPS: </span>${phoneDetais?.others?.GPS ? phoneDetais?.others?.GPS : 'not available'}</p>
    <p><span class="font-semibold">NFC: </span>${phoneDetais?.others?.NFC ? phoneDetais?.others?.NFC : 'not available'}</p>
    <p><span class="font-semibold">USB: </span>${phoneDetais?.others?.USB ? phoneDetais?.others?.USB : 'not available'}</p>
  `
  featuresContainer.innerHTML = details;
}

fetchData();