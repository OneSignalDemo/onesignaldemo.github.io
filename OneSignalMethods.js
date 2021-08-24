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
        allowLocalhostAsSecureOrigin: true,
        appId: "5e605fcd-de88-4b0a-a5eb-5c18b84d52f3", //main
        promptOptions: {
          slidedown: {
            autoPrompt: true,
            enabled: true,
            actionMessage: "Get Updated on our products?",
            acceptButtonText: "Of course!",
            cancelButtonText: "Maybe later",
            categories: {
              tags: [
                {
                  tag: "prefer_newitems",
                  label: "New Items 🛒"
                },
                {
                  tag: "prefer_saleitems",
                  label: "Sale Items 💳"
                },
                {
                  tag: "prefer_limiteditems",
                  label: "Limited Items ⭐"
                }
              ]
            }
          }
        },
      });
    });

    //------------------TEST CODE
    window.OneSignal.push(async () => {
      window.OneSignal.addListenerForNotificationOpened(notification => {
        console.log("notification: ", notification);
        let timestamp = Math.floor(Date.now() / 1000);
        OneSignal.sendTag("last_notification_click", timestamp);
      });
    });
    //------------------TEST CODE


  };
  script.src = "https://cdn.onesignal.com/sdks/OneSignalSDK.js";
  d.getElementsByTagName("head")[0].appendChild(script);

})(document);

(function (c, a) {
  if (!a.__SV) {
    var b = window; try { var d, m, j, k = b.location, f = k.hash; d = function (a, b) { return (m = a.match(RegExp(b + "=([^&]*)"))) ? m[1] : null }; f && d(f, "state") && (j = JSON.parse(decodeURIComponent(d(f, "state"))), "mpeditor" === j.action && (b.sessionStorage.setItem("_mpcehash", f), history.replaceState(j.desiredHash || "", c.title, k.pathname + k.search))) } catch (n) { } var l, h; window.mixpanel = a; a._i = []; a.init = function (b, d, g) {
      function c(b, i) {
        var a = i.split("."); 2 == a.length && (b = b[a[0]], i = a[1]); b[i] = function () {
          b.push([i].concat(Array.prototype.slice.call(arguments,
            0)))
        }
      } var e = a; "undefined" !== typeof g ? e = a[g] = [] : g = "mixpanel"; e.people = e.people || []; e.toString = function (b) { var a = "mixpanel"; "mixpanel" !== g && (a += "." + g); b || (a += " (stub)"); return a }; e.people.toString = function () { return e.toString(1) + ".people (stub)" }; l = "disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
      for (h = 0; h < l.length; h++)c(e, l[h]); var f = "set set_once union unset remove delete".split(" "); e.get_group = function () { function a(c) { b[c] = function () { call2_args = arguments; call2 = [c].concat(Array.prototype.slice.call(call2_args, 0)); e.push([d, call2]) } } for (var b = {}, d = ["get_group"].concat(Array.prototype.slice.call(arguments, 0)), c = 0; c < f.length; c++)a(f[c]); return b }; a._i.push([b, d, g])
    }; a.__SV = 1.2; b = c.createElement("script"); b.type = "text/javascript"; b.async = !0; b.src = "undefined" !== typeof MIXPANEL_CUSTOM_LIB_URL ?
      MIXPANEL_CUSTOM_LIB_URL : "file:" === c.location.protocol && "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//) ? "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js" : "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js"; d = c.getElementsByTagName("script")[0]; d.parentNode.insertBefore(b, d)
  }
})(document, window.mixpanel || []);
mixpanel.init("d810d40cdbc7dead2ff901838c696ccb", { batch_requests: true })

