import program_icon from "../../assets/icon3.png";

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
  // Function to format price with commas
  const formatPriceWithCommas = (price) => {
    const priceStr = price.toString();
    const [integerPart, decimalPart] = priceStr.split(".");
    const formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    );
    const formattedPrice = decimalPart
      ? `${formattedIntegerPart}.${decimalPart}`
      : formattedIntegerPart;
    return formattedPrice;
  };

  // Format the price
  const formattedPrice = formatPriceWithCommas(Price);

  return (
    <section className="card">
      <div className="card-details">
        <img
          src="https://m.media-amazon.com/images/I/6125yAfsJKL._AC_UX575_.jpg"
          alt="House"
        />

        <div className="caption">
          <img src={program_icon} />
          <p>See more</p>
        </div>

        <div className="items-wrapper">
          <div className="left-items">
            <ul>
              <li>City: {City} </li>
              <li>Town:{Town} </li>
              <li>State: {State} </li>
            </ul>
          </div>
          <div className="right-items">
            <ul>
              <li>Type: {Type}</li>
              <li>Floors: {Floors}</li>
              <li>Accommodation:{Accommodation} </li>
            </ul>
          </div>
        </div>
        <div className="card-price">
          <div className="price">{formattedPrice} Birr</div>
        </div>
      </div>
    </section>
  );
};

export default Card;
