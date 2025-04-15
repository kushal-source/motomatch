import { useState } from 'react';
import bikeData from './bikes.json';

function DirectSearchForm() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  // Function to handle search input changes
  const handleQueryChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Filter bike data based on the entered query for suggestions
    if (value.length > 0) {
      const filteredSuggestions = bikeData.filter((bike) =>
        bike.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Function to handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    const foundBike = bikeData.find(
      (bike) => bike.name.toLowerCase() === query.toLowerCase()
    );
    setResult(foundBike || null);
    setSuggestions([]); // Clear suggestions after search
  };

  // Function to handle suggestion selection
  const handleSuggestionClick = (name) => {
    setQuery(name);
    setSuggestions([]);
  };

  return (
    <form className="card p-4 shadow-lg" onSubmit={handleSearch}>
      <label htmlFor="search" className="form-label">
        Enter Bike Name:
      </label>
      <input
        id="search"
        type="text"
        className="form-control mb-3 shadow-sm"
        placeholder="e.g. Royal Enfield Classic 350"
        value={query}
        onChange={handleQueryChange}
        style={{
          borderRadius: '8px',
          padding: '12px 16px',
          fontSize: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      />

      {/* Render suggestions */}
      {suggestions.length > 0 && query && (
        <ul
          className="list-group mb-3 shadow-sm"
          style={{
            position: 'absolute',
            zIndex: 10,
            width: '100%',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          {suggestions.map((bike) => (
            <li
              key={bike.name}
              className="list-group-item"
              style={{
                cursor: 'pointer',
                padding: '10px 12px',
                fontSize: '16px',
              }}
              onClick={() => handleSuggestionClick(bike.name)}
            >
              {bike.name}
            </li>
          ))}
        </ul>
      )}

      <button
        type="submit"
        className="btn btn-success w-100 mt-3"
        style={{
          borderRadius: '8px',
          fontSize: '16px',
          padding: '12px 16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        Search
      </button>

      {result && (
        <div className="mt-4 card p-3 shadow-sm" style={{ borderRadius: '12px' }}>
          <h4 className="mb-2" style={{ fontWeight: 'bold', fontSize: '22px' }}>
            {result.name}
          </h4>
          <img
            src={result.imageUrl}
            alt={result.name}
            className="img-fluid mb-3 rounded"
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          />
          <ul className="list-group list-group-flush">
            <li className="list-group-item" style={{ fontSize: '16px' }}>
              <strong>Brand:</strong> {result.brand}
            </li>
            <li className="list-group-item" style={{ fontSize: '16px' }}>
              <strong>Price (Rajkot):</strong> ₹{result.price.toLocaleString()}
            </li>
            <li className="list-group-item" style={{ fontSize: '16px' }}>
              <strong>Seat Height:</strong> {result.seatHeightMm} mm
            </li>
            <li className="list-group-item" style={{ fontSize: '16px' }}>
              <strong>Type:</strong> {result.type}
            </li>
            <li className="list-group-item" style={{ fontSize: '16px' }}>
              <strong>Dual ABS:</strong> {result.dualABS}
            </li>
            <li className="list-group-item" style={{ fontSize: '16px' }}>
              <strong>Tire Width:</strong> {result.tireWidth}
            </li>
            <li className="list-group-item" style={{ fontSize: '16px' }}>
              <strong>Engine CC:</strong> {result.engineCc} cc
            </li>
            <li className="list-group-item" style={{ fontSize: '16px' }}>
              <strong>Torque:</strong> {result.torqueProduced}
            </li>
            <li className="list-group-item" style={{ fontSize: '16px' }}>
              <strong>Year Launched:</strong> {result.yearLaunched}
            </li>
          </ul>
        </div>
      )}

      {result === null && query && (
        <p className="text-danger mt-3" style={{ fontSize: '16px' }}>
          No bike found with that name.
        </p>
      )}
    </form>
  );
}

export default DirectSearchForm;




