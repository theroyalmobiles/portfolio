import { useState } from 'react';

const PrintBillButton = () => {
  const handlePrintBill = () => {
    // Get the summary element content
    const summaryElement = document.getElementById('sumary');

    // Get user data from localStorage
    let userData = { name: 'Guest', email: 'guest@example.com' };
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        userData = JSON.parse(storedUser);
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }

    // Get products from summary element or use sample data if not found
    const productElements = summaryElement ? summaryElement.querySelectorAll('[class*="border-gray-200 rounded-lg bg-white"]') : [];

    const products = [];

    // Extract product information from elements
    productElements.forEach((element, index) => {
      try {
        const nameElement = element.querySelector('h3');
        const priceElement = element.querySelector('.text-purple-600');
        const qtyElement = element.querySelector('[class*="text-gray-600"]:last-child') ||
          element.querySelector('[class*="text-gray-600"]');

        let name = nameElement ? nameElement.textContent : `Product ${index + 1}`;
        let priceText = priceElement ? priceElement.textContent : '₹0';
        let qtyText = qtyElement ? qtyElement.textContent : 'Qty: 1';

        // Extract numerical values
        const price = parseInt(priceText.replace(/[^0-9]/g, '')) || 0;
        const qty = parseInt(qtyText.replace(/[^0-9]/g, '')) || 1;

        products.push({
          name,
          price,
          qty,
          amount: price * qty
        });
      } catch (error) {
        console.error('Error parsing product:', error);
      }
    });

    // If no products found, use sample data
    if (products.length === 0) {
      products.push(
        { name: 'Sample Product 1', price: 1000, qty: 2, amount: 2000 },
        { name: 'Sample Product 2', price: 500, qty: 1, amount: 500 }
      );
    }

    // Calculate totals
    const totalQty = products.reduce((sum, product) => sum + product.qty, 0);
    const totalAmount = products.reduce((sum, product) => sum + product.amount, 0);

    // Create an iframe for printing that will be hidden
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    // Generate HTML content for the bill
    const billContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Order Bill</title>
          <style>
            @media print {
              body { font-family: Arial, sans-serif; padding: 20px; }
              table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
              th { background-color: #f8f9fa; }
              .header { margin-bottom: 20px; border-bottom: 2px solid #333; padding-bottom: 10px; }
               .header h1 {
                text-align: center;
                font-size: 24px;
                color: #4f39f6;
                margin-bottom: 15px;
                letter-spacing: 1px;
                border-bottom: 1px solid #ddd;
                padding-bottom: 8px;
              }
              .header h2 { margin-bottom: 5px; }
              .total-row { font-weight: bold; background-color: #f8f9fa; }
              .confirmation {
                margin-top: 30px;
                padding: 15px;
                border: 2px solid #28a745;
                text-align: center;
                border-radius: 5px;
                position: relative;
                overflow: hidden;
              }
              .confirmation h3 {
                color: #28a745;
                margin: 0 0 5px 0;
                font-size: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .confirmation p {
                margin: 0;
                font-size: 16px;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .green-tick {
                color: #28a745;
                font-size: 24px;
                margin: 0 10px;
              }
              .signature-section {
                margin-top: 40px;
                display: flex;
                justify-content: flex-end;
              }
              .signature-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-right: 40px;
              }
              .signature-image {
                width: 100px;
                height: auto;
                margin-bottom: 10px;
              }
              .signature-line {
                width: 200px;
                border-top: 1px solid #333;
                margin-bottom: 5px;
              }
              .signature-text {
                font-weight: bold;
              }
              .invoice-stamp {
                margin-top: 20px;
                text-align: right;
                font-style: italic;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
          <h1>THE ROYAL MOBILES</h1>
            <h2>INVOICE</h2>
            <p><strong>Name:</strong> ${userData.name || 'N/A'}</p>
            <p><strong>Email:</strong> ${userData.email || 'N/A'}</p>
            <p><strong>Invoice Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Invoice No:</strong> INV-${Math.floor(Math.random() * 900000) + 100000}</p>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price (₹)</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              ${products.map((product, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${product.name}</td>
                  <td>${product.qty}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>${product.amount.toFixed(2)}</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td colspan="2">Total</td>
                <td>${totalQty}</td>
                <td></td>
                <td>₹${totalAmount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          
          <div class="confirmation">
            <h3>
              <span class="green-tick">✓</span>
              PAYMENT SUCCESSFUL
              <span class="green-tick">✓</span>
            </h3>
            <p>
              <span class="green-tick">✓</span>
              ORDER CONFIRMED
              <span class="green-tick">✓</span>
            </p>
          </div>
          
          <div class="signature-section">
            <div class="signature-container">
              <img src="/images/sign.png" alt="Authorized Signature" class="signature-image" />
              <span class="signature-line"></span>
              <div class="signature-text">Authorized Signature</div>
            </div>
          </div>
          
        </body>
      </html>
    `;

    // Write to the iframe document and print
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(billContent);
    iframe.contentWindow.document.close();

    // Wait for content to load then print
    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();

      // Remove the iframe after printing
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    }, 500);
  };

  return (
    <button
      onClick={handlePrintBill}
      className="w-full py-4 px-4 rounded-lg shadow-sm text-white font-medium text-lg transition-colors duration-200 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    >
      Print Receipt
    </button>
  );
};

export default PrintBillButton;