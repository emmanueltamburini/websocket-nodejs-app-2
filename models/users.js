export default class Users {
    constructor() {
        this.users =  [];
    }

    addUser(id, name, room) {
        let user = {id, name, room};
        this.users.push(user);

        return this.users.filter(user => user.room === room);
    }

    getUserByID(id) {
        return  this.users.filter(currentUser => currentUser.id === id)[0];
    }

    getUsers() {
        return this.users;
    }

    getUsersByRoom(room) {
        return this.users.filter(user => user.room === room);
    }

    deleteUser(id) {
        let deletedUser = this.getUserByID(id);
        if (!deletedUser) {
            return null;
        }

        this.users = this.users.filter(currentUser => currentUser.id !== id);

        return deletedUser;
    }
}