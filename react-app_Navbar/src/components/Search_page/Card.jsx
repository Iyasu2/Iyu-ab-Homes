const Card = () => {
  return (
    <section className="card">
      <img
        src="https://m.media-amazon.com/images/I/6125yAfsJKL._AC_UX575_.jpg"
        alt="House"
      />
      <div className="card-details">
        <div className="left-items">
          <ul>
            <li>Type</li>
            <li>Total Area</li>
            <li>Built-in Area</li>
            <li>State</li>
          </ul>
        </div>
        <div className="left-items">
          <ul>
            <li>City</li>
            <li>Town</li>
            <li>floors</li>
            <li>accommodation</li>
          </ul>
        </div>
        <div className="card-price">
          <div className="price">32000000 Birr</div>
        </div>
      </div>
    </section>
  );
};

export default Card;
