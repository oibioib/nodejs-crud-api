type UserIdType = string;
type UserNameType = string;
type UserAgeType = number;
type UserHobbyType = string;

type UserType = {
  id: UserIdType;
  username: UserNameType;
  age: UserAgeType;
  hobbies: UserHobbyType[];
};

class DB {
  users: UserType[];

  constructor() {
    this.users = [{ id: '123', age: 26, username: 'Pavel', hobbies: [] }];
  }

  isUserExist() {
    return;
  }

  getUsers() {
    return this.users;
  }

  getUser() {
    return this.users[0];
  }

  addUser(user: UserType) {
    this.users = [...this.users, user];
  }

  updateUser(user: UserType) {
    return;
  }

  deleteUser(userId: UserIdType) {
    return;
  }
}

export default DB;
