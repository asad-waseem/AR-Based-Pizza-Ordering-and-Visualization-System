"use client";
import React, { useEffect } from "react";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import PageBanner from "@/components/PageBanner";
import Link from "next/link";
const OrderSuccessPage = () => {

  return (
    <FoodKingLayout>
      <PageBanner pageName={"Order Confirmed"} />
      <section className="section-padding text-center">
        <div className="container">
          <div className="mb-4">
            <i className="fas fa-check-circle text-success" style={{fontSize: '80px', color: '#28a745'}}></i>
          </div>
          <h2 className="mb-3">Thank you for your order!</h2>
          <p className="mb-4">Your delicious pizza is being prepared and will be on its way shortly.</p>
          <div className="d-flex justify-content-center gap-3">
            <Link href="/menu" className="theme-btn">
              Order More
            </Link>
            <Link href="/" className="theme-btn bg-red-2">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </FoodKingLayout>
  );
};

export default OrderSuccessPage;
