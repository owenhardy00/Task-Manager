const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/task')

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


// GET /tasks?completed=false||true
// GET /tasks?limit10&skip=0 (limit = query limit, skip = # queries to initially skip)
// GET /tasks?soryBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    const sort = {}
    
    if(req.query.sort) {
        const parts = req.query.sort.split(':')
        sort[parts[0]] = parts[1]
    }

    try {
        if (req.query.completed) {
            tasks = await Task.find({ 
                owner: req.user._id,
                completed: req.query.completed
            }).limit(parseInt(req.query.limit) || null).skip(parseInt(req.query.skip) || null).sort(sort)
        } else {
            tasks = await Task.find({
                owner: req.user._id
            }).limit(parseInt(req.query.limit) || null).skip(parseInt(req.query.skip) || null).sort(sort)
        }

        res.send(tasks)
    } catch (e) {
        res.status(500).send
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })

        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']     // Only let the user update these key/value pairs
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})

        if(!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id})

        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router