const mongoose = require('mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('63d2d676056e2f2f383a5d60', { age: 13 }).then((user) => {
//     console.log(user)

//     return User.countDocuments({ age: 13 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })

    return count
}

updateAgeAndCount('63d2d676056e2f2f383a5d60', 44).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndRemove(id)
    const count = await Task.countDocuments({ completed: false })

    return count
}

deleteTaskAndCount('63d2d676056e2f2f383a5d60').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})


