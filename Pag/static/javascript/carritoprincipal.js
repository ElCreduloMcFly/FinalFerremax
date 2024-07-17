var shoppingCart = (function() {
  var cart = [];

  function Item(name, price, count) {
      this.name = name;
      this.price = price;
      this.count = count;
  }

  function saveCart() {
      sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }

  function loadCart() {
      cart = JSON.parse(sessionStorage.getItem('shoppingCart')) || [];
  }

  loadCart();

  var obj = {};

  obj.addItemToCart = function(name, price, count) {
      var added = false;
      for (var i in cart) {
          if (cart[i].name === name) {
              cart[i].count += count;
              added = true;
              break;
          }
      }
      if (!added) {
          var item = new Item(name, price, count);
          cart.push(item);
      }
      saveCart();
  };

  obj.setCountForItem = function(name, count) {
      for (var i in cart) {
          if (cart[i].name === name) {
              cart[i].count = count;
              break;
          }
      }
      saveCart();
  };

  obj.removeItemFromCart = function(name) {
      for (var i in cart) {
          if (cart[i].name === name) {
              cart[i].count--;
              if (cart[i].count === 0) {
                  cart.splice(i, 1);
              }
              break;
          }
      }
      saveCart();
  };

  obj.removeItemFromCartAll = function(name) {
      for (var i in cart) {
          if (cart[i].name === name) {
              cart.splice(i, 1);
              break;
          }
      }
      saveCart();
  };

  obj.clearCart = function() {
      cart = [];
      saveCart();
  };

  obj.totalCount = function() {
      var totalCount = 0;
      for (var i in cart) {
          totalCount += cart[i].count;
      }
      return totalCount;
  };

  obj.totalCart = function() {
      var totalCart = 0;
      for (var i in cart) {
          totalCart += cart[i].price * cart[i].count;
      }
      return Number(totalCart.toFixed(2));
  };

  obj.listCart = function() {
      var cartCopy = [];
      for (var i in cart) {
          var item = cart[i];
          var itemCopy = {};
          for (var p in item) {
              itemCopy[p] = item[p];
          }
          itemCopy.total = Number(item.price * item.count).toFixed(2);
          cartCopy.push(itemCopy);
      }
      return cartCopy;
  };

  return obj;
})();

$('.add-to-cart').click(function(event) {
  event.preventDefault();
  var name = $(this).data('name');
  var price = Number($(this).data('price'));
  var quantity = parseInt($('#quantity-' + name).val()) || 1;
  shoppingCart.addItemToCart(name, price, quantity);
  displayCart();
});

$('.clear-cart').click(function() {
  shoppingCart.clearCart();
  displayCart();
});

function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";
  for (var i in cartArray) {
      output += "<tr>"
          + "<td>" + cartArray[i].name + "</td>"
          + "<td>" + cartArray[i].price + "</td>"
          + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-' data-name=" + cartArray[i].name + ">-</button>"
          + "<span class='item-count form-control' data-name='" + cartArray[i].name + "'>" + cartArray[i].count + "</span>"
          + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
          + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
          + " = "
          + "<td>" + cartArray[i].total + "</td>"
          + "</tr>";
  }
  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCart());
  $('#totalAmount').val(shoppingCart.totalCart());
  console.log('Total Amount in displayCart: ' + shoppingCart.totalCart());
}

$('.show-cart').on("click", ".delete-item", function(event) {
  var name = $(this).data('name');
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
});

$('.show-cart').on("click", ".minus-item", function(event) {
  var name = $(this).data('name');
  shoppingCart.removeItemFromCart(name);
  displayCart();
});

$('.show-cart').on("click", ".plus-item", function(event) {
  var name = $(this).data('name');
  shoppingCart.addItemToCart(name, 0, 1);
  displayCart();
});

$('#pay-button').click(function() {
  var totalCart = shoppingCart.totalCart();
  console.log('Total Amount before form submission: ' + totalCart);
  $('#totalAmount').val(totalCart);
});

displayCart();
