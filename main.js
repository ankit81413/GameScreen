function openmore() {
  let more_box = document.getElementById("more_box");

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




function playPause() {
  let playtext = document.querySelector(".play_button h3");

  var vid = document.getElementById("myVideo");
  if (vid.paused) {
    vid.play();
    playtext.innerText = "Pause";
  } else {
    vid.pause();
    playtext.innerText = "Play";
  }

  console.log("hi");
}





// Get the switch element and video element
const autoplaySwitch = document.getElementById("autoplaySwitch");
const video = document.getElementById("myVideo");
const playtext = document.querySelector(".play_button h3");


// Function to handle autoplay based on switch state
function handleAutoplay() {
  if (autoplaySwitch.checked) {
    video.play();
    playtext.innerText = "Pause";
  } else {
    video.pause();
    playtext.innerText = "Play";
  }
}

// Event listener for switch change
autoplaySwitch.addEventListener("change", function () {
  handleAutoplay();
  // Store switch status in localStorage
  localStorage.setItem("autoplayStatus", autoplaySwitch.checked);
});

// Check local storage for previous switch state
const savedAutoplayStatus = localStorage.getItem("autoplayStatus");
if (savedAutoplayStatus === "true") {
  autoplaySwitch.checked = true;
  // handleAutoplay(); // Autoplay if previously set to 'true'
}









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
        llog(originaljson);
        filterByType(originaljson);
        changebanner();
        shuffleKeys(originaljson)
        loadwallpapers();

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




function llog(json) {
  let dataa = Object.keys(json).length;
  console.log(dataa);
}

// name 
// thumbnail
// type=> 0,1,2,P0,P1,P2
// image link{"4k"["size","link"]}
// tags




let videowallpaperarray;

function filterByType(data) {
  let types = ["2", "3", "p2", "p3"];
  let filteredObjects = [];
  for (const key in data) {
    if (types.includes(data[key].type)) {
      // filteredObjects.push({
      //   id: key,
      //   data: data[key]
      // });
      filteredObjects.push(key);
    }
  }
  // return filteredObjects;
  videowallpaperarray = filteredObjects;
  console.log(videowallpaperarray);
  getRandomValueFromArray();
}

// Types to filter (2, 3, p2, p3)


// Get the filtered objects
// let filteredObjects = filterByType(jsonData);

let randomvideowallpaper;
let randomIndex;

function getRandomValueFromArray() {
  let arr = videowallpaperarray;
  if (arr.length === 0) {
    return null; // Return null for an empty array
  }
  randomIndex = Math.floor(Math.random() * arr.length);

  randomvideowallpaper = arr[randomIndex];
}





let preffered_banner_quality = localStorage.getItem('bnnner_quality_select');
console.log("preffered_banner_quality");
console.log(preffered_banner_quality);


function give_max_least_quality2(product_code, min_max) {

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





function get_quality2(codee) {


  let return_value = "1080";

  switch (preffered_banner_quality) {
    case "Max_quality":
      return_value = give_max_least_quality2(codee, "max");
      break;

    case "1080":
      return_value = give_max_least_quality2(codee, "1080");

      break;

    case "480":
      return_value = give_max_least_quality2(codee, "480");

      break;

    case "720":
      return_value = give_max_least_quality2(codee, "720");

      break;

    case "lowest_quality":
      return_value = give_max_least_quality2(codee, "min");

      break;

    default:
      return_value = give_max_least_quality2(codee, "min");

      break;


  }



  if (return_value == "false") {
    return_value = give_max_least_quality2(codee, "min");
    console.log("false quality");
  }

  return return_value;

}










function changebanner() {

  let banner_quality = get_quality2(randomvideowallpaper);
  let presentvideobanner = originaljson[randomvideowallpaper]["link"][banner_quality][1];
  var bannersrc = document.getElementById("bannersrc");
  let videoElement = document.getElementById('myVideo');
  let banner_a = document.getElementById("board_a");
  banner_a.href = "image.html?value=" + randomvideowallpaper;

  bannersrc.src = presentvideobanner;

  videoElement.load();
  handleAutoplay();
  console.log("randomvideowallpaperrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
  // document.querySelector(".play_button h3").innerText = randomvideowallpaper;
  console.log(randomvideowallpaper);
  console.log(presentvideobanner);

}




function prevbanner() {
  console.log("prev");
  console.log(videowallpaperarray);
  console.log(randomIndex);
  if (randomIndex != 0) {
    randomIndex--;


    randomvideowallpaper = videowallpaperarray[randomIndex];

    console.log(randomIndex);
    changebanner()
  }
}

function nextbanner() {
  console.log("next");
  console.log(videowallpaperarray);
  console.log(randomIndex);
  if (randomIndex != (videowallpaperarray.length) - 1) {
    randomIndex++;

    randomvideowallpaper = videowallpaperarray[randomIndex];

    console.log(randomIndex);
    changebanner()
  }
}









// let loadstatus = false;




// Function to be called when loadmore is visible
function onLoadMoreVisible(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Call your function here when loadmore is visible
      console.log('Loadmore section is visible');
      // Replace the console.log above with your function call
    }
  });
}

