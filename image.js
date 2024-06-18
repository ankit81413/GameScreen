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



function toggleFullScreen() {
  if (!document.fullscreenElement) {
    if (display.requestFullscreen) {
      display.requestFullscreen();
    } else if (display.mozRequestFullScreen) {
      /* Firefox */
      display.mozRequestFullScreen();
    } else if (display.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      display.webkitRequestFullscreen();
    } else if (display.msRequestFullscreen) {
      /* IE/Edge */
      display.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari & Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
  }
}

// Add click event listener to toggle fullscreen mode on click
// document.getElementById("dis_fullscreen").addEventListener('click', toggleFullScreen);

// Detect fullscreen change and adjust cursor style
document.addEventListener('fullscreenchange', () => {

  var video = document.querySelector("#display_content video")
  var image = document.querySelector("#display_content img")


  if (document.fullscreenElement === display) {

    if (video) {

      video.style.maxWidth = "100%";
      video.style.width = "100%";

    } else {

      image.style.maxWidth = "100%";
      image.style.maxHeight = "100%"
      image.style.width = "auto";
      image.style.height = "100%";

    }
  } else {


    if (video) {

      video.style.maxWidth = "600px";

    } else {

      image.style.maxHeight = "500px";


    }

  }
});








const currentURL = window.location.href;

const urlParams = new URLSearchParams(new URL(currentURL).search);

let value = urlParams.get('value');

let present_wallpaper_code;

if (value == "" || value == null) {
  present_wallpaper_code = "0001";
} else {
  present_wallpaper_code = value;
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
        ptoductsdata = data;

        update_quality_settings();
        add_display_wallpaper();
        update_download_box();
        update_tags();

        callit();
        // display.addEventListener('click', toggleFullScreen);
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



let default_display_quality = localStorage.getItem("display_quality_select")
let preffered_display_quality = default_display_quality;
let quality_type = "dafault";




function update_quality_settings() {

  let download_option_list = document.getElementById("video_quality_list");
  let ul_innerhtml = "";
  let download_options_raw = originaljson[present_wallpaper_code].link;



  let keys = Object.keys(download_options_raw);
  let order = ['4k', '2k', '1080', '720', '510', '480']; // Define the desired order

  let download_options = keys.sort((a, b) => {
    let indexA = order.indexOf(a);
    let indexB = order.indexOf(b);

    // If both keys are in the order array, sort based on their index
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }

    // If one key is in the order array and the other isn't,
    // prioritize the one in the order array
    if (indexA !== -1) {
      return -1;
    }
    if (indexB !== -1) {
      return 1;
    }

    // If both keys are not in the order array, maintain their original order
    return 0;
  });

  console.log("ulllllllllllllllllllllllllllllllll");
  console.log(download_options);



  for (let i = 0; i < download_options.length; i++) {
    let present_ul_quality = download_options[i];

    ul_innerhtml += `<li onclick="change_quality('` + present_ul_quality + `')">` + present_ul_quality + `</li>`



  }

  download_option_list.innerHTML = ul_innerhtml;



  console.log("ulllllllllllllllllllllllllllllllll");
  console.log(download_options);


}



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
  console.log("CODEEEEEEEEEEEEEE");
  console.log("CODEEEEEEEEEEEEEE " + codee);

  switch (default_display_quality) {
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





function add_display_wallpaper() {


  // console.log(originaljson);
  console.log(present_wallpaper_code);
  let display_quality;

  if (quality_type == "dafault") {
    display_quality = get_quality2(present_wallpaper_code);

  } else {
    display_quality = preffered_display_quality;

  }

  let wallpaper_image = originaljson[present_wallpaper_code]["link"][display_quality][1];
  let wallpaper_name = originaljson[present_wallpaper_code]["name"];
  let wallpaper_type = originaljson[present_wallpaper_code]["type"];
  console.log(wallpaper_name);


  if (wallpaper_type == "1" || wallpaper_type == "P1") {
    console.log(wallpaper_type);

    document.getElementById("display_content").innerHTML = `<img src="` + wallpaper_image + `" alt="wallpaper">`;


    document.getElementById("display_content").innerHTML += `
  
    <div id="setting"">
    <div id="dis_quality"  onclick="change_display_setting()">
        <i class="fa-solid fa-gear"  id="fa_gear"> 480</i></div>
        <div id="dis_fullscreen">
        <i class="fa-solid fa-expand"></i>
      </div>             
    `;



  } else {

    document.getElementById("display_content").innerHTML = `<video loop  muted src="` + wallpaper_image + `">`;
    document.getElementById("display_content").innerHTML += `<div id="play_control" onclick="play_display_video()">

    <i class="fa-solid fa-play"></i>
    
  </div>
  
<div id="setting"">
  <div id="dis_quality"  onclick="change_display_setting()">
    <i class="fa-solid fa-gear" id="fa_gear"> 480</i></div>
    <div id="dis_fullscreen">
    <i class="fa-solid fa-expand"></i>
  </div>            
`;




    // document.getElementById("display_content").innerHTML = `    <div id="play_control">

    //           <i class="fa-solid fa-play"></i>

    //         </div>

    //       <div id="setting">
    //           <i class="fa-solid fa-gear"> 480</i>
    //         </div>            
    //     `;

  }

  // document.getElementById("display").src= wallpaper_image;
  document.getElementById("name-text").innerText = wallpaper_name;


  let dis_fullscreen = document.getElementById("dis_fullscreen");
  if (dis_fullscreen) {
    dis_fullscreen.addEventListener('click', toggleFullScreen);

  }




  let qualitu_text = document.getElementById("fa_gear");
  if(qualitu_text){
  document.getElementById("fa_gear").innerText=display_quality;
  }

}














// Function to share the current URL
function shareLink() {
  if (navigator.share) {
    navigator.share({
      title: document.title,
      url: window.location.href
    })
      .then(() => {
        console.log('Link shared successfully');
      })
      .catch((error) => {
        console.error('Error sharing link:', error);
      });
  } else {
    console.log('Web Share API not supported');
    // Handle case where Web Share API is not supported
  }
}

// Function to copy the current URL to clipboard
function copyLinkToClipboard() {
  const currentURL = window.location.href;
  navigator.clipboard.writeText(currentURL)
    .then(() => {
      console.log('Link copied to clipboard:', currentURL);
      customalert("success", "Link copied scuccessfully", "You are ready to paste the link")
    }).catch(err => {
      console.error('Failed to copy link to clipboard:', err);
      customalert("error", "Error copying link", "")
    });
}

// Get the share and copy link buttons
const shareButton = document.getElementById('shareButton');
const copyLinkButton = document.getElementById('copyLinkButton');

// Add click event listeners to the buttons
shareButton.addEventListener('click', shareLink);
copyLinkButton.addEventListener('click', copyLinkToClipboard);




document.getElementById("share_container").addEventListener("click", function () {
  document.getElementById("share_container").style.display = "none"

})


document.querySelector(".buttons .share").addEventListener("click", function () {
  document.getElementById("share_container").style.display = "block"
})


function saveToLocalStorage(valueToSave) {
  // Check if localStorage already contains an array with saved values
  let savedValues = JSON.parse(localStorage.getItem('savedValues')) || [];

  // Check if the value is already present in the array
  if (savedValues.includes(valueToSave)) {
    console.log('Value already saved');
    window.location.href = "saved.html?value=" + valueToSave;
    // Perform any action needed when the value is already saved
    // You can add an alert or any other logic here
    return; // Exit the function if the value is already saved
  }

  // Add the new value to the array
  savedValues.push(valueToSave);

  // Store the updated array in localStorage
  localStorage.setItem('savedValues', JSON.stringify(savedValues));

  console.log('Value saved:', valueToSave);
  customalert("success", "Wallpaper Saved successfully", "you can access through saved section")

  // Perform any action needed after successfully saving the value
  // You can add an alert or any other logic here
}



document.querySelector(".buttons .save").addEventListener("click", function () {
  saveToLocalStorage(present_wallpaper_code);
})

document.querySelector(".buttons .download").addEventListener("click", function () {
  document.getElementById("right").style.display = "block";
  console.log("right box shown");
})







function update_download_box() {
  let download_option_list = document.getElementById("download_option_list");
  let download_innerhtml = "";
  let download_options_raw = originaljson[present_wallpaper_code].link;

  // let keys = Object.keys(download_options_raw);
  // let order = ['4k', '2k', '1080', '720', '510', '480']; // Define the desired order

  // let download_options = order.filter(key => keys.includes(key));


  let keys = Object.keys(download_options_raw);
  let order = ['4k', '2k', '720', '510', '480']; // Define the desired order

  let download_options = keys.sort((a, b) => {
    let indexA = order.indexOf(a);
    let indexB = order.indexOf(b);

    // If both keys are in the order array, sort based on their index
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }

    // If one key is in the order array and the other isn't,
    // prioritize the one in the order array
    if (indexA !== -1) {
      return -1;
    }
    if (indexB !== -1) {
      return 1;
    }

    // If both keys are not in the order array, maintain their original order
    return 0;
  });



  // let download_options = Object.keys(download_options_raw)
  let total_download_options = Object.keys(download_options_raw).length;
  // console.log(download_options);


  for (let l = 0; l < total_download_options; l++) {

    let present_download_quality = download_options[l];
    console.log(present_download_quality);

    let present_download_size = originaljson[present_wallpaper_code]["link"][download_options[l]][0];
    console.log(present_download_size);

    download_innerhtml += `<li class="download_option"><a href="download.html?value=` + present_wallpaper_code + `&quality=` + present_download_quality + `">` + present_download_quality + ` (` + present_download_size + `)</a></li>`



  }



  download_option_list.innerHTML = download_innerhtml;







  // let keys = Object.keys(originaljson[present_wallpaper_code]?.link ?? {});
  // let order = ['4k', '2k', '1080', '720', '510', '480']; // Define the desired order

  // let present_wallpaper_maxquality = order.filter(key => keys.includes(key))[0];




}






function update_tags() {
  let present_tags_array = originaljson[present_wallpaper_code]["tags"]
  console.log(present_tags_array);
  let similar_tags_div = document.getElementById("similar_tags");
  similar_tags_div.innerHTML = "";

  for (let k = 0; k < present_tags_array.length; k++) {

    let taglink = "auto search.html?tag=" + present_tags_array[k];


    similar_tags_div.innerHTML += `<a href="` + taglink + `">` + present_tags_array[k] + `</a>`

  }

}









let similar_products;


// Function to search for similar products based on tags
function searchThroughTags(pproduct, ptoductsdata) {
  if (!pproduct || !ptoductsdata) {
    console.log("Product number or JSON data not provided.");
    return;
  }

  // Get the tags of the product with the specified product number
  const tagsToMatch = ptoductsdata[pproduct]?.tags || [];

  if (tagsToMatch.length === 0) {
    console.log(`No tags found for product number ${pproduct}`);
    return;
  }

  const results = Object.entries(ptoductsdata)
    .filter(([key, product]) => key !== pproduct) // Exclude the original product
    .map(([key, product]) => ({
      key,
      product,
      relevance: calculateTagRelevance(tagsToMatch, product.tags || []),
    }))
    .filter(({ relevance }) => relevance > 0); // Filter out irrelevant results

  // Sort by relevance, higher values first
  const sortedResults = results.sort((a, b) => b.relevance - a.relevance);

  // Extract product numbers from the sorted results
  const similarProductNumbers = sortedResults.map(result => result.key);


  similar_products = similarProductNumbers;
  console.log(similar_products);
}

// Function to calculate tag relevance based on matching tags
function calculateTagRelevance(tagsToMatch, productTags) {
  if (!tagsToMatch || !productTags) {
    return 0;
  }

  const matchingTags = tagsToMatch.filter(tag => productTags.includes(tag));
  return matchingTags.length;
}



const productNumberToSearch = present_wallpaper_code; // Replace with the product number you want to search for
function callit() {
  searchThroughTags(productNumberToSearch, ptoductsdata);
  //console.log(similar_products);
  show_similar_producta();


}





// function show_similar_producta(){
// //console.log(similar_products);
// //console.log(ptoductsdata);

// var similar_products_container =document.getElementById("similar_wallpapers");

// var total_similar_products=similar_products.length;

// var total_products_to_show ;

// if (total_similar_products<16) {
//   total_products_to_show=total_similar_products;
// }else{
//   total_products_to_show=15;
// }


// for (var i = 0; i < total_products_to_show; i++) {
//   var present_similar_products=similar_products[i];
//   var present_similar_name=ptoductsdata[present_similar_products]["name"];
//   var present_similar_thumbnail=ptoductsdata[present_similar_products]["thumbnail"];
//   let download_options_raw = originaljson[present_similar_products].link;

//   // let keys = Object.keys(download_options_raw);
//   // let order = ['4k', '2k', '1080', '720', '510', '480']; // Define the desired order

//   // let download_options = order.filter(key => keys.includes(key));


//   let keys = Object.keys(download_options_raw);
//   let order = ['4k', '2k', '1080', '720', '510', '480']; // Define the desired order

//   let download_options = keys.sort((a, b) => {
//     let indexA = order.indexOf(a);
//     let indexB = order.indexOf(b);

//     // If both keys are in the order array, sort based on their index
//     if (indexA !== -1 && indexB !== -1) {
//       return indexA - indexB;
//     }

//     // If one key is in the order array and the other isn't,
//     // prioritize the one in the order array
//     if (indexA !== -1) {
//       return -1;
//     }
//     if (indexB !== -1) {
//       return 1;
//     }

//     // If both keys are not in the order array, maintain their original order
//     return 0;
//   });


//   console.log(download_options_raw);

//   similar_products_container.innerHTML+=`<div class="wallpaper ` + present_wallpaper_orientation + `">
//   <div class="image">`+ preciew_innerhtml + `</div>
//   <div class="details">
//     <h2>`+ present_wallpaper_name + `</h2>
//     <p>Quality : `+ present_wallpaper_maxquality + `</p>
//   </div>
// </div>

// `




// }


// }









let total_wallpapers;
// let wallpaper_load_count = 2;
var wallpaper_count = -1;
// let next_showable_wallpapewr = wallpaper_count + wallpaper_load_count +1;
let next_showable_wallpapewr = 0;
let shuffledKeys;








let wallpaper_load_count;
let load_count_select = localStorage.getItem("load_count_select");




if (load_count_select == null || load_count_select == "") {
  wallpaper_load_count = 10;
}else{
  wallpaper_load_count = parseInt(load_count_select);
}








// -----------DEFAULT-------------
let thumb_quality_select = localStorage.getItem("thumb_quality_select");
console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
console.log(thumb_quality_select);
let default_video_thumb_quality = "720";




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









function show_similar_producta() {
  console.log("loadingggggggggggggggggggggggggggggggggggggggggggg");
  shuffledKeys = similar_products;
  total_wallpapers = similar_products.length;
  console.log("shufflrd keys \n\n\n" + shuffledKeys);
  let wallpaper_container = document.getElementById("wallpaper-container");

  console.log("hi");

  for (let i = next_showable_wallpapewr; i < Math.min(next_showable_wallpapewr + wallpaper_load_count, shuffledKeys.length); i++) {

    let present_wallpaper_code = shuffledKeys[i];
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



    let present_wallpaper_div = `<div class="wallpaper ` + present_wallpaper_orientation + `">
      <div class="image">` + preciew_innerhtml + `</a></div>
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
  console.log(next_showable_wallpapewr);
  console.log(total_wallpapers);

}








function loadmore() {
  let spinner = document.querySelector('#loadmore_button i');
  if (next_showable_wallpapewr < total_wallpapers) {
    console.log("ppppppppppppppppppppppppppppppppppppppppppppp");
    show_similar_producta();
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






































const rightDiv = document.getElementById('right');

document.getElementById('right').addEventListener('click', function () {


  // Get the width of the window or the parent container
  const containerWidth = window.innerWidth; // Replace with the container's width if needed
  // Check if the width of 'right' div matches the container width
  if (containerWidth < "600") {
    handleRightClick(); // Call handleRightClick function if width matches
  }
});

function handleRightClick() {
  rightDiv.style.display = "none"
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
sidebarBackground.addEventListener('click', function (e) {
  if (!sidebar.contains(e.target)) {
    sidebar.classList.remove('show');
    //option_palal.classList.remove('opened_option_panal')

    sidebarBackground.classList.remove('opened_sidebar_background');

    document.getElementById("video_quality").style.display = "none"

  }
});








function play_display_video() {
  let video = document.querySelector("#display_content video");

  if (video.paused) {
    video.play();
    document.getElementById("play_control").innerHTML = `<i class="fa-solid fa-pause"></i>`;
    // Call the function when needed
    hidePlayControl();


  } else {
    video.pause();
    document.getElementById("play_control").innerHTML = `<i class="fa-solid fa-play"></i>`;
  }

}


document.getElementById("display_content").addEventListener('click', function () {

  let video = document.querySelector("#display_content video");

  if (video) {


    if (video.paused) {

      showPlayControl();

    } else {

      showPlayControl();
      hidePlayControl();
    }
  }

})


function hidePlayControl() {
  const playControlDiv = document.querySelector('#play_control');

  if (playControlDiv) {
    setTimeout(function () {
      playControlDiv.style.opacity = '0';
    }, 3000); // Hide the play_control div after 4 seconds (4000 milliseconds)
    console.log('hideeeeeeeeeeeeeeeeeee');
  } else {
    console.log('play_control div not found.');
  }
}

function showPlayControl() {
  const playControlDiv = document.querySelector('#play_control');

  if (playControlDiv) {
    playControlDiv.style.opacity = '1';
  } else {
    console.log('play_control div not found.');
  }
}












function change_display_setting() {


  document.getElementById("video_quality").style.display = "block"
  sidebarBackground.classList.add('opened_sidebar_background');


}


function change_quality(a) {
  console.log(preffered_display_quality);
  preffered_display_quality = a;
  quality_type = "change"
  console.log(preffered_display_quality);
  add_display_wallpaper();

  sidebarBackground.classList.remove('opened_sidebar_background');

  document.getElementById("video_quality").style.display = "none"



}