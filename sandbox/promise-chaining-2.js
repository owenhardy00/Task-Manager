const mongoose = require('mongoose')
const Task = require('../src/models/task')

Task.findByIdAndRemove('63d2d7b74c5f88b8862efb47').then((task) => {
    console.log(task)

    return Task.countDocuments({ completed: false })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})