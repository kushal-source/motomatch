import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bikeData from './bikes.json';

function DirectSearchForm() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishlist')) || []);
  const navigate = useNavigate();

  const handleQueryChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const filteredSuggestions = bikeData.filter((bike) =>
        bike.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const foundBike = bikeData.find(
      (bike) => bike.name.toLowerCase() === query.toLowerCase()
    );
    setResult(foundBike || null);
    setSuggestions([]);
  };

  const handleSuggestionClick = (name) => {
    setQuery(name);
    setSuggestions([]);
  };

  const addToWishlist = (bike) => {
    if (wishlist.some((b) => b.name === bike.name)) {
      const updatedWishlist = wishlist.filter((b) => b.name !== bike.name);
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    } else {
      const updatedWishlist = [...wishlist, bike];
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    }
  };
  

  return (
    <form
      className="card p-4 shadow-lg mx-auto"
      onSubmit={handleSearch}
      style={{
        maxWidth: '600px',
        borderRadius: '20px',
        background: '#ffffffea',
        backdropFilter: 'blur(10px)',
      }}
    >
      <h2 className="mb-4 text-center fw-bold" style={{ fontSize: '26px' }}>
        🔍 Search Your Bike
      </h2>

      <label htmlFor="search" className="form-label fw-semibold">
        Enter Bike Name:
      </label>
      <input
        id="search"
        type="text"
        className="form-control mb-3 shadow-sm"
        placeholder="e.g. Yamaha R15, Royal Enfield Classic 350"
        value={query}
        onChange={handleQueryChange}
        style={{
          borderRadius: '12px',
          padding: '14px 18px',
          fontSize: '17px',
        }}
      />

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && query && (
        <ul
          className="list-group position-absolute mt-1 shadow-sm"
          style={{
            zIndex: 1000,
            width: '100%',
            borderRadius: '10px',
            maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          {suggestions.map((bike) => (
            <li
              key={bike.name}
              className="list-group-item"
              style={{ cursor: 'pointer', fontSize: '16px' }}
              onClick={() => handleSuggestionClick(bike.name)}
            >
              {bike.name}
            </li>
          ))}
        </ul>
      )}

      <button
        type="submit"
        className="btn btn-primary w-100 mt-3"
        style={{
          borderRadius: '12px',
          fontSize: '17px',
          padding: '12px 16px',
        }}
      >
        Search
      </button>

      {/* Result */}
      {result && (
        <div className="mt-4 card border-0 shadow-sm p-3" style={{ borderRadius: '18px' }}>
          <h4 className="mb-3 text-center fw-bold" style={{ fontSize: '22px' }}>
            {result.name}
          </h4>
          <img
            src={result.imageUrl}
            alt={result.name}
            className="img-fluid mx-auto d-block mb-3 pop-out-3d"
            style={{
              borderRadius: '16px',
              maxHeight: '300px',
              objectFit: 'cover',
              width: '100%',
              maxWidth: '500px',
            }}
          />

          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>Brand:</strong> {result.brand}</li>
            <li className="list-group-item"><strong>Price (Rajkot):</strong> ₹{result.price.toLocaleString()}</li>
            <li className="list-group-item"><strong>Seat Height:</strong> {result.seatHeightMm} mm</li>
            <li className="list-group-item"><strong>Type:</strong> {result.type}</li>
            <li className="list-group-item"><strong>Dual ABS:</strong> {result.dualABS}</li>
            <li className="list-group-item"><strong>Tire Width:</strong> {result.tireWidth}</li>
            <li className="list-group-item"><strong>Engine CC:</strong> {result.engineCc} cc</li>
            <li className="list-group-item"><strong>Torque:</strong> {result.torqueProduced}</li>
            <li className="list-group-item"><strong>Year Launched:</strong> {result.yearLaunched}</li>
          </ul>

          {/* Add to Wishlist Button */}
          <button
            type="button"
            className={`btn ${
              wishlist.some((b) => b.name === result.name) ? 'btn-danger' : 'btn-outline-danger'
            } d-flex align-items-center gap-2 mt-3`}
            onClick={() => addToWishlist(result)}
            style={{
              borderRadius: '12px',
              fontSize: '17px',
              padding: '10px 16px',
              transition: 'all 0.3s ease',
            }}
          >
            <i
              className={`bi ${
                wishlist.some((b) => b.name === result.name) ? 'bi-heart-fill' : 'bi-heart'
              } text-danger fs-5`}
            ></i>
            <span>
              {wishlist.some((b) => b.name === result.name) ? 'Added to My List' : 'Add to My List'}
            </span>
          </button>
        </div>
      )}

      {result === null && query && (
        <p className="text-danger mt-3 text-center" style={{ fontSize: '16px' }}>
          No bike found with that name.
        </p>
      )}
    </form>
  );
}

export default DirectSearchForm;
