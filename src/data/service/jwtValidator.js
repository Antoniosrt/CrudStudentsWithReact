// Função para decodificar o payload do JWT
function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Erro ao decodificar o JWT", error);
      return null;
    }
  }
  
  // Função para verificar se o JWT expirou
  function isJwtExpired(token) {
    const decodedToken = parseJwt(token);
  
    if (!decodedToken || !decodedToken.exp) {
      return true; // Se não conseguir decodificar ou não tiver exp, consideramos como expirado
    }
  
    const now = Date.now() / 1000; // Em segundos
  
    return decodedToken.exp < now;
  }
  
  // Função para recuperar e verificar o JWT do localStorage
  function getValidJwtFromStorage(key) {
    const token = localStorage.getItem(key);
    console.log('expri',isJwtExpired(token))
    if (!token || isJwtExpired(token)) {
      localStorage.removeItem(key);
      return null; // Token inválido ou expirado
    }
  
    return token; // Token válido
  }
  export default getValidJwtFromStorage