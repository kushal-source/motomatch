import { useEffect, useState } from 'react';

function MyList() {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('wishlist')) || [];
    setMyList(storedList);
  }, []);
  

  return (
    <div className="container mt-4">
      <h2 className="text-center">My List</h2>
      <div className="row">
        {myList.length === 0 ? (
          <p>No bikes added to your list yet.</p>
        ) : (
          myList.map((bike, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-4">
                <img
                  src={bike.imageUrl}
                  alt={bike.name}
                  className="card-img-top"
                  style={{ maxHeight: '200px', objectFit: 'contain' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{bike.name}</h5>
                  <p className="card-text">{bike.brand}</p>
                  <p className="card-text">₹{bike.price.toLocaleString()}</p>
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
