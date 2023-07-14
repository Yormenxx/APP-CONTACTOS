
const { isUtf8 } = require("buffer");
const {Router} = require("express");
const {v4: uuidv4 } = require("uuid")
const fs = require("fs")
const router = Router();

const jsonContacts = fs.readFileSync("./src/contacts.json","utf-8")

let contactos = JSON.parse(jsonContacts)

router.get("/",(req,res)=>{

    res.render("index.ejs",{
        contactos
    })
   
})


router.post("/index.ejs",(req,res)=>{

    

    const {nombre, apellido, direccion, telefono} = req.body

    console.log("obteniendo un nuevo usuario post ", req.body.nombre)

    if(!nombre || !apellido || !direccion || !telefono){
        res.status(404).send("fail, something is not send, try again")

        return;
    }

    let newcontact ={
        id : uuidv4(),
        nombre,
        apellido,
        direccion,
        telefono
    }

    contactos.push(newcontact)

    const jsonContacts  = JSON.stringify(contactos)

    fs.writeFileSync("./src/contacts.json",jsonContacts,"utf-8")

    console.log("contacto guardado en jsn")

    res.redirect("/")

   
})

router.get("/delete/:id",(req,res)=>{

    contactos = contactos.filter(contacto => contacto.id != req.params.id)

    const jsonContacts  = JSON.stringify(contactos)

    fs.writeFileSync("src/contacts.json",jsonContacts,"utf-8")

    res.redirect("/")
})

module.exports=router       


