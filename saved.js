/*const currentURL = window.location.href;


const urlParams = new URLSearchParams(new URL(currentURL).search);

let value = urlParams.get('value');

let highlighted_wallpaper;

function highlight_wallpaper(){

  if (value == "" || value == null) {
    highlighted_wallpaper = null;
    highlighted_wallpaper = "0001";
  } else {
    highlighted_wallpaper = value;
  }
 console.log(highlighted_wallpaper)
};

*/







// next programming
var originaljson;

let retryCount = 0;

function loadJsonFilesWithRetries() {
  if (retryCount < 3) {
    console.log('try num ' + retryCount);
    fetch("wallpapers.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error('wallpaper.json - Network response was not OK');
        }
        return response.json();
      })
      .then((data) => {
        originaljson = data;
        console.log(originaljson);
        loadwallpapers();
        highlightMatchingProduct();
        // fetch("products.json")
        //   .then((response) => {
        //     if (!response.ok) {
        //       throw new Error('products.json - Network response was not OK');
        //     }
        //     return response.json();
        //   })
        //   .then((data2) => {
        //     products_json = data2;
        //     createproductarea(originaljson);
        //     createfooter();
        //     provide_search_data();
        //   })
        // .catch((error) => {
        //   // Handle errors for the second JSON file
        //   console.error("Error loading products.json:", error);
        // });
      })
      .catch((error) => {
        // Handle errors for the first JSON file
        console.error("Error loading wallpaper.json:", error);
        retryCount++; // Increment retry count
        loadJsonFilesWithRetries(); // Retry loading the JSON files
      });
  } else {
    // Show an alert if all retries fail
    alert("Failed to load JSON files after 3 attempts");
  }
}

// Start loading JSON files with retries
loadJsonFilesWithRetries();









// document.getElementById("wallpaper-container").innerHTML="";

let shuffled_wallpapers;

let wallpaper_load_count;
let load_count_select = localStorage.getItem("load_count_select");




if (load_count_select == null || load_count_select == "") {
  wallpaper_load_count = 10;
} else {
  wallpaper_load_count = parseInt(load_count_select);
}


var wallpaper_count = -1;
// let next_showable_wallpapewr = wallpaper_count + wallpaper_load_count +1;
let next_showable_wallpapewr = 0;
let shuffledKeys = JSON.parse(localStorage.getItem("savedValues"));




console.log(shuffledKeys);
let total_wallpapers;


if (shuffledKeys) {
  total_wallpapers = shuffledKeys.length;
} else {
  loadwallpapers = function () { };
}




// -----------DEFAULT-------------
let thumb_quality_select = localStorage.getItem("thumb_quality_select");
console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
console.log(thumb_quality_select);


function give_max_least_quality(product_code, min_max) {

  let download_options_raw = originaljson[product_code].link;



  let keys = Object.keys(download_options_raw);
  let order = ['4k', '2k', '1080', '720', '510', '480'];

  let download_options = keys.sort((a, b) => {
    let indexA = order.indexOf(a);
    let indexB = order.indexOf(b);


    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }

    if (indexA !== -1) {
      return -1;
    }
    if (indexB !== -1) {
      return 1;
    }

    return 0;
  });


  let total_download_options = download_options.length;
  let return_value;


  if (min_max == "max") {

    console.log("MMMMMMMax of " + product_code + " is " + download_options[0]);
    return_value = download_options[0];

  } else if (min_max == "min") {

    console.log("MMMMMMMin of " + product_code + " is " + download_options[(total_download_options) - 1]);
    return_value = download_options[(total_download_options) - 1];

  } else {

    if (download_options.includes(min_max)) {
      return_value = min_max;
    } else {
      return_value = "false";
    }



  }


  console.log("ulllllllllllllllllllllllllllllllll");
  console.log(download_options);




  return return_value;





}




let default_video_thumb_quality;


function get_quality(codee) {


  let return_value = "1080";

  switch (thumb_quality_select) {
    case "Max_quality":
      return_value = give_max_least_quality(codee, "max");
      break;

    case "1080":
      return_value = give_max_least_quality(codee, "1080");

      break;

    case "480":
      return_value = give_max_least_quality(codee, "480");

      break;

    case "720":
      return_value = give_max_least_quality(codee, "720");

      break;

    case "lowest_quality":
      return_value = give_max_least_quality(codee, "min");

      break;

    default:
      return_value = give_max_least_quality(codee, "min");

      break;


  }



  if (return_value == "false") {
    return_value = give_max_least_quality(codee, "min");
    console.log("false quality");
  }

  return return_value;

}













