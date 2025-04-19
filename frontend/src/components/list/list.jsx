import { useEffect, useState } from 'react';
import './list.css'

function MyList() {
  const [myList, setMyList] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('wishlist')) || [];
    setMyList(storedList);
  }, []);

  const toggleBikeDetails = (bike) => {
    setExpandedIndex((prev) => (prev === bike.name ? null : bike.name));
  };

  const removeFromList = (bikeToRemove) => {
    const updatedList = myList.filter((bike) => bike.name !== bikeToRemove.name);
    setMyList(updatedList);
    localStorage.setItem('wishlist', JSON.stringify(updatedList));
  };

  return (
    <div className="mylist-container">
      <h2 className="mylist-heading">🏍️ My Wishlist</h2>
      <div className="row">
        {myList.length === 0 ? (
          <p className="text-center text-light">No bikes added to your list yet.</p>
        ) : (
          myList.map((bike, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="bike-card" onClick={() => toggleBikeDetails(bike)}>
                <img
                  src={bike.imageUrl}
                  alt={bike.name}
                  className="bike-img"
                />
                <div className="bike-body">
                  <div className="bike-header">
                    <h5>{bike.name}</h5>
                    <button
                      className="remove-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromList(bike);
                      }}
                    >
                      <i className="bi bi-heart-fill"></i>
                    </button>
                  </div>
                  <p><strong>Brand:</strong> {bike.brand}</p>
                  <p><strong>Price:</strong> ₹{bike.price.toLocaleString()}</p>

                  {expandedIndex === bike.name && (
                    <div className="bike-details mt-2">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item"><strong>Seat Height:</strong> {bike.seatHeightMm} mm</li>
                        <li className="list-group-item"><strong>Type:</strong> {bike.type}</li>
                        <li className="list-group-item"><strong>Dual ABS:</strong> {bike.dualABS}</li>
                        <li className="list-group-item"><strong>Tire Width:</strong> {bike.tireWidth}</li>
                        <li className="list-group-item"><strong>Engine CC:</strong> {bike.engineCc} cc</li>
                        <li className="list-group-item"><strong>Torque:</strong> {bike.torqueProduced}</li>
                        <li className="list-group-item"><strong>Year Launched:</strong> {bike.yearLaunched}</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyList;
