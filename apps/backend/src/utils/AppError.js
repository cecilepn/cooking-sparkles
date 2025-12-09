/**
 * Classe personnalisée pour les erreurs applicatives
 */
export default class AppError extends Error {
  /**
   * Constructeur
   * @param {string} message - Message d'erreur pour l'utilisateur
   * @param {number} statusCode - Code HTTP (400, 404, 500, etc.)
   */
  constructor(message, statusCode) {
    super(message)

    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}