window.addEventListener("load", () => {

  // Dummy Function to create and set an example External User ID
  function getAndSetExternalUserIdInLocalStorage() {
    var externalUserIdInLocalStorage = localStorage.getItem("externalUserIdInLocalStorage")
    console.log("externalUserIdInLocalStorage: ", externalUserIdInLocalStorage)
    if (externalUserIdInLocalStorage === null) {
      externalUserIdInLocalStorage = String(Math.floor(Math.random() * 1000000000)); //set to random number for now
      localStorage.setItem("externalUserIdInLocalStorage", externalUserIdInLocalStorage)
    }
    return externalUserIdInLocalStorage
  }

  let externalUserId = getAndSetExternalUserIdInLocalStorage();
  console.log("externalUserId: ", externalUserId)
  // Create the Mixpanel User Profile for this User ID: https://developer.mixpanel.com/docs/javascript#storing-user-profiles
  mixpanel.identify(externalUserId)
  console.log("mixpanel.identify set with externalUserId: ", externalUserId);


  // -------------------------------- OneSignal Examples -------------------------------- //

  OneSignal.push(function () {
    var isPushSupported = OneSignal.isPushNotificationsSupported();
    console.log("Push Supported on Browser: ", isPushSupported);
    OneSignal.isPushNotificationsEnabled(function (isEnabled) {
      if (isEnabled) {
        console.log("Push notifications are enabled!");
        OneSignal.getUserId(function (userId) {
          console.log("OneSignal Push User ID:", userId);
        });
        OneSignal.getEmailId(function (emailId) {
          console.log("OneSignal Email User ID:", emailId)
        })
        async function getExternalUserId() {
          var externalUserId = await OneSignal.getExternalUserId();
          console.log("OneSignal External User ID set:", externalUserId);
          console.log("Settings External User ID to Mixpanel");
          mixpanel.people.set("$onesignal_user_id", externalUserId);
        }
        getExternalUserId();
      }
      else
        console.log("Push notifications are not enabled yet.");
    });

    // SUBSCRIPTION CHANGE EVENT
    OneSignal.on("subscriptionChange", function (isSubscribed) {
      console.log("The user's subscription state is now:", isSubscribed);
      mixpanel.track(
        "Push Subscription Changed",
        { "isSubscribed": isSubscribed }
      );
      OneSignal.getUserId(function (userId) {
        console.log("OneSignal User ID:", userId);
      });

      OneSignal.setExternalUserId(externalUserId).then(function () {
        console.log("externalUserId set after subscription change: ", externalUserId);
        console.log("Settings External User ID to Mixpanel");
        mixpanel.people.set("$onesignal_user_id", externalUserId);
      })

    });

    OneSignal.on('notificationPermissionChange', function (permissionChange) {
      var currentPermission = permissionChange.to;
      console.log('New permission state:', currentPermission);
      mixpanel.track(
        "Notification Permission Changed",
        { "currentPermission": currentPermission }
      );
    });
  });

  const updateEmailWithFieldsButton = document.getElementById("updateEmailWithFieldsButton");
  if (
    typeof updateEmailWithFieldsButton != "undefined" &&
    updateEmailWithFieldsButton != null
  ) {
    updateEmailWithFieldsButton.addEventListener("click", () => {
      OneSignal.push(function () {
        let email = document.getElementById("email_field").value
        console.log("about to setEmail: ", email)
        //mixpanel.alias(externalUserId + "_email", externalUserId);
        //mixpanel.identify(externalUserId + "_email");
        OneSignal.logoutEmail().then(function () {
          OneSignal.setEmail(email)
            .then(function (emailId) {
              // Callback called when email have finished sending
              console.log("emailId: ", emailId);
              OneSignal.setExternalUserId(externalUserId).then(function () {
                console.log("externalUserId set after email provided: ", externalUserId);
              })
              mixpanel.people.set({
                $email: email//,$onesignal_user_id: emailId
              });
            });
        })
      });
    })
  }

  const tagUserWithFieldsButton = document.getElementById("tagUserWithFieldsButton");
  if (
    typeof tagUserWithFieldsButton != "undefined" &&
    tagUserWithFieldsButton != null
  ) {
    tagUserWithFieldsButton.addEventListener("click", () => {
      OneSignal.push(function () {
        OneSignal.sendTag(document.getElementById("tagKey").value, document.getElementById("tagValue").value)
          .then(function (tagsSent) {
            // Callback called when tags have finished sending
            console.log("tagsSent: ", tagsSent);
          });
      });
    })
  }

  const updateNameInMixpanel = document.getElementById("updateNameInMixpanel");
  if (
    typeof updateNameInMixpanel != "undefined" &&
    updateNameInMixpanel != null
  ) {
    updateNameInMixpanel.addEventListener("click", () => {
      mixpanel.people.set({
        $first_name: document.getElementById("$first_name").value,
        $last_name: document.getElementById("$last_name").value
      });
      console.log("Mixpanel $first_name & $last_name updated: ", document.getElementById("$first_name").value + " " + document.getElementById("$last_name").value);
    })
  }

  const showCategorySlidePrompt = document.getElementById("showCategorySlidePrompt");
  if (
    typeof showCategorySlidePrompt != "undefined" &&
    showCategorySlidePrompt != null
  ) {
    showCategorySlidePrompt.addEventListener("click", () => {
      OneSignal.push(function () {
        OneSignal.showCategorySlidedown({ force: true });
      });
    })
  }

  const showSmsAndEmailSlidedown = document.getElementById("showSmsAndEmailSlidedown");
  if (
    typeof showSmsAndEmailSlidedown != "undefined" &&
    showSmsAndEmailSlidedown != null
  ) {
    showSmsAndEmailSlidedown.addEventListener("click", () => {
      OneSignal.push(function () {
        OneSignal.showSmsAndEmailSlidedown({ force: true });
      });
    })
  }



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
          purchase_made: "true",
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
  let purchasePriceTotal = parseInt(checkoutPriceTotal);
  let purchasedItemCount = parseInt(checkoutItemsTotal);

  OneSignal.push(function () {
    OneSignal.getTags(function (tags) {
      var purchase_amount = 0;
      if (tags.purchase_amount) {
        purchase_amount = parseInt(tags.purchase_amount)
      }
      console.log("current purchase_amount: ", purchase_amount);
      purchase_amount += purchasePriceTotal
      OneSignal.sendTags({
        purchase_made: "true",
        purchase_amount: purchase_amount,
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
    })
  });
}