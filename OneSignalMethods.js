// Init
(function (d, script) {
  script = d.createElement("script");
  script.type = "application/javascript";
  script.async = true;
  script.onload = function () {
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function () {
      OneSignal.init({
        //appId: "380dc082-5231-4cc2-ab51-a03da5a0e4c2", // testing
        appId: "5e605fcd-de88-4b0a-a5eb-5c18b84d52f3", //main
      });
    });
  };
  script.src = "https://cdn.onesignal.com/sdks/OneSignalSDK.js";
  d.getElementsByTagName("head")[0].appendChild(script);
})(document);

window.addEventListener("load", () => {
  
  // -------------------------------- Quick Examples -------------------------------- //
  const pushSupported = document.querySelector(".push-supported");
  const pushEnabled = document.querySelector(".push-enabled");
  const playerIdElement = document.querySelector(".player-id");
  const externalUserIdElement = document.querySelector(".external-user-id");
  //Subscription methods
  OneSignal.push(function () {
    var isPushSupported = OneSignal.isPushNotificationsSupported();
    pushSupported.innerHTML = isPushSupported;
    OneSignal.isPushNotificationsEnabled(function(isEnabled) {
      pushEnabled.innerHTML = isEnabled;
      if (isEnabled) {
        console.log("Push notifications are enabled!");
        OneSignal.getUserId(function (userId) {
          console.log("OneSignal User ID:", userId);
          playerIdElement.innerHTML = userId;
        });
        async function getExternalUserId() {
          var externalUserId = await OneSignal.getExternalUserId();
          console.log("OneSignal External User ID:", externalUserId );
          externalUserIdElement.innerText = externalUserId
        }
        getExternalUserId();
      }
      else
        console.log("Push notifications are not enabled yet.");    
    });
    OneSignal.on("subscriptionChange", function (isSubscribed) {
      console.log("The user's subscription state is now:", isSubscribed);
      OneSignal.getUserId(function (userId) {
        console.log("OneSignal User ID:", userId);
      });
      //Get User ID from your server
      let myCustomUniqueUserId = Math.floor(Math.random() * 1000000000); //set to random number for now
      OneSignal.setExternalUserId(myCustomUniqueUserId);
      console.log("External User ID: ", myCustomUniqueUserId);
    });
      OneSignal.on('notificationPermissionChange', function(permissionChange) {
        var currentPermission = permissionChange.to;
        console.log('New permission state:', currentPermission);
      });
  });

  const tagUserWithFieldsButton = document.getElementById("tagUserWithFieldsButton");
  tagUserWithFieldsButton.addEventListener("click", () => {
    OneSignal.push(function() {            
      OneSignal.sendTag(document.getElementById("tagKey").value, document.getElementById("tagValue").value)
        .then(function(tagsSent) {
          // Callback called when tags have finished sending
          console.log("tagsSent: ", tagsSent);  
        }); 
    });
  })

  const showCategorySlidePrompt = document.getElementById("showCategorySlidePrompt");
  showCategorySlidePrompt.addEventListener("click", () => {
    OneSignal.push(function() {            
      OneSignal.showCategorySlidedown();
    });
  })
  


  // -------------------------------- Abandoned Cart Example -------------------------------- //
  class OSCart {
    //Example if page has a single "Add to cart" button
    setupSingleOSAddToCartButtonOptions() {
      // replace ".add-to-cart-btn" with the class name of your cart button element
      const addToCartButton = document.querySelector(".add-to-cart-btn");
      // replace ".product-title" with the class name of the element containing your product name
      let productName = document.querySelector(".product-title").innerHTML;
      //console.log("productName: ", productName);
      // replace ".product-img" with the class name of your product img element
      let productImageURL = document.querySelector(".product-img").src;
      //console.log("productImageURL: ", productImageURL);
      addToCartButton.addEventListener("click", () => {
        OneSignal.push(function () {
          let timestamp = Math.floor(Date.now() / 1000);
          OneSignal.sendTags({
            cart_update: timestamp,
            product_name: productName,
            product_image: productImageURL,
          }).then(function (tagsSent) {
            // Callback called when tags have finished sending
            console.log(tagsSent);
          });
        });
      });
    }
    //Example if page has multiple "Add to cart" buttons, see: https://onesignaldemo.github.io/
    setupMultipleOSAddToCartButtonOptions() {
      let buttonsDOM = [];
      // replace ".add-to-cart-btn" with the class name of your cart button element
      const addToCartButtons = [
        ...document.querySelectorAll(".add-to-cart-btn"),
      ];
      buttonsDOM = addToCartButtons;
      addToCartButtons.forEach((addToCartButton) => {
        // this example adds the product id witin each "add-to-cart" button
        // this creates unique id attributes for each product to identify them
        // this example assumes you use unique id attributes for the product title and image
        let id = addToCartButton.dataset.id;
        addToCartButton.addEventListener("click", () => {
          // replace `product-title-id-${id}` with the id of the element containing your product name
          let productName = document.getElementById(`product-title-id-${id}`)
            .innerHTML;
          //console.log("productName: ", productName);
          // replace `product-img-id-${id}` with the id of the element containing your product image
          let productImageURL = document.getElementById(`product-img-id-${id}`)
            .src;
          //console.log("productImageURL: ", productImageURL);
          OneSignal.push(function () {
            let timestamp = Math.floor(Date.now() / 1000);
            OneSignal.sendTags({
              cart_update: timestamp,
              product_name: productName,
              product_image: productImageURL,
            }).then(function (tagsSent) {
              // Callback called when tags have finished sending
              console.log(tagsSent);
            });
          });
        });
      });
    }

    //Example update/remove tags if cart changes
    updateOSTagsOnCartChange() {
      // this example checks how many items are in the cart element
      // replace ".cart-content" with the class name of your div holding all cart items
      const cartContent = document.querySelector(".cart-content");
      // if an item remains, update tags to the topmost item
      if (cartContent.children.length > 0) {
        // replace ".cart-product-title" with the class name of the element containing your product name
        let productName = document.querySelector(".cart-product-title")
          .innerHTML;
        console.log("cart productName: ", productName);
        // replace ".cart-product-img" with the class name of your product img element
        let productImageURL = document.querySelector(".cart-product-img").src;
        console.log("productImageURL: ", productImageURL);
        OneSignal.push(function () {
          let timestamp = Math.floor(Date.now() / 1000);
          OneSignal.sendTags({
            cart_update: timestamp,
            product_name: productName,
            product_image: productImageURL,
          }).then(function (tagsSent) {
            // Callback called when tags have finished sending
            console.log(tagsSent);
          });
        });
      } else {
        OneSignal.sendTags({
          cart_update: "",
          product_name: "",
          product_image: "",
        }).then(function (tagsSent) {
          // Callback called when tags have finished sending
          console.log(tagsSent);
        });
      }
    }
  }
  const osCart = new OSCart();
  //osCart.setupSingleOSAddToCartButtonOptions(); //uncomment if page has a single "add to cart" button
  osCart.setupMultipleOSAddToCartButtonOptions(); //uncomment if page has multiple "add to cart" button

  const clearCartBtn = document.querySelector(".clear-cart");
  if (typeof clearCartBtn != "undefined" && clearCartBtn != null) {
    clearCartBtn.addEventListener("click", () => {
      osCart.updateOSTagsOnCartChange();
    });
  }

  if (typeof cartContent != "undefined" && cartContent != null) {
    cartContent.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("remove-item") ||
        event.target.classList.contains("fa-chevron-down")
      ) {
        osCart.updateOSTagsOnCartChange();
      }
    });
  }

  const submitPurchaseButton = document.querySelector(".submit-payment");
  if (
    typeof submitPurchaseButton != "undefined" &&
    submitPurchaseButton != null
  ) {
    const checkoutPriceTotal = document.querySelector(".checkout-price-total")
      .innerText;
    const checkoutItemsTotal = document.querySelector(".checkout-items-total")
      .innerText;
    submitPurchaseButton.addEventListener("click", () => {
      updateOSOnCartPurchase(checkoutPriceTotal, checkoutItemsTotal);
    });
  }
});

function updateOSOnCartPurchase(checkoutPriceTotal, checkoutItemsTotal) {
  let purchasePriceTotal = parseFloat(checkoutPriceTotal);
  let purchasedItemCount = parseInt(checkoutItemsTotal);
  OneSignal.push(function () {
    OneSignal.sendTags({
      cart_update: "",
      product_name: "",
      product_image: "",
    }).then(function (tagsSent) {
      // Callback called when tags have finished sending
      console.log(tagsSent);
    });
    OneSignal.sendOutcome("Purchase", purchasePriceTotal);
    OneSignal.sendOutcome("Purchased Item Count", purchasedItemCount);
    console.log("Purchase made! Outcomes sent:");
    console.log("Purchase ", purchasePriceTotal);
    console.log("Purchased Item Count ", purchasedItemCount);
  });
}
