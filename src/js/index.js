const fetching = async (pageNumber, limit) => {
  try {
    const response = await fetch(
      `https://voodoo-sandbox.myshopify.com/products.json?limit=${limit}&page=${pageNumber}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

window.onload = () => {
  const totalPages = 20;
  const itemsPerPage = 24;
  let currentPage = 1;

  const buttonClasses = [
    "h-[39px]",
    "w-[39px]",
    "basis-[39px]",
    "flex",
    "justify-center",
    "items-center",
    "border",
    "border-black",
    "rounded-full",
    "transition-all",
    "duration-200",
    "ease-linear",
    "cursor-pointer",
  ];

  const notActiveButtonClasses = [
    "bg-black",
    "text-white",
    "hover:bg-white",
    "hover:text-black",
  ];

  const activeButtonClasses = [
    "hover:bg-black",
    "hover:text-white",
    "bg-white",
    "text-black",
  ];

  const cardsBody = document.getElementById("cardsBody");
  const paginationButtonsContainer =
    document.getElementById("paginationButtons");

  const showPage = async (pageNumber, button = 0) => {

    const products = await fetching(pageNumber, itemsPerPage);
    cardsBody.innerHTML = "";
    products.forEach((item) => {
      const imageSrc = item.images[0]?.src;
      const title = item.title;
      const price = item.variants[0].price;

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
    });
    setTimeout(() => {
      currentPage = pageNumber;
    }, 0);

    // Затримка перед оновленням стилів неактивних кнопок
    setTimeout(() => {
      const buttons = Array.from(paginationButtonsContainer.children);
      buttons.forEach((btn, index) => {
        if (index + 1 !== pageNumber) {
          btn.classList.remove(...activeButtonClasses);
          btn.classList.add(...notActiveButtonClasses);
        }
        if (index + 1 === pageNumber) {
          btn.classList.add(...activeButtonClasses);
          btn.classList.remove(...notActiveButtonClasses);
        }
      });
    }, 50);
    //  window.scrollTo(0, 0);
  };

  function generatePaginationButtons() {
    for (let i = 1; i <= totalPages; i++) {
		
      const button = document.createElement("button");
      button.classList.add(...buttonClasses);

      if (i === currentPage) {
        button.classList.add(...activeButtonClasses);
      } else {
        button.classList.add(...notActiveButtonClasses);
      }

      button.innerHTML = i;
      button.addEventListener("click", () => showPage(i, button));
      paginationButtonsContainer.appendChild(button);
    }
  }

  generatePaginationButtons();
  showPage(1);
};
