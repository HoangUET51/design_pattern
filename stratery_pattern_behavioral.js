// Stratery_pattern tách 1 func chung thành các func chức năng  riêng, dễ dàng quản lý

// Chưa sử dụng stratery_pattern
/*
function getPrice(originalPrice, typePromotion = "default") {
  if (typePromotion === "preOrder") {
    return originalPrice * 0.2;
  }

  if (typePromotion === "promotion") {
    return originalPrice <= 200 ? originalPrice * 0.1 : originalPrice - 30;
  }

  if (typePromotion === "blackFriday") {
    return originalPrice <= 200 ? originalPrice * 0.2 : originalPrice - 50;
  }

  if (typePromotion === "default") {
    return originalPrice;
  }
}

console.log(getPrice(299, "blackFriday"));
*/

// Sử dụng stratery Pattern

function preOrderPrice(originalPrice) {
  return originalPrice * 0.2;
}

function promotionPrice(originalPrice) {
  return originalPrice <= 200 ? originalPrice * 0.1 : originalPrice - 30;
}

function blackFridayPrice(originalPrice) {
  return originalPrice <= 200 ? originalPrice * 0.2 : originalPrice - 50;
}

function defaultPrice(originalPrice) {
  return originalPrice;
}

const getPriceStrategies = {
  preOrder: preOrderPrice,
  promotion: promotionPrice,
  blackFriday: blackFridayPrice,
  default: defaultPrice,
};

function getPrice(originalPrice, typePromotion) {
  return getPriceStrategies[typePromotion](originalPrice);
}

console.log("-->>>", getPrice(200, "blackFriday"));