// Create an intersection observer
const observer = new IntersectionObserver(onLoadMoreVisible, {
  root: null, // Use the viewport as the root
  rootMargin: '0px', // Margin around the root (adjust if needed)
  threshold: 0.5 // 0.5 means when half of the loadmore section is visible
});

// Get the loadmore section
const loadmoreSection = document.getElementById('loadmore');

// Start observing the loadmore section
observer.observe(loadmoreSection);






// document.getElementById("wallpaper-container").innerHTML="";

let shuffled_wallpapers;
let total_wallpapers;

// ---------------DEFAULT-------------

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
let shuffledKeys;


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
  console.log("CODEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
  console.log(codee);
  console.log("CODEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
  console.log(preffered_banner_quality);

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
    let present_wallpaper_type_short = originaljson[present_wallpaper_code]["type"];
    let present_wallpaper_orientation_short = originaljson[present_wallpaper_code]["orientation"];
    let present_wallpaper_name = originaljson[present_wallpaper_code]["name"];
    let present_wallpaper_thumbnaiL = originaljson[present_wallpaper_code]["thumbnail"];
    let present_wallpaper_orientation;
    let preciew_innerhtml = "";

    let thumb_quality = get_quality(present_wallpaper_code)
    console.log("thumb_quality \n\n\n\n" + thumb_quality);

    let video_thumbnail = originaljson[present_wallpaper_code]["link"][thumb_quality][1];



    // next_showable_wallpapewr++;

    wallpaper_count = wallpaper_count + 1;
    console.log(wallpaper_count);



    // switch (present_wallpaper_type_short) {
    //   case "1":
    //     preciew_innerhtml = `<a target="_blank" href="image.html?value=` + present_wallpaper_code + `" ><img
    //     src="` + present_wallpaper_thumbnaiL + `" alt="wallpaper" id="wallpaper` + wallpaper_count + `">`;

    //     break;


    //   case "2":
    //     preciew_innerhtml = `<div class="i_container" onclick="playvideowallpaper(` + wallpaper_count + `)"><i class="fa-solid fa-play"></i></div>
    //     <a target="_blank" href="image.html?value=` + present_wallpaper_code + `" ><video poster="` + present_wallpaper_thumbnaiL + `" loop muted src="` + video_thumbnail + `" id="wallpaper` + wallpaper_count + `"></video>`;

    //     break;


    //   case "3":
    //     preciew_innerhtml = `<div class="i_container" onclick="playvideowallpaper(` + wallpaper_count + `)"><i class="fa-solid fa-play"></i></div>
    //     <a target="_blank" href="image.html?value=` + present_wallpaper_code + `" ><video poster="` + present_wallpaper_thumbnaiL + `" loop muted src="` + video_thumbnail + `" id="wallpaper` + wallpaper_count + `"></video>`;

    //     break;


    //   case "P2":
    //     preciew_innerhtml = `<div class="i_container" onclick="playvideowallpaper(` + wallpaper_count + `)"><i class="fa-solid fa-play"></i></div>
    //     <a target="_blank" href="image.html?value=` + present_wallpaper_code + `" ><video poster="` + present_wallpaper_thumbnaiL + `" loop muted src="` + video_thumbnail + `" id="wallpaper` + wallpaper_count + `"></video>`;

    //     break;


    //   case "P3":
    //     preciew_innerhtml = `<div class="i_container" onclick="playvideowallpaper(` + wallpaper_count + `)"><i class="fa-solid fa-play"></i></div>
    //     <a target="_blank" href="image.html?value=` + present_wallpaper_code + `" ><video poster="` + present_wallpaper_thumbnaiL + `" loop muted src="` + video_thumbnail + `" id="wallpaper` + wallpaper_count + `"></video>`;

    //     break;


    //   default:
    //     preciew_innerhtml = `<a target="_blank" href="image.html?value=` + present_wallpaper_code + `" ><img
    //     src="` + present_wallpaper_thumbnaiL + `" alt="wallpaper">`;



    //     break;
    // }



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



    let present_wallpaper_div = `<div class="wallpaper ` + present_wallpaper_orientation + `">
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









function shuffleKeys(jsonData) {

  const keys = Object.keys(jsonData);
  // Fisher-Yates shuffle algorithm
  for (let i = keys.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [keys[i], keys[j]] = [keys[j], keys[i]];
  }

  shuffledKeys = keys;
  total_wallpapers = shuffledKeys.length;
  return keys;
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

  console.log("After adding "+video.src);



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
    console.log("updateLoadingBar");
    const buffered = video.buffered;
    if (buffered.length > 0) {
      const loadedPercentage = (buffered.end(0) / video.duration) * 100;
      console.log( loadedPercentage + "%");
      if (loadedPercentage >= 99) {
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







function loadmore() {
  // let spinner = document.querySelector('#loadmore_button i');
  console.log("ggggggggggggggggggggggggggg");
  console.log(next_showable_wallpapewr);
  console.log(total_wallpapers);
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



