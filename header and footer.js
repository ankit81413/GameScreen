
function attachCSS(url, attempts) {
    var cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = url;

    cssLink.onload = function () {
        console.log("CSS file attached successfully.");
    };

    cssLink.onerror = function () {
      console.log("errorr");
        if (attempts > 0) {
            console.log("Failed to fetch CSS file. Retrying...");
            attachCSS(url, attempts - 1);
        } else {
            console.error("Failed to fetch CSS file after multiple attempts.");
        }
    };

    document.head.appendChild(cssLink);
}

// Call the function with the URL of the CSS file and the number of attempts
attachCSS("style.css", 3); // Replace "styles.css" with your CSS file path



window.onload = function(){
  addcss();
  // appendDivAtStart();
  appendDivToEndOfPage();
}

function addcss() {
  var style = document.createElement('style');
  style.innerHTML = `
      /* New styles to be appended */
      .footer a,.footer p,.footer i{
        font-size:18px;
      }

      body{
        padding:0px;
      }
      .footer{
        margin:0px;
      }

      header ul li a{
        font-size:16px;
      }

      #wallpaper-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        background-color: rgba(0, 0, 0, 4%);
        border-radius: 10px;
      }

      #close_sidebar i{
        font-size:16px;
      }

      
      /* You can add more styles as needed */
  `;
  document.head.appendChild(style);
};





function appendDivAtStart() {
    // Create a new div element
    var newDiv = document.createElement("div");
    newDiv.innerHTML = `  <div class="sidebar" id="sidebar">
    <div class="sidebar_content">
      <div class="close_icon" id="close_sidebar">
        <i class="fa-solid fa-xmark"></i>
      </div>
      <!-- <span class="close_icon" id="close_sidebar"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
          <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
        </svg></span> -->
      <!-- Sidebar content goes here -->
      <h3>Sidebar Menu</h3>
      <ul>

        <li><a href="auto search.html"><input type="text" id="searchbar"></a></li>
        <li><a href="index.html">Home</a></li>
        <li><a href="latest.html">Latest</a></li>
        <li><a href="search with code.html">Search with code</a></li>
        <li><a href="saved.html">Saved</a></li>
        <li><a href="About Us.html">About Us</a></li>
        <li><a href="Contact Us.html">Contact Us</a></li>
        <li><a href="Terms and Conditions.html">Terms and Conditions</a></li>
        <li><a href="Privacy policy.html">Privacy Policy</a></li>
        <li><a href="Copyright Policy.html">Copyright Policy</a></li>
        <li><a href="sitemap.html">SiteMap</a></li>
        <li><a href="settings.html">Settings</a></li>

      </ul>
    </div>
  </div>
  <div class="sidebar_background" id="sidebar_background">

  </div>




  <header>


    <a href="index.html">
      <div id="logo">
        <img src="logo\\logo.png" alt="G" id="logo_image">
        <h1>GAME SCREEN</h1>
      </div>
    </a>
    <ul id="optionbar">
      <li class="option"><a href="latest.html">Latest</a></li>
      <li class="option"><a href="auto search.html">Search</a></li>
      <li class="option"><a href="saved.html">Saved</a></li>
      <li class="option"><a onclick="openmore()" id="more_a">more</a></li>
    </ul>

    <div id="more_box">
      <ul id="more_option_box">
        <li class="more_options"><a href="search with code.html">Search with code</a></li>
        <li class="more_options"><a href="About Us.html">About Us</a></li>
        <li class="more_options"><a href="Contact Us.html">Contact Us</a></li>
        <li class="more_options"><a href="Terms and Conditions.html">Terms and Conditions</a></li>
        <li class="more_options"><a href="Privacy policy.html">Privacy Policy</a></li>
        <li class="more_options"><a href="Copyright Policy.html">Copyright Policy</a></li>
        <li class="more_options"><a href="Sitemap.html">SiteMap</a></li>
        <li class="more_options"><a href="settings.html">Settings</a></li>
      </ul>
    </div>



    <i class="fa-solid fa-bars" id="open_sidebar"></i>

    <!--<div id="mobile_optionbar">
      <ul id="mobile_option_list" class="show">
        <div id="close_sidebar">
          <i class="fa-solid fa-xmark"></i>
        </div>
        <li class="mobile_option"><a href="">Option</a></li>
        <li class="mobile_option"><a href="">Option</a></li>
        <li class="mobile_option"><a href="">Option</a></li>
        <li class="mobile_option"><a href="">Option</a></li>
        <li class="mobile_option"><a href="">Option</a></li>
        <li class="mobile_option"><a href="">Option</a></li>
        <li class="mobile_option"><a href="">Option</a></li>
        <li class="mobile_option"><a href="">Option</a></li>
      </ul>
    </div> -->






  </header>`;

    // Get a reference to the first element in the body (could be any element)
    var firstElement = document.body.firstChild;

    // Insert the new div before the first element
    document.body.insertBefore(newDiv, firstElement);
}

