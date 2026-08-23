import React from "react";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import PageBanner from "@/components/PageBanner";
import PizzaCard from "@/components/pizza/PizzaCard";
import { pizzas } from "@/data/pizzas";

const MenuPage = () => {
  return (
    <FoodKingLayout>
      <PageBanner pageName={"Pizza Menu"} />
      <section className="food-category-section fix section-padding">
        <div className="container">
          <div className="row">
            {pizzas.map((pizza) => (
              <div
                key={pizza.id}
                className="col-xl-3 col-lg-4 col-md-6 mb-4 wow fadeInUp"
                data-wow-delay=".3s"
              >
                <PizzaCard pizza={pizza} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </FoodKingLayout>
  );
};

export default MenuPage;
