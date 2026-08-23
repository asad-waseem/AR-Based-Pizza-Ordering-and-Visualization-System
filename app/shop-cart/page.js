"use client";
import Cta from "@/components/Cta";
import PageBanner from "@/components/PageBanner";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const page = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartSubtotal } = useCart();
  const subtotal = getCartSubtotal();
  const shipping = cartItems.length > 0 ? 10 : 0;

  return (
    <FoodKingLayout>
      <PageBanner pageName={"shop Cart"} />
      <section className="cart-section section-padding fix">
        <div className="container">
          <div className="main-cart-wrapper">
            <div className="row">
              <div className="col-12">
                <div className="cart-wrapper">
                  <div className="cart-items-wrapper">
                    <table>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Subtotal</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr key={item.lineId} className="cart-item">
                            <td className="cart-item-info">
                              <img src={item.image} alt={item.name} />
                              <span>{item.name} {item.selectedSize ? `(${item.selectedSize})` : ''}</span>
                            </td>
                            <td className="cart-item-price">
                              ${" "}
                              <span className="base-price">
                                {item.price.toFixed(2)}
                              </span>
                            </td>
                            <td>
                              <div className="cart-item-quantity">
                                <span className="cart-item-quantity-amount">
                                  {item.quantity}
                                </span>
                                <div className="cart-item-quantity-controller">
                                  <Link
                                    href="#"
                                    className="cart-increment"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      updateQuantity(item.lineId, item.quantity + 1);
                                    }}
                                  >
                                    <i className="far fa-caret-up" />
                                  </Link>
                                  <Link
                                    href="#"
                                    className="cart-decrement"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      if (item.quantity > 1) {
                                        updateQuantity(item.lineId, item.quantity - 1);
                                      }
                                    }}
                                  >
                                    <i className="far fa-caret-down" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                            <td className="cart-item-price">
                              ${" "}
                              <span className="total-price">
                                {(item.price * item.quantity).toFixed(2)}
                              </span>
                            </td>
                            <td className="cart-item-remove">
                              <Link
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  removeFromCart(item.lineId);
                                }}
                              >
                                <i className="fas fa-times" />
                              </Link>
                            </td>
                          </tr>
                        ))}
                        {cartItems.length === 0 && (
                          <tr>
                            <td colSpan="5" className="text-center py-4">
                              Your cart is empty
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="cart-wrapper-footer">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <input
                        type="text"
                        name="promo-code"
                        id="promoCode"
                        placeholder="Promo code"
                      />
                      <Link
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        className="theme-btn border-radius-none"
                      >
                        Apply Code
                      </Link>
                    </form>
                    <Link
                      href="/menu"
                      className="theme-btn border-radius-none"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6" />
              <div className="col-xl-6">
                <div className="cart-pragh-box">
                  <div className="cart-graph">
                    <h4>Cart Total</h4>
                    <ul>
                      <li>
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </li>
                      <li>
                        <span>Shipping</span>
                        <span>
                          ${shipping.toFixed(2)}
                        </span>
                      </li>
                      <li>
                        <span>Total</span>
                        <span>
                          ${(subtotal + shipping).toFixed(2)}
                        </span>
                      </li>
                    </ul>
                    <div className="chck">
                      <Link
                        href="/checkout"
                        className="theme-btn border-radius-none"
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Cta />
    </FoodKingLayout>
  );
};
export default page;