// Call the function to append the div at the start
appendDivAtStart();






function appendDivToEndOfPage() {
    // Create a new div element
    var newDiv = document.createElement("div");

    // Set some content and styling for the new div
    newDiv.innerHTML = `
    
  <div class="footer">
  <div class="footer-content">
    <div class="footer-section">
      <h3>GAME SCREEN</h3>
      <p>Welcome to our Gamescreen! We strive to provide the best collection of high-quality wallpapers for
        your devices.</p>
    </div>
    <div class="footer-section">
      <h3 class="center">Explore</h3>
      <ul class="footer-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="latest.html">latest</a></li>
        <li><a href="About Us.html">About Us</a></li>
        <li><a href="Contact Us.html">Contact</a></li>
      </ul>
    </div>
    <div class="footer-section">
      <h3>Contact</h3>
      <p>Email: gamescreen2424@gmail.com</p>
      <!-- <p>Youtube: Gamescreen</p> -->
      <a href="https://youtube.com/@Gamescreen-kp9qy?si=4ZfnIlQTciAu7Vk_" class="contact_link youtube"><i
          class="fa-brands fa-youtube"></i>
        Youtube: Gamescreen</a><br>

      <a href="https://www.instagram.com/_gamescreen?igsh=bDVvNzVkcWhrbTZh" class="contact_link insta"><i
          class="fa-brands fa-instagram"></i>
        Instagram: _gamescreen</a>


      <!-- <p>Instagram: _gamescreen</p> -->
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2023 Gamescreen. All Rights Reserved.</p>
  </div>
</div>

    `;
    newDiv.style.backgroundColor = "lightblue";
    // newDiv.style.padding = "20px";
    // newDiv.style.marginTop = "20px";

    // Append the new div to the end of the body
    document.body.appendChild(newDiv);
}

// Call the function to append the div at the end of the page
// appendDivToEndOfPage();




function openmore() {
  let more_box = document.getElementById("more_box");
  console.log("fghjk");

  if (more_box.style.display == "block") {
    more_box.style.display = "none";
  } else {
    more_box.style.display = "block";
  }

  // Prevent the click event from propagating to the document
  event.stopPropagation();
}

document.addEventListener("click", function () {

  let more_box = document.getElementById("more_box");
  more_box.style.display = "none";
});


const display = document.querySelector('#display_content');


















const openSidebarButton = document.getElementById('open_sidebar');
const sidebarBackground = document.getElementById('sidebar_background');
const closeSidebarButton = document.getElementById('close_sidebar');
const sidebar = document.getElementById('sidebar');

openSidebarButton.addEventListener('click', function (e) {
  e.stopPropagation(); // Prevent the click event from reaching the document
  sidebar.classList.add('show')
  sidebarBackground.classList.add('opened_sidebar_background');



});


closeSidebarButton.addEventListener('click', function () {
  sidebar.classList.remove('show');
  //option_palal.classList.remove('opened_option_panal')
  sidebarBackground.classList.remove('opened_sidebar_background');

});

// Add an event listener to the document to close the sidebar when clicking anywhere outside
document.addEventListener('click', function (e) {
  if (!sidebar.contains(e.target)) {
    sidebar.classList.remove('show');
    //option_palal.classList.remove('opened_option_panal')

    sidebarBackground.classList.remove('opened_sidebar_background');

  }
});



