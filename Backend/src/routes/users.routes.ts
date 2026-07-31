import { Router } from "express";
import { 
    changeUserPassword, 
    changeUserUsername, 
    createUser, 
    deleteResetToken, 
    findResetToken, 
    findUserByEmail, 
    getUserById, 
    loginUser, 
    saveResetToken 
} from "../controllers/users.controller";
import verifyLoginToken from "../middlewares/verifyLoginTokenMiddleware";

const usersRoutes = Router();

usersRoutes.route('/sing-up')
    .post(createUser)

usersRoutes.route('/login')
    .post(loginUser)

usersRoutes.route('/select-by-email')
    .post(findUserByEmail)

usersRoutes.route('/select-by-id')
    .get(verifyLoginToken, getUserById)

usersRoutes.route('/find-token')
    .post(findResetToken)

usersRoutes.route('/delete-token')
    .delete(deleteResetToken)

usersRoutes.route('/save-token')
    .post(saveResetToken)

usersRoutes.route('/reset-password')
    .put(changeUserPassword)

usersRoutes.route('/update-username')
    .put(verifyLoginToken, changeUserUsername)

    

export default usersRoutes;