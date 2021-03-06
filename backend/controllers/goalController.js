const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc Get goals
// @route Get /api/goals
// @access private
const getGoals = asyncHandler(async (req, res) =>{
    const goals = await Goal.find({ user: req.user.id })
    
    res.status(200).json(goals)
})

// @desc POST goals
// @route POST /api/goals
// @access private
const setGoals = asyncHandler(async (req, res) =>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field') 
    }
    const goal = await Goal.create({ 
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})

// @desc update goals
// @route update /api/goals/:id
// @access private
const updateGoals = asyncHandler(async (req, res) =>{
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    //Check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    const updateGoals = await Goal.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,
        })
    res.status(200).json(updateGoals)
})

// @desc delete goals
// @route delete /api/goals/:id
// @access private
const deleteGoals = asyncHandler(async (req, res) =>{
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    await goal.remove()
    res.status(200).json({
       id: req.params.id 
    })
    // res.status(200).send({
    //     message: `Delete Goal ${req.params.id}`
    // })
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals,
}