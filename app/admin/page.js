"use client";
import React, { useEffect, useState } from "react";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import PageBanner from "@/components/PageBanner";

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [printingOrder, setPrintingOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (printingOrder) {
      setTimeout(() => {
        window.print();
        setPrintingOrder(null);
      }, 300);
    }
  }, [printingOrder]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearOrders = async () => {
    if(confirm("Are you sure you want to clear all orders?")) {
      await fetch("/api/orders", { method: "DELETE" });
      fetchOrders();
    }
  };

  if (printingOrder) {
    return (
      <div className="receipt-print-wrapper">
        <div className="receipt-container">
           <div className="receipt-header">
              <h1>FoodKing</h1>
              <p>Main Street, Melbourne, Australia</p>
              <p>Tel: +11002345909</p>
           </div>
           
           <div className="receipt-details">
              <p><strong>Order ID:</strong> {printingOrder.id}</p>
              <p><strong>Date:</strong> {new Date(printingOrder.date).toLocaleString()}</p>
              <p><strong>Customer:</strong> {printingOrder.customer.firstName} {printingOrder.customer.lastName}</p>
              <p><strong>Email:</strong> {printingOrder.customer.email}</p>
              <p><strong>Address:</strong> {printingOrder.customer.address}</p>
           </div>
           
           <table className="receipt-table">
             <thead>
               <tr>
                 <th>Qty</th>
                 <th>Item</th>
                 <th className="text-end">Price</th>
               </tr>
             </thead>
             <tbody>
               {printingOrder.items.map((item, i) => (
                 <tr key={i}>
                   <td>{item.quantity}</td>
                   <td>{item.name} <small>({item.selectedSize})</small></td>
                   <td className="text-end">${(item.price * item.quantity).toFixed(2)}</td>
                 </tr>
               ))}
             </tbody>
           </table>
           
           <div className="receipt-total">
              <h3>Total: ${printingOrder.total.toFixed(2)}</h3>
           </div>
           
           <div className="receipt-footer">
              <p>Thank you for choosing FoodKing!</p>
              <p>Delicious food, delivered fast.</p>
           </div>
        </div>
        <style jsx global>{`
           body { background: #fff; margin: 0; padding: 0; }
           .receipt-print-wrapper {
              font-family: 'Courier New', Courier, monospace;
              color: #000;
              padding: 20px;
              max-width: 400px;
              margin: 0 auto;
           }
           .receipt-header {
              text-align: center;
              border-bottom: 2px dashed #000;
              padding-bottom: 10px;
              margin-bottom: 20px;
           }
           .receipt-header h1 {
              font-size: 36px;
              margin: 0 0 5px 0;
              color: #e5002a !important; /* FoodKing Theme Red */
              font-family: 'Arial', sans-serif;
              font-weight: 900;
              text-transform: uppercase;
           }
           .receipt-header p {
              margin: 2px 0;
              font-size: 14px;
           }
           .receipt-details p {
              margin: 4px 0;
              font-size: 14px;
           }
           .receipt-table {
              width: 100%;
              margin: 20px 0;
              border-collapse: collapse;
           }
           .receipt-table th, .receipt-table td {
              border-bottom: 1px dashed #ccc;
              padding: 8px 0;
              text-align: left;
           }
           .receipt-table th.text-end, .receipt-table td.text-end {
              text-align: right;
           }
           .receipt-total {
              text-align: right;
              border-bottom: 2px dashed #000;
              padding-bottom: 10px;
              margin-bottom: 20px;
           }
           .receipt-total h3 {
              margin: 0;
              color: #e5002a !important;
              font-size: 24px;
              font-family: 'Arial', sans-serif;
           }
           .receipt-footer {
              text-align: center;
              font-size: 14px;
              font-style: italic;
           }
           @media print {
              .receipt-print-wrapper {
                 width: 100%;
                 max-width: 100%;
                 padding: 0;
              }
              /* Force browsers to print colors */
              * {
                 -webkit-print-color-adjust: exact !important;
                 print-color-adjust: exact !important;
              }
           }
        `}</style>
      </div>
    );
  }

  return (
    <FoodKingLayout>
      <PageBanner pageName={"Admin Panel"} />
      <section className="section-padding">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Order Management</h2>
            <div>
               <button onClick={fetchOrders} className="theme-btn me-2" style={{padding: '10px 20px', borderRadius:'5px'}}>Refresh</button>
               <button onClick={clearOrders} className="theme-btn bg-danger" style={{padding: '10px 20px', borderRadius:'5px'}}>Clear All</button>
            </div>
          </div>
          
          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <div className="alert alert-info">No orders have been placed yet.</div>
          ) : (
            <div className="row g-4">
              {orders.map((order) => (
                <div key={order.id} className="col-12">
                  <div className="card shadow-sm border-0" style={{borderRadius: '10px', overflow:'hidden'}}>
                    <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center p-3">
                      <h5 className="mb-0 text-white">Order: {order.id}</h5>
                      <div className="d-flex gap-2 align-items-center">
                        {order.source === "ai_voice_call" && (
                          <span className="badge" style={{background:'#22c55e'}}>
                            <i className="fas fa-phone me-1"></i>Voice Call
                          </span>
                        )}
                        <span className="badge bg-success">{order.status}</span>
                      </div>
                    </div>
                    <div className="card-body p-4 row">
                      <div className="col-md-4 border-end">
                         <h6>Customer Details</h6>
                         <p className="mb-1"><strong>Name:</strong> {order.customer.firstName} {order.customer.lastName}</p>
                         <p className="mb-1"><strong>Email:</strong> {order.customer.email}</p>
                         <p className="mb-1"><strong>Address:</strong> {order.customer.address}</p>
                         {order.orderNotes && <p className="mb-1"><strong>Notes:</strong> {order.orderNotes}</p>}
                         <p className="mb-1 text-muted"><small>{new Date(order.date).toLocaleString()}</small></p>
                      </div>
                      <div className="col-md-8">
                         <h6>Order Items</h6>
                         <table className="table table-borderless table-sm">
                           <thead>
                             <tr className="border-bottom">
                               <th>Item</th>
                               <th>Size</th>
                               <th>Qty</th>
                               <th className="text-end">Price</th>
                             </tr>
                           </thead>
                           <tbody>
                             {order.items.map((item, i) => (
                               <tr key={i}>
                                 <td>{item.name}</td>
                                 <td>{item.selectedSize}</td>
                                 <td>{item.quantity}</td>
                                 <td className="text-end">${(item.price * item.quantity).toFixed(2)}</td>
                               </tr>
                             ))}
                             <tr className="border-top">
                               <td colSpan="3" className="text-end fw-bold">Total:</td>
                               <td className="text-end fw-bold">${order.total.toFixed(2)}</td>
                             </tr>
                           </tbody>
                         </table>
                         <div className="d-flex justify-content-end mt-3">
                            <button 
                               onClick={() => setPrintingOrder(order)} 
                               className="theme-btn" 
                               style={{padding: '8px 15px', fontSize: '14px', borderRadius:'5px'}}
                            >
                               <i className="fas fa-print me-2"></i> Print POS Receipt
                            </button>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </FoodKingLayout>
  );
};

export default AdminPage;
