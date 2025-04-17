import { useEffect, useState } from 'react';

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
    <div className="container mt-4 px-3">
      <h2 className="text-center mb-4">My List</h2>
      <div className="row">
        {myList.length === 0 ? (
          <p className="text-center">No bikes added to your list yet.</p>
        ) : (
          myList.map((bike, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div
                className="card border shadow-sm"
                style={{
                  borderRadius: '16px',
                  transition: 'transform 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = 'scale(1.02)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = 'scale(1)')
                }
              >
                <img
                  src={bike.imageUrl}
                  alt={bike.name}
                  className="card-img-top"
                  style={{
                    maxHeight: '200px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                  }}
                  onClick={() => toggleBikeDetails(bike)}
                />
                <div className="card-body" onClick={() => toggleBikeDetails(bike)}>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0">{bike.name}</h5>
                    <button
                      className="btn btn-sm"
                      style={{ color: 'red' }}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click
                        removeFromList(bike);
                      }}
                    >
                      <i className="bi bi-heart-fill fs-5"></i>
                    </button>
                  </div>
                  <p className="card-text mb-1">
                    <strong>Brand:</strong> {bike.brand}
                  </p>
                  <p className="card-text">
                    <strong>Price:</strong> ₹{bike.price.toLocaleString()}
                  </p>

                  {expandedIndex === bike.name && (
                    <div className="mt-3">
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
