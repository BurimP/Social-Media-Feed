let currentIndex = 0;
const batchSize = 4;

function displayCards(data) {
  const createCard = (
    image,
    caption,
    type,
    sourceType,
    sourceLink,
    date,
    likes,
    name,
    profileImage
  ) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    const cardContent = `
   
    <div class="card-details">
      <div class="card-header">
        <div class="profile-image" style="background-image: url('${profileImage}')"></div>
        <div class="card-header-info">
          <h3>${name}</h3>
          <p class="date">${date}</p>
        </div>
      </div>
      <div class="card-content">
      <img alt=${name} src=${image} class="main-img"/>
        <p>${caption}</p>
      </div>
      <div class="card-footer">
        <div class="likes">
          <i class="fa fa-thumbs-up"></i>
          <span>Likes: ${likes}</span>
        </div>
        <div class="source">
          <a href="${sourceLink}" target="_blank">${sourceType}</a>
        </div>
      </div>
    </div>
  `;

    cardDiv.innerHTML = cardContent;
    return cardDiv;
  };

  const cardContainer = document.getElementById("cardContainer");

  // Determine the range of data to display
  const endIndex = Math.min(currentIndex + batchSize, data.length);
  for (let i = currentIndex; i < endIndex; i++) {
    const item = data[i];
    const card = createCard(
      item.image,
      item.caption,
      item.type,
      item.source_type,
      item.source_link,
      item.date,
      item.likes,
      item.name,
      item.profile_image
    );
    cardContainer.appendChild(card);
  }

  // Update the current index
  currentIndex += batchSize;

  // Check if there are more items to display
  if (currentIndex >= data.length) {
    document.getElementById("loadMoreBtn").style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  document.body.appendChild(lightbox);

  const cardContainer = document.getElementById("cardContainer");

  cardContainer.addEventListener("click", function (event) {
    const clickedElement = event.target;
    if (clickedElement.classList.contains("main-img")) {
      console.log("Clicked");
      lightbox.classList.add("active");
      const img = document.createElement("img");
      img.classList.add("lightbox-image");
      img.src = clickedElement.src;
      //   img.src = `url('${clickedElement.src}')`;
      while (lightbox.firstChild) {
        lightbox.removeChild(lightbox.firstChild);
      }
      lightbox.appendChild(img);
    }
  });

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });
});

fetch("data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    displayCards(data.slice(0, batchSize));

    loadMoreBtn.style.display = "block";
    loadMoreBtn.addEventListener("click", function () {
      displayCards(data);
    });
  })
  .catch((error) => {
    console.log("Error:", error);
  });
