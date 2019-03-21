import React, { Component } from "react";
import PropTypes from "prop-types";
import CartItem from "./CartItem";
import { connect } from "react-redux";
import { checkout, removeFromCart } from "../actions";
import {
  getCartProducts,
  getTotal,
  isCheckoutPending,
  getCheckoutError
} from "../common/cart.util";

class Cart extends Component {
  render() {
    const {
      products,
      total,
      checkoutPending,
      error,
      checkout,
      removeFromCart
    } = this.props;

    const hasProducts = products.length > 0;
    const checkoutAllowed = hasProducts && !checkoutPending;

    const nodes = !hasProducts ? (
      <em>请向购物车里添加商品</em>
    ) : (
      products.map(product => (
        <CartItem
          title={product.title}
          price={product.price}
          quantity={product.quantity}
          key={product.id}
          onRemove={() => removeFromCart(product.id)}
        />
      ))
    );

    return (
      <div>
        <h3>您的购物车</h3>
        <div>{nodes}</div>
        <p>总金额: &#36;{total}</p>
        <button onClick={checkout} disabled={checkoutAllowed ? "" : "disabled"}>
          结账
        </button>
        <div style={{ color: "red" }}>{error}</div>
      </div>
    );
  }
}

Cart.propTypes = {
  // data
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    })
  ).isRequired,
  total: PropTypes.string,
  checkoutPending: PropTypes.bool,
  error: PropTypes.string,

  // actions
  checkout: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired
};

export default connect(
  state => ({
    products: getCartProducts(state),
    total: getTotal(state),
    checkoutPending: isCheckoutPending(state),
    error: getCheckoutError(state)
  }),
  { checkout, removeFromCart }
)(Cart);
