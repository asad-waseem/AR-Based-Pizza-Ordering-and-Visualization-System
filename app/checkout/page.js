"use client";
import Cta from "@/components/Cta";
import NiceSelect from "@/components/NiceSelect";
import PageBanner from "@/components/PageBanner";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  const { cartItems, getCartSubtotal, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const orderData = {
      customer: {
        firstName: formData.get("user-first-name"),
        lastName: formData.get("user-last-name"),
        email: formData.get("user-check-email"),
        address: formData.get("user-address")
      },
      items: cartItems,
      total: getCartSubtotal()
    };

    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });
      clearCart();
      router.push("/order-success");
    } catch (err) {
      alert("Failed to submit order");
      setLoading(false);
    }
  };

  return (
    <FoodKingLayout>
      <PageBanner pageName={"CHECKOUT"} />
      <section className="checkout-section fix section-padding border-bottom">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <div className="row g-4 justify-content-center">
                  <div className="col-lg-10 col-xl-8">
                    <div className="checkout-single-wrapper">
                      <div className="checkout-single boxshado-single">
                        <h4>Billing address</h4>
                        <div className="checkout-single-form">
                          <div className="row g-4">
                            <div className="col-lg-6">
                              <div className="input-single">
                                <input type="text" name="user-first-name" required placeholder="First Name" />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="input-single">
                                <input type="text" name="user-last-name" required placeholder="Last Name" />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="input-single">
                                <input type="email" name="user-check-email" required placeholder="Your Email" />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="input-single">
                                <textarea name="user-address" placeholder="Address" defaultValue={""} required />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="checkout-single checkout-single-bg mt-4">
                        <h4>Order Confirmation</h4>
                        <div className="mt-4">
                          <button type="submit" disabled={loading} className="theme-btn border-radius-none w-100 text-center">
                            {loading ? "Processing..." : "Place Order (Cash on Delivery)"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Cta />
    </FoodKingLayout>
  );
};
export default page;
