"use client";
import React, { useState, useEffect } from "react";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import PageBanner from "@/components/PageBanner";
import { pizzas } from "@/data/pizzas";
import PizzaSizeSelector from "@/components/pizza/PizzaSizeSelector";
import PizzaQuantitySelector from "@/components/pizza/PizzaQuantitySelector";
import Pizza3DViewer from "@/components/ar/Pizza3DViewer";
import ARLauncherButton from "@/components/ar/ARLauncherButton";
import ARInstructionsModal from "@/components/ar/ARInstructionsModal";
import { useCart } from "@/context/CartContext";
import { notFound } from "next/navigation";

const PizzaDetailPage = ({ params }) => {
  const [pizza, setPizza] = useState(null);
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [quantity, setQuantity] = useState(1);
  const [showARModal, setShowARModal] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    // Unwrap params in newer Next.js or just access it if it's already unwrapped
    const id = params?.id;
    if (id) {
      const found = pizzas.find((p) => p.slug === id || p.id === id);
      if (found) {
        setPizza(found);
      } else {
        notFound();
      }
    }
  }, [params]);

  if (!pizza) return <FoodKingLayout><div style={{height:'50vh'}}/></FoodKingLayout>;

  const currentSizeData = pizza.sizes[selectedSize.toLowerCase()];
  const currentPrice = currentSizeData.price;

  const handleAddToCart = () => {
    addToCart({
      id: pizza.id,
      name: pizza.name,
      image: pizza.image,
      selectedSize: currentSizeData.label,
      diameterInches: currentSizeData.diameterInches,
      price: currentPrice,
      quantity: quantity
    });
    alert("Added to cart!");
  };

  return (
    <FoodKingLayout>
      <PageBanner pageName={pizza.name} />
      <section className="product-details-section section-padding">
        <div className="container">
          <div className="product-details-wrapper">
            <div className="row">
              <div className="col-lg-5">
                <div className="product-image-items">
                  <Pizza3DViewer 
                    glb={pizza.model3d.glb}
                    usdz={pizza.model3d.usdz}
                    fallbackImage={pizza.image}
                    scaleX={currentSizeData.diameterMeters / pizza.model3d.authoredDiameterMeters}
                    scaleY={currentSizeData.diameterMeters / pizza.model3d.authoredDiameterMeters}
                    scaleZ={currentSizeData.diameterMeters / pizza.model3d.authoredDiameterMeters}
                  />
                </div>
              </div>
              <div className="col-lg-7 mt-5 mt-lg-0">
                <div className="product-details-content">
                  <h3 className="pb-3">{pizza.name}</h3>
                  <p className="mb-4">{pizza.description}</p>
                  
                  <div className="mb-4">
                    <strong>Ingredients: </strong>
                    <span>{pizza.ingredients.join(", ")}</span>
                  </div>

                  <PizzaSizeSelector 
                    sizes={pizza.sizes} 
                    selectedSize={selectedSize} 
                    onSizeChange={(size) => setSelectedSize(size)} 
                  />

                  <div className="price-list d-flex align-items-center mb-4">
                    <span style={{fontSize: '28px', color: '#e53935', fontWeight: 'bold'}}>${currentPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="cart-wrp d-flex align-items-center flex-wrap gap-4 mb-4">
                    <PizzaQuantitySelector quantity={quantity} setQuantity={setQuantity} />
                    
                    <div className="shop-button d-flex align-items-center">
                      <button onClick={handleAddToCart} className="theme-btn" style={{border:'none', cursor:'pointer'}}>
                        <span className="button-content-wrapper d-flex align-items-center justify-content-center">
                          <span className="button-icon">
                            <i className="flaticon-shopping-cart" />
                          </span>
                          <span className="button-text">Add To Cart</span>
                        </span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 border rounded" style={{background: '#fff3e0'}}>
                    <ARLauncherButton 
                      glb={pizza.model3d.glb} 
                      usdz={pizza.model3d.usdz} 
                      onOpenModal={() => setShowARModal(true)} 
                    />
                    <p className="mb-0 text-muted" style={{fontSize: '0.9em'}}>See this pizza at approximately real size on your table.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ARInstructionsModal 
        show={showARModal} 
        onHide={() => setShowARModal(false)}
        isSupported={true} 
        onLaunchAR={() => {
          setShowARModal(false);
          // In a real implementation we would trigger intent/QuickLook here
          // For now, this is a placeholder behavior as model-viewer handles AR via its own slot sometimes,
          // but if we are manually launching, we'd do it here.
          // Since model-viewer handles it natively if we configure it, we might just click the model-viewer's hidden AR button.
          const viewer = document.querySelector('model-viewer');
          if (viewer && viewer.activateAR) {
            viewer.activateAR();
          } else {
            alert("AR launch simulated for demo.");
          }
        }} 
      />
    </FoodKingLayout>
  );
};

export default PizzaDetailPage;
