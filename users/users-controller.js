import * as dao from './users-dao.js'

const UsersController = (app) => {

    const createUser = async (req, res) => {
        const user = req.body
        const actualUser = await dao.createUser(user)
        res.json(actualUser)
    }

    const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers()
        res.json(users)
    }

    const deleteUser = async (req, res) => {
        const uid = req.params.uid
        const status = await dao.deleteUser(uid)
        res.json(status)
    }

    const updateUser = async (req, res) => {
        const uid = req.params.uid
        const updates = req.body
        const user = await dao.updateUser(uid, updates)
        res.json(user)
    }

    const login = async (req, res) => {
        const credentials = req.body
        const existingUser = await dao.findByCredentials(
            credentials.username, credentials.password)
        if(existingUser) {
            req.session['currentUser'] = existingUser
            res.json(existingUser)
            return
        }
        res.sendStatus(403)
    }

    const register = async (req, res) => {
        const user = req.body;
        const existingUser = await dao.findByUsername(user.username)
        if(existingUser) {
            res.sendStatus(403)
            return
        }
        const currentUser = await dao.createUser(user)
        req.session['currentUser'] = currentUser
        res.json(currentUser)
    }

    const profile = async (req, res) => {
        if (req.session['currentUser']) {
            res.send(req.session['currentUser'])
        } else {
            res.sendStatus(403)
        }
    }

    const logout = (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }

    const findUserById = async (req, res) => {
        const uid = req.params.uid
        const user = await dao.findUserById(uid)
        if (user) {
            res.json(user)
            return
        }
        res.sendStatus(404)
    }

    app.post('/users', createUser)
    app.get('/users', findAllUsers)
    app.get('/users/:uid', findUserById)
    app.delete('/users/:uid', deleteUser)
    app.put('/users/:uid', updateUser)
    app.post('/register', register)
    app.post('/login', login)
    app.post('/profile', profile)
    app.post('/logout', logout)
}

export default UsersController