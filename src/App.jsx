import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/data.json') // File ada di public/data.json
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Gagal fetch data:', err));
  }, []);

  // Ambil satu item per brand
  const getUniqueBrandData = (data) => {
    const brandMap = new Map();
    data.forEach((item) => {
      if (!brandMap.has(item.brand)) {
        brandMap.set(item.brand, item);
      }
    });
    return Array.from(brandMap.values());
  };

  // Kelompokkan data berdasarkan kategori
  const groupByCategory = (data) => {
    const categoryMap = {};
    data.forEach((item) => {
      if (!categoryMap[item.category]) {
        categoryMap[item.category] = [];
      }
      categoryMap[item.category].push(item);
    });
    return categoryMap;
  };

  const uniqueBrandData = getUniqueBrandData(data);
  const groupedData = groupByCategory(uniqueBrandData);

  return (
    <div className="App">
      <div className="title">
        <h1>Welcome to our store</h1>
      </div>

      {uniqueBrandData.length === 0 ? (
        <p>Belum ada data.</p>
      ) : (
        <div className="categories-container">
          {Object.entries(groupedData).map(([category, items]) => (
            <section key={category} className="category-section">
              <h2>{category}</h2>
              <div className="card-container">
                {items.map((item, index) => (
                  <div
                    className={`card ${item.seller_product_status ? 'available' : 'soldout'}`}
                    key={index} >
                    <h3>{item.brand}</h3>
                    <p className={`status ${item.seller_product_status ? 'available' : 'soldout'}`}>
                      {item.seller_product_status ? 'Tersedia' : 'Stok Habis'}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <footer>
        <p>&copy; {new Date().getFullYear()} DimasStore</p>
      </footer>
    </div>
  );
}

export default App;
