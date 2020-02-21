const bcrypt = require('bcryptjs');

module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body
        const { session } = req 
        const db = req.app.get('db')
        
        let user = await db.check_user([email])
        user = user[0]
        
        if(!user){
            return res.status(400).send('Register')
        }

        const isAuth = bcrypt.compareSync(password, user.user_password)
        if(isAuth) {
            // delete user.user_password
            // session.user = user
            session.user = {
                email: user.user_email,
                id: user.user_id
            }
            return res.status(202).send(session.user)
        }
        res.status(401).send('Incorrect password')
    },
    register: async (req, res) => {
        const { email, password } = req.body
        const { session } = req
        const db = req.app.get('db')

        let user = await db.check_user([email])
        user = user[0]

        if(user) {
            return res.status(400).send('user already exists')
        }

        const salt = bcrypt.genSaltSync(20)
        const hash = bcrypt.hashSync(password, salt)
        
        let newUser = await db.register_user({email, hash})
        newUser = newUser[0]

        session.user = newUser;
        res.status(201).send(session.user)
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getUser: (req, res) => {
        if(req.session.user) {
            return res.status(200).send(req.session.user)
        }
        res.status(200).send('')
    }
};