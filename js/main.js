// Dummy function for  "html" used before "template string " in innerHtml file to
// enable different color inside Template String"
// const html = (strings, ...values) => strings.join('');

// error-show container id---global declaration
const errorShow = document.getElementById("error-msg");
const showAll = document.getElementById('show-all');


// displayData function
const displayData = (posts, isShowAll) => {
  // updating error msg, if search context is unavailable
  if (posts.length < 1) {
    errorShow.classList.remove('text-green-400');
    errorShow.classList.add('text-red-600')
    errorShow.textContent = "This context is not available";
  }
  // customizing error show container if context is available
  else if (posts.length > 0 && posts.length < 4) {
    errorShow.classList.remove('text-red-600');
    errorShow.classList.add('text-green-400');
    errorShow.textContent = "Search Successful";
  }
  else {
    errorShow.textContent = " ";
  }
  //  slice to enable show all button
  if (posts.length > 3 && !isShowAll) {
    posts = posts.slice(0, 3)
    showAll.classList.remove('hidden')
  }

  // getting card container
  const cardContainer = document.getElementById("dynamic-card-container");
  //  for each loop
  posts.forEach((post) => {
    const card = document.createElement("div");
    card.classList = `bg-[#797DFC1A] rounded-2xl lg:rounded-3xl lg:p-10 p-5 flex lg:gap-6 gap-2 items-start`;

    //  card inner html structure , made in html then pasted here
    card.innerHTML = `
  <div class="w-1/3">
   <img class="w-full h-full rounded-2xl object-cover object-center" src="${post.image
      }" alt="" />
</div>
<!-- content div -->
<div class="flex flex-col lg:gap-10 gap-2">
  <!-- #music div -->
  <div class="flex items-center gap-2 lg:gap-5">
    <!-- category -->
    <p class="font-bold">Category#${post.category}</p>
    <!-- author -->
    <p class="font-bold">Author: ${post.author?.name ? post.author.name : "No author"}</p>
  </div>
  <!-- title div -->
  <div>
    <!-- title -->
    <p class="font-extrabold">${post.title}</p>
  </div>
  <!-- description div -->
  <div>
    <!-- description -->
    <p>${post.description}</p>
  </div>
  <!-- Icons and button div -->
  <div class="flex items-center justify-between">
    <!-- icon div container -->
    <div class="flex gap-2 lg:gap-12 items-center">
      <!-- comment_count icon  -->
      <div class="flex gap-1  items-center">
      <img src="svg/msg.svg" alt="" "></img>
      <span class="ml-1 lg:ml-1">${post.comment_count}</span>
      </div>
      <!-- view_count icon  -->
     <div class="flex gap-1 items-center">
      <img src="svg/eye.svg" alt=""> </img>
      <span class="ml-1 lg:ml-1">${post.view_count}</span>
      </div>
     
      <!-- posted_time icon  -->
      <div class="flex gap-1 items-center">
      <img src="svg/time.svg" alt=""></img>
      <span class="ml-1 lg:ml-1">${post.posted_time}</span>
      </div>
     
    </div>
    <!-- icon div end -->
    
    <!-- button div start-->
    <div>
      <button><img src="svg/mail.svg" alt=""></button>
    </div>

  </div>
</div>`;
    // innerHtml for individual card is completed

    // appending child into  card container
    cardContainer.appendChild(card);
  })
};


// getData function
const getData = async (searchText, isShowAll) => {
  let res;
  try {
    if (searchText.trim() === "") {
      res = await fetch(
        `https://openapi.programming-hero.com/api/retro-forum/posts?category=`
      );

    }
    res = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`
    );
    const data = await res.json();
    const posts = data.posts;

    console.log(posts);
    // passing this array data into another function and make them display for each object
    displayData(posts);
  } catch (error) {
    console.error(error.message);
    errorShow.textContent = error.message;
  }
};


// btnClicked function
const btnClicked = (isShowAll) => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  getData(searchText, isShowAll);
  setTimeout(() => {
    searchField.value = '';
  }, 500);
};
