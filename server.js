const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let cars = [
  { id: 1, name: "Toyota Fortuner", model: "2023", price: 4500000, warranty: "3 Years" },
  { id: 2, name: "Hyundai Creta", model: "2022", price: 1800000, warranty: "2 Years" }
];

// ✅ GET all cars
app.get("/cars", (req, res) => {
  res.json(cars);
});

// ✅ ADD a new car
app.post("/cars", (req, res) => {
  const { id, name, model, price, warranty } = req.body;
  if (!id || !name) {
    return res.status(400).json({ msg: "Car ID and name are required" });
  }
  cars.push({ id: Number(id), name, model, price, warranty });
  res.json({ msg: "Car added successfully!", cars });
});

// ✅ UPDATE an existing car
app.put("/cars/:id", (req, res) => {
  const { id } = req.params;
  const { name, model, price, warranty } = req.body;

  const index = cars.findIndex((c) => c.id == id);
  if (index === -1) {
    return res.status(404).json({ msg: "Car not found" });
  }

  cars[index] = {
    ...cars[index],
    name: name || cars[index].name,
    model: model || cars[index].model,
    price: price || cars[index].price,
    warranty: warranty || cars[index].warranty
  };

  res.json({ msg: "Car updated successfully!", car: cars[index] });
});

// ✅ DELETE a car
app.delete("/cars/:id", (req, res) => {
  const { id } = req.params;
  const index = cars.findIndex((c) => c.id == id);
  if (index === -1) {
    return res.status(404).json({ msg: "Car not found" });
  }

  const deleted = cars.splice(index, 1);
  res.json({ msg: "Car deleted successfully!", deleted });
});

// ✅ HOME ROUTE
app.get("/", (req, res) => {
  res.send("🚗 Car Dealer API is running...");
});

// ✅ START SERVER
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
