const asyncHandler = require('express-async-handler');
// @desc Get goals
// @route Get /api/goals
// @access private
const getGoals = asyncHandler(async (req, res) =>{
    res.status(200).json({
        message: 'Get Goals'
    })
})

// @desc POST goals
// @route POST /api/goals
// @access private
const setGoals = asyncHandler(async (req, res) =>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field') 
    }
    res.status(200).json({
        message: 'Post Goals'
    })
})

// @desc update goals
// @route update /api/goals/:id
// @access private
const updateGoals = asyncHandler(async (req, res) =>{
    res.status(200).send({
        message: `Update Goal ${req.params.id}`
    })
})

// @desc delete goals
// @route delete /api/goals/:id
// @access private
const deleteGoals = asyncHandler(async (req, res) =>{
    res.status(200).send({
        message: `Delete Goal ${req.params.id}`
    })
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals,
}