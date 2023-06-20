import { useState } from "react";
import supabase from "../supabase";
import { useEffect } from "react";
import SmoothieCard from "../components/SmoothieCard";
const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  const handleDelete = (id) => {
    setSmoothies(prevSmoothies => {
      return prevSmoothies.filter(smoothie => smoothie.id !== id);
    })
  }
  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from("smoothies").select();

      if (error) {
        setFetchError("Could not fetch smoothies", error);
        setSmoothies(null);
      }
      if (data) {
        setFetchError(null);
        setSmoothies(data);
      } 
    };
    fetchSmoothies();
  }, []);

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className="smoothies">
          {/* order-by buttons */}
          <div className="smoothie-grid">
            {smoothies.map((smoothies) => (
              <SmoothieCard key={smoothies.id} smoothie={smoothies} onDeleteHandler={handleDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
