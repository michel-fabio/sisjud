import { jwtDecode } from 'jwt-decode';

export function getUserRole() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.tipo || null;
  } catch (err) {
    console.error("Erro ao decodificar token:", err);
    return null;
  }
}

export function getUserName() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.nome || null;
  } catch (err) {
    console.error("Erro ao decodificar token:", err);
    return null;
  }
}