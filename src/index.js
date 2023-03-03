/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const url="https://api.escuelajs.co/api/v1";
/* const url="https://platzi-avo.vercel.app/api/avo"; */
const appMode = document.querySelector('div#app');

const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
    }).format(price);
    return newPrice;
};

async function fetchData(url){
    const respuesta = await window.fetch(url);
    const data = await respuesta.json();
    
    return  data;
};

(async() => {
    try {
        const infoApi = await fetchData(`${url}/products?offset=0&limit=10`);
        const elementDom = [];

        infoApi.forEach((element) => {
            const contaniner = document.createElement('div');
            contaniner.className = "p-6 hover:bg-red-200 grid justify-items-center shadow-md  ";

            const img = document.createElement('img');
            img.src = element.images[0];
            img.className = "h-20 w-20 md:h-32 md:w-32 rounded-full";

            const title = document.createElement('h2');
            title.textContent = element.title;
            title.className = " font-semibold text-2xl text-black-600";

            const price = document.createElement('span');
            price.textContent = "Precio " + formatPrice(element.price);
            price.className = "rounded-full bg-red-100  px-2 py-1 text-xl font-semibold text-black-700";
            
            contaniner.append(img, title, price);
            elementDom.push(contaniner);
        });

        console.log(elementDom);
        appMode.append(...elementDom);

    } catch (error) {
        console.log(error);
    }
})();

