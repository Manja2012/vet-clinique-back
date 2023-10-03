// const checkJwt = require('../middlewares/check-jwt')
// const { checkAccessToken } = require('../utils/token-utils')
const Reviews = require('./review.model.js')
const Router = require('express').Router

const router = new Router()


const getRewiews = async(rec, res) => {
    const result = await Reviews.find();
    res.json(result);
}


// router.delete('/reviews/:id',checkJwt, async (req, res) => {
//     // 1. Vérifier que l'utilisateur est authentifié
//     const token = req.headers.authorization.replace('Bearer ', '')
//     // 1.1 Vérifier que le token est présent
//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: 'Vous devez être authentifié pour accéder à cette ressource' })
//     }
//     // 1.2 Vérifier que le token est valide
//     try {
//       const decoded = checkAccessToken(token)
//       if (!decoded) {
//         throw new Error()
//       }
//     } catch (error) {
//       return res
//         .status(401)
//         .json({ message: 'Le token semble invalide' })
//     }
  
//     const id = req.params.id
//     const reviewToDelete = await Review.findById(id)
//     if (!reviewToDelete) {
//       return res
//         .status(404)
//         .json({ message: 'Aucune review trouvée' })
//     }
  
//     await Review.findByIdAndDelete(id)
  
//     res.json(reviewToDelete)
//   })
  
  
module.exports = getRewiews