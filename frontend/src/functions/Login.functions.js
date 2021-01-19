let user = [
    {
        id: 1,
        name: "john",
        email: 'john@gmail.com',
        role: 'Admin',
        password: '12345'
    },
    {
        id: 2,
        name: "micky",
        email: 'micky@gmail.com',
        role: 'tester',
        password: '98765'
    }
]

export const LoginFunction = (loginDetails) => {
    let currentUser = [];
    let error = {}
    // for(let i = 0; i < user.length; i++){
    var userLogin = new Promise((resolve, reject) => {
        for (let i = 0; i < user.length; i++) {
            if (loginDetails.email === user[i].email) {
                if (loginDetails.password === user[i].password) {
                    currentUser.push(user[i]);
                } else {
                    error.password = 'password is Incorrect!'
                }
            } else {
            }
            if (i < user.length) { resolve(); }
        }
    })
    // }
    userLogin.then(() => {
        return (currentUser, error)
    })
}