function loadwallpapers() {
  console.log("loadingggggggggggggggggggggggggggggggggggggggggggg");
  console.log(originaljson);
  // let shuffledKeys = shuffleKeys(originaljson);
  shuffled_wallpapers = shuffledKeys;
  console.log("shufflrd keys \n\n\n" + shuffledKeys);
  let wallpaper_container = document.getElementById("wallpaper-container");


  // for (let i = next_showable_wallpapewr; i < (next_showable_wallpapewr + wallpaper_load_count); i++) {
  for (let i = next_showable_wallpapewr; i < Math.min(next_showable_wallpapewr + wallpaper_load_count, shuffledKeys.length); i++) {

    let present_wallpaper_code = shuffledKeys[i];
    console.log("ppppppppppppppppppppppppppppppppppppppppppppp");
    console.log(present_wallpaper_code);
    let present_wallpaper_type_short = originaljson[present_wallpaper_code]["type"];
    let present_wallpaper_orientation_short = originaljson[present_wallpaper_code]["orientation"];
    let present_wallpaper_name = originaljson[present_wallpaper_code]["name"];
    let present_wallpaper_thumbnaiL = originaljson[present_wallpaper_code]["thumbnail"];
    let present_wallpaper_orientation;
    let preciew_innerhtml = "";
    // next_showable_wallpapewr++;

    let thumb_quality = get_quality(present_wallpaper_code)
    console.log("thumb_quality \n\n\n\n" + thumb_quality);

    let video_thumbnail = originaljson[present_wallpaper_code]["link"][thumb_quality][1];




    // next_showable_wallpapewr++;

    wallpaper_count = wallpaper_count + 1;
    console.log(wallpaper_count);



    switch (present_wallpaper_type_short) {
      case "1":
        preciew_innerhtml = `<a target="_blank" href="image.html?value=` + present_wallpaper_code + `" ><img
        src="` + present_wallpaper_thumbnaiL + `" alt="wallpaper" id="wallpaper` + wallpaper_count + `">`;

        break;


      case "2":
        preciew_innerhtml = `<div class="i_container" onclick="playvideowallpaper(` + wallpaper_count + `,'`+ video_thumbnail +`')"><i class="fa-solid fa-play"></i></div><div class="loader-container" id="loader` + wallpaper_count + `"><div class="loader"></div></div>
        <a target="_blank" href="image.html?value=` + present_wallpaper_code + `" ><video poster="` + present_wallpaper_thumbnaiL + `" loop muted src="" id="wallpaper` + wallpaper_count + `"></video>`;

        break;


      case "3":
        preciew_innerhtml = `<div class="i_container" onclick="playvideowallpaper(` + wallpaper_count + `,'`+ video_thumbnail +`')"><i class="fa-solid fa-play"></i></div><div class="loader-container" id="loader` + wallpaper_count + `"><div class="loader"></div></div>
        <a target="_blank" href="image.html?value=` + present_wallpaper_code + `" ><video poster="` + present_wallpaper_thumbnaiL + `" loop muted src="" id="wallpaper` + wallpaper_count + `"></video>`;

        break;


      case "P2":
        preciew_innerhtml = `<div class="i_container" onclick="playvideowallpaper(` + wallpaper_count + `,'`+ video_thumbnail +`')"><i class="fa-solid fa-play"></i></div><div class="loader-container" id="loader` + wallpaper_count + `"><div class="loader"></div></div>
        <a target="_blank" href="image.html?value=` + present_wallpaper_code + `" ><video poster="` + present_wallpaper_thumbnaiL + `" loop muted src="" id="wallpaper` + wallpaper_count + `"></video>`;

        break;


      case "P3":
        preciew_innerhtml = `<div class="i_container" onclick="playvideowallpaper(` + wallpaper_count + `,'`+ video_thumbnail +`')"><i class="fa-solid fa-play"></i></div><div class="loader-container" id="loader` + wallpaper_count + `"><div class="loader"></div></div>
        <a target="_blank" href="image.html?value=` + present_wallpaper_code + `" ><video poster="` + present_wallpaper_thumbnaiL + `" loop muted  id="wallpaper` + wallpaper_count + `"></video>`;

        break;


      default:
        preciew_innerhtml = `<a target="_blank" href="image.html?value=` + present_wallpaper_code + `" ><img
        src="` + present_wallpaper_thumbnaiL + `" alt="wallpaper">`;



        break;
    }



    if (present_wallpaper_orientation_short == "land") {
      present_wallpaper_orientation = "landscape";
    } else {
      present_wallpaper_orientation = "portrait";
    }









    let keys = Object.keys(originaljson[present_wallpaper_code]?.link ?? {});
    let order = ['4k', '2k', '1080', '720', '510', '480']; // Define the desired order

    let present_wallpaper_maxquality = order.filter(key => keys.includes(key))[0];



    let present_wallpaper_div = `<div class="wallpaper ` + present_wallpaper_orientation + `"  id="code` + present_wallpaper_code + `">
    <div class="image">` + preciew_innerhtml + ` </a></div>
    <div class="details">
      <h2>` + present_wallpaper_name + `</h2>
      <p>Quality : ` + present_wallpaper_maxquality + `</p>
    </div>
  </div>

`;


    wallpaper_container.innerHTML += present_wallpaper_div;


  }

  console.log("next_showable_wallpapewr" + next_showable_wallpapewr);
  // next_showable_wallpapewr = next_showable_wallpapewr + wallpaper_load_count;
  console.log("total wallpapers" + total_wallpapers);
  console.log("wallpaper counttttttttttttttttttttttttttttttttttt" + wallpaper_count);

  next_showable_wallpapewr = next_showable_wallpapewr + wallpaper_load_count;
}









