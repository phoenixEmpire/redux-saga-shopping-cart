import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addToCart } from "../actions";
import { getVisibleProducts } from "../common/product.util";
import ProductItem from "./ProductItem";

class ProductList extends Component {
  render() {
    const { products, addToCart } = this.props;

    return (
      <div>
        <h3>商品列表</h3>
        {products.map(product => (
          <ProductItem
            key={product.id}
            product={product}
            onAddToCartClicked={() => addToCart(product.id)}
          />
        ))}
      </div>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      inventory: PropTypes.number.isRequired
    })
  ).isRequired,
  addToCart: PropTypes.func.isRequired
};

const mapStatetoProps = state => {
  return { products: getVisibleProducts(state.products) };
};

// 可以是function，也可以是object
const mapDispatchToProps = { addToCart };

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(ProductList);
