import { useEffect, useState } from "react";
import { getCategoriesWithItems } from "../services/menuService";

const USER_ID = "0307bc68-5818-4b0c-9e5b-b0c56aaea4fc";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMenu() {
      try {
        const data = await getCategoriesWithItems(USER_ID);
        setCategories(data);
      } catch (err) {
        setError("Failed to load menu");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, []);

  if (loading) return <p>Loading menu...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Eatmosphere Menu 🍽️</h1>

      {categories.map((category) => (
        <div key={category.id} style={{ marginBottom: "30px" }}>
          <h2 className="text-2xl my-font">{category.name}</h2>

          {category.items.length === 0 ? (
            <p>No items available</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {category.items.map((item) => (
                <li
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 0",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
