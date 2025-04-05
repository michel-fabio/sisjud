import { jwtDecode } from 'jwt-decode';

// Retorna o tipo de usuário (cliente, advogado, admin)
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

// Retorna o nome do usuário armazenado no token
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

// Remove os dados de autenticação e redireciona (por padrão para a tela de login)
export function logout(redirectTo = '/') {
  localStorage.removeItem("token");
  localStorage.removeItem("nome_usuario");
  window.location.href = redirectTo;
}
