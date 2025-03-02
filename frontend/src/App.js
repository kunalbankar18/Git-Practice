import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  const register = async () => {
    try {
      await axios.post("http://localhost:5000/register", { username, password });
      alert("User registered successfully");
    } catch (error) {
      alert("Registration failed");
    }
  };

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", { username, password });
      setToken(res.data.access_token);
      alert("Login successful");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  const getProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data.user);
    } catch (error) {
      alert("Failed to fetch profile");
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">User Management System</h1>
      <input
        className="border p-2 rounded mb-2"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border p-2 rounded mb-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-2" onClick={register}>Register</button>
      <button className="bg-green-500 text-white px-4 py-2 rounded mb-2" onClick={login}>Login</button>
      {token && <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={getProfile}>Get Profile</button>}
      {profile && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-xl font-bold">Profile</h2>
          <p>ID: {profile.id}</p>
          <p>Username: {profile.username}</p>
        </div>
      )}
    </div>
  );
};

export default App;
