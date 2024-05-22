import "./TrendingSlider.css";
import { items } from "./AllData";

function TrendingItem() {
  const filteredItems = items.filter((item) => item.id >= 8);
  return (
    <>
      {filteredItems.map((item) => (
        <div key={item.id} className="row-item">
          <div
            onClick={() => window.top(0, 0)}
            to={`/categories/product/${item.id}`}
          >
            <div className="item-header">
              <img src={item.img} alt="product" />
            </div>
            <div className="item-description">
              <p>{item.description}</p>
              <p className="item-price">{item.price}$</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default TrendingItem;
