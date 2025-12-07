import axios from "axios";

const API = "http://localhost:3000";

export async function getStudentDashboard(token: string) {
  const headers = { Authorization: `Bearer ${token}` };

  const res = await axios.get(`${API}/students/me/dashboard`, { headers });

  return res.data;
}
