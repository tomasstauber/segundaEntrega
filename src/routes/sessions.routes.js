import express  from "express";
import UserManager from "../dao/UserManager.js";

const router = express.Router();
const UM = new UserManager();

router.get("/login", async (req, res) => {
    let {user, pass} = req.query;
    const userLogged = await UM.loggin(user, pass);
    if (userLogged) {
        res.send({status: "OK", message:"Usuario logueado correctamente!" + userLogged});
    } else {
        res.status(401).send({status: "Error", message: "Ha ocurrido un error al loguear el usuario!"})
    }
});

router.post("/register", async (req, res) => {
    const userRegistered = await UM.addUser(req.body);
    if (userRegistered) {
        res.send({status: "OK", message:"Usuario logueado correctamente!" + userRegistered});
    } else {
        res.status(401).send({status: "Error", message: "Ha ocurrido un error al registrar el usuario!"})
    }
    
})

export default router;