function loadmore() {
  let spinner = document.querySelector('#loadmore_button i');
  console.log("ggggggggggggggggggggggggggggg");
  console.log(total_wallpapers);
  console.log(next_showable_wallpapewr);
  if (next_showable_wallpapewr < total_wallpapers) {
    console.log("ppppppppppppppppppppppppppppppppppppppppppppp");
    loadwallpapers();
  } else {
    console.log("MAX LIMIT REACHED");
    document.getElementById("loadmore").style.display = "none";
  }
  console.log("next_showable_wallpapewr" + next_showable_wallpapewr);
  // next_showable_wallpapewr = next_showable_wallpapewr + wallpaper_load_count;
  console.log("total wallpapers" + total_wallpapers);
  console.log("total wallpapers" + wallpaper_count);

  console.log("more wallpaper loaded");

  // if (loadstatus == true) {
  //   loadstatus = false;
  //   spinner.style.animation = 'none';
  //   console.log(loadstatus);
  // } else {
  //   loadstatus = true;
  //   spinner.style.animation = 'spin 2s linear infinite';
  //   console.log(loadstatus);

  // }


}









let old_played_video = "no_video";

function playvideowallpaper(playindex , video_link) {

  let video = document.getElementById("wallpaper" + playindex);
  console.log("before adding"+video.src);

  let videosrc = video.src;

  let videoid = "wallpaper" + playindex;

  if (videosrc == video_link) {
    console.log("already done");
  } else {
    video.src = video_link;
  }

  console.log("After adding"+video.src);



  let loader = document.getElementById("loader"+playindex);
  loader.style.display="flex";


  if (video) {
    if (!video.error && video.readyState > 2) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    } else {
      video.play();


    }
  }
  


  updateLoadingBar();
  
  // Listen for the "progress" event to update the loading bar
  video.addEventListener("progress", updateLoadingBar);
  
  function updateLoadingBar() {
    const buffered = video.buffered;
    if (buffered.length > 0) {
      const loadedPercentage = (buffered.end(0) / video.duration) * 100;
      console.log( loadedPercentage + "%");
      if (loadedPercentage <= 99) {
        loader.style.display="none";
      }

    }
  }










  if (old_played_video != "no_video" && videoid != old_played_video) {
    let previous_video = document.getElementById(old_played_video);
    previous_video.pause();
  }
  console.log(old_played_video);

  old_played_video = "wallpaper" + playindex;

}








function highlightMatchingProduct() {
  // Get the URL parameter 'removable_item'
  const urlParams = new URLSearchParams(window.location.search);
  const value = urlParams.get("value");
  //console.log(removableItemValue);
  const bagProductElements = document.querySelectorAll(".bag_product");


  if (value) {
    console.log('Value : ')
    console.log(value)
    //document.getElementById("code"+value).style.backgroundColor="red"
    document.getElementById("code" + value).classList.add("highlighted"); // Add a 'highlighted' class for styling;
    scrollToDiv(value)
  }
}


function scrollToDiv(param) {
  // Get the target div
  var targetDiv = document.getElementById("code" + param);

  var targetY = targetDiv.getBoundingClientRect().top + window.pageYOffset;
  var startingY = window.pageYOffset;
  var distance = targetY - startingY;
  var startTime;

  function scrollAnimation(currentTime) {
    if (startTime === undefined) startTime = currentTime;
    var elapsedTime = currentTime - startTime;
    var scrollProgress = Math.min(elapsedTime / 400, 1); // 200ms transition duration
    var scrollPosition = startingY + (distance * scrollProgress);
    window.scrollTo(0, scrollPosition);

    if (scrollProgress < 1) {
      requestAnimationFrame(scrollAnimation);
    }
  }

  requestAnimationFrame(scrollAnimation);
}







// const openSidebarButton = document.getElementById('open_sidebar');
// const sidebarBackground = document.getElementById('sidebar_background');
// const closeSidebarButton = document.getElementById('close_sidebar');
// const sidebar = document.getElementById('sidebar');

// openSidebarButton.addEventListener('click', function (e) {
//   e.stopPropagation(); // Prevent the click event from reaching the document
//   sidebar.classList.add('show')
//   sidebarBackground.classList.add('opened_sidebar_background');



// });


// closeSidebarButton.addEventListener('click', function () {
//   sidebar.classList.remove('show');
//   //option_palal.classList.remove('opened_option_panal')
//   sidebarBackground.classList.remove('opened_sidebar_background');

// });

// // Add an event listener to the document to close the sidebar when clicking anywhere outside
// document.addEventListener('click', function (e) {
//   if (!sidebar.contains(e.target)) {
//     sidebar.classList.remove('show');
//     //option_palal.classList.remove('opened_option_panal')

//     sidebarBackground.classList.remove('opened_sidebar_background');

//   }
// });



