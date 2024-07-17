// components/HomePageAdmin.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePageAdmin = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("/api/auth/homePageAdmin");
        setAdmins(response.data.admins);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };
    fetchAdmins();
  }, []);

  return (
    <div>
      <h1>Admin Home Page</h1>
      <ul>
        {admins.map((admin) => (
          <li key={admin._id}>{admin.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePageAdmin;
