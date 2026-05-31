const BASE_URL = 'http://localhost:8080/api/games';


async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = 'Error al conectar con el servidor.';
    try {
      const errorData = await response.json();
      if (errorData && errorData.message) {
        errorMessage = errorData.message;
      }
    } catch (e) {
      
    }
    throw new Error(errorMessage);
  }
  return response.json();
}

export const apiService = {
  /**
   * 
   * @param {string[]} playerNames - Array de nombres de jugadores para iniciar el juego.
   */
  async startGame(playerNames) {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerNames })
    });
    return handleResponse(response);
  },

  /**
   * Obtiene el estado actual del juego, incluyendo detalles de los jugadores, sus manos, puntuaciones y el estado de la ronda.
   * @param {string} gameId 
   */
  async fetchGameState(gameId) {
    const response = await fetch(`${BASE_URL}/${gameId}`);
    return handleResponse(response);
  },

  /**
   * Envía la acción de un jugador (HIT o STAND) al servidor para que procese el turno.
   * @param {string} gameId 
   * @param {string} playerId 
   * @param {'HIT'|'STAND'} action 
   */
  async handleAction(gameId, playerId, action) {
    const response = await fetch(`${BASE_URL}/${gameId}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerId, action })
    });
    return handleResponse(response);
  },

  /**
   * Inicia la siguiente ronda del juego después de que todos los jugadores hayan terminado su turno. Resetea las manos y actualiza las puntuaciones acumuladas.
   * @param {string} gameId 
   */
  async startNextRound(gameId) {
    const response = await fetch(`${BASE_URL}/${gameId}/next-round`, {
      method: 'POST'
    });
    return handleResponse(response);
  }
};
