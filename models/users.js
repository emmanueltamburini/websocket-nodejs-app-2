export default class Users {
    constructor() {
        this.users =  [];
    }

    addUser(id, name) {
        let user = {id, name};
        this.users.push(user);

        return this.users;
    }

    getUserByID(id) {
        return  this.users.filter(currentUser => currentUser.id = id)[0];
    }

    getUsers() {
        return this.users;
    }

    getUsersByRoom(room) {
        // TODO
    }

    deleteUser(id) {
        let deletedUser = this.getUserByID(id);
        this.user = this.users.filter(currentUser => currentUser.id !== id);

        return deletedUser;
    }
}