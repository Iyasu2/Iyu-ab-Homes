const Card = ({
  img,
  Type,
  Total_Area,
  Built_in_Area,
  State,
  City,
  Town,
  Floors,
  Accommodation,
  Price,
}) => {
  return (
    <section className="card">
      <img
        src="https://m.media-amazon.com/images/I/6125yAfsJKL._AC_UX575_.jpg"
        alt="House"
      />
      <div className="card-details">
        <div className="left-items">
          <ul>
            <li>Type: {Type}</li>
            <li>Total Area: {Total_Area}</li>
            <li>Built-in Area: {Built_in_Area} </li>
            <li>State: {State} </li>
          </ul>
        </div>
        <div className="left-items">
          <ul>
            <li>City: {City} </li>
            <li>Town:{Town} </li>
            <li>Floors: {Floors}</li>
            <li>Accommodation:{Accommodation} </li>
          </ul>
        </div>
        <div className="card-price">
          <div className="price">{Price} Birr</div>
        </div>
      </div>
    </section>
  );
};

export default Card;
