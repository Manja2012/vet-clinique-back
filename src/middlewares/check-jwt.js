const { checkAccessToken } = require('../utils/token-utils')

const checkJwt = (req, res, next) => {
  // 1. Vérifier que l'utilisateur est authentifié
  const token = req.headers.authorization?.replace('Bearer ', '')
  // 1.1 Vérifier que le token est présent
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Vous devez être authentifié pour accéder à cette ressource' })
  }
  // 1.2 Vérifier que le token est valide
  try {
    const decoded = checkAccessToken(token)
    if (!decoded) {
      throw new Error()
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Le token semble invalide' })
  }

  next()
}

module.exports = checkJwt
