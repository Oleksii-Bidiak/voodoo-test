const fetching = async (page, limit) => {
  try {
    const response = await fetch(
      `https://voodoo-sandbox.myshopify.com/products.json?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data.products);
    return data.products;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

window.onload = () => {
  const page = 1;
  const limit = 24;

  const addCards = async (page, limit) => {
    const products = await fetching(page, limit);
    const cardsBody = document.getElementById("cardsBody");

    for (let i = 0; i < products.length; i++) {
      const imageSrc = products[i]?.images[0]?.src;
      const title = products[i].title;
      const price = products[i].variants[0].price;

      const card = `
			<article class="flex flex-col gap-y-[12px]">
				<img src="${imageSrc}" alt="product image">
				<div class="flex justify-between items-center">
					  <div class="flex flex-col items-start">
						  <div class="leading-none font-bold">${title}</div>
						  <div class="leading-none font-bold">${price} KR</div>
					  </div>
					  <div class="flex flex-col items-end text-end">
						  <div class="leading-none font-medium">Condition</div>
						  <div class="leading-none font-normal">Slightly used</div>
					  </div>
				  </div>
				<div class="transition ease-in-out delay-0 duration-300
					inline-flex 
					items-start 
					justify-center 
					bg-black
					text-white
					p-[16px]
					rounded text-button 
					uppercase
					cursor-pointer
					 hover:bg-gray-700">
				  ADD TO CART
			  </div>
			</article>
		`;

      cardsBody.insertAdjacentHTML("beforeend", card);
    }
  };

  addCards(page, limit);
};
