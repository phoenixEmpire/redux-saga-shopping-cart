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

/*
  1 React-Redux会检测mapDispatchToProps的类型：可以是function（返回值object），也可以是object。
  2 如果是对象类型，React-Redux会返回一个新的对象作为mapDispatchToProps：
    原对象的每个成员都是Action创建函数，新对象的每个成员都是转发Action的函数。React-Redux会调用Redux来完成新旧对象的转换。
 */  
const mapDispatchToProps = { addToCart };

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(ProductList);
