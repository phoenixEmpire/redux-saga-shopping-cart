import { getProduct } from "./product.util";

// 获取购物车
export function getCart(state) {
  return state.cart;
}

// 获取购物车中的所有商品
export function getCartProducts(state) {
  return getAddedIds(state.cart).map(id => ({
    ...getProduct(state.products, id),
    quantity: getQuantity(state.cart, id)
  }));
}

// 计算购物车中的商品的总价格
export function getTotal(state) {
  return getAddedIds(state.cart)
    .reduce(
      (total, id) =>
        total +
        getProduct(state.products, id).price * getQuantity(state.cart, id),
      0
    )
    .toFixed(2);
}

export function isCheckoutPending(state) {
  return state.cart.checkoutStatus.checkoutPending;
}

export function getCheckoutError(state) {
  return state.cart.checkoutStatus.error;
}

export function getQuantity(state, productId) {
  return state.quantityById[productId] || 0;
}

export function getAddedIds(state) {
  return Object.keys(state.quantityById);
}
