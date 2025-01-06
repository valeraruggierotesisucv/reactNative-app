const authenticateUser = require("./authenticateUser.js"); 
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware para permitir CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Ejemplo: Endpoint de test para obtener usuarios
app.get("/api/users", (req, res) => {
  res.json({ users: ["Daniela", "Miguel", "Juan"] });
});

// REjemplo ruta protegida
app.get('/api/protected', authenticateUser, (req, res) => {
  res.json({ 
      message: `Hola,  ${req.user.email} Accediste a una ruta protegida.` 
  });
});

// Iniciar el servidor
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});