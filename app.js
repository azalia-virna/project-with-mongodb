const express = require('express');

const db = require("./config/db");
const allRoutes = require("./routes")

const app = express()
const PORT = process.env.PORT || 6050

db.then(() => {
  console.log("berhasil koneksi ke mongoDB");
})
.catch(() => {
  console.log("gagal koneksi ke mongodb");
})

app.use(express.json())
app.use(allRoutes)
app.post('/regis', (req, res) => {
    const { username, password } = req.body; 
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Username dan password harus diisi.' });
    }
    res.json({ message: 'Pengguna berhasil didaftarkan.' });
  });

  app.post('/login', (req, res) => {
    const { username, password } = req.body; 
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Username dan password harus diisi.' });
    }
    if (username === 'pengguna' && password === 'password') {
      const jwtToken = 'token_jwt_yang_dihasilkan';
      res.json({ message: 'Login berhasil', token: jwtToken });
    } else {
      res.status(401).json({ message: 'Login gagal. Username atau password salah.' });
    }
  });
  

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
})
