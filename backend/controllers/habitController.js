const Habit = require('../models/habit');
const Status = require('../models/status');

// loading all habits and Rending Homepage 
exports.homePage = async function (req, res) {
    let allHabitsObj = [];
    try {
        allHabitsObj = await Habit.find({}).populate('record');
        return res.status(200).send({"allHabitsObj":allHabitsObj});
    } catch (err) {
        console.error(err);
        res.status(500).json({ 'errorMessage': 'something went wrong at server side ' });
    }
}

//Update the status of existing habit based on input url parameters habitId and statusId
exports.updateHabitStatus = async function (req, res) {
    try {
        const { habitId, statusId } = req.params;
        const record = await Status.findOne({ habit: habitId, _id: statusId });
        if (!record) {
            return res.status(404).json({ error: "Status/Habit not found" });
        }
        record.status = record.status === "Not done" ? "None" : record.status === "None" ? "Done" : "Not done";
        await record.save();
        return res.status(200).send({ 'status': record.status });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 'errorMessage': 'something went wrong at server side ' });
    }
}

// For adding new records in Habit db
exports.createHabit = async function (req, res) {
    try {
        const newHabit = new Habit({ title: req.body.title });
        const habit = await newHabit.save();
        console.log('habit added in db successfully : ' + habit);
        return res.status(200).send({habit});
    } catch (err) {
        if(err.message.includes('duplicate key error'))
            return res.status(400).json({ 'errorMessage': 'Habit already Exists'});
        return res.status(500).json({ 'errorMessage': 'error while adding new habit'});
    }
};

// for deleting existing habit from db
exports.deleteHabit = async function (req, res) {
    try {
        console.log(req.params);
        const id = req.params.habitId;
        await Habit.findByIdAndDelete(id);
        await Status.deleteMany({ habit: id });
        return res.status(200).send({"habit deleted from db successfully" : id});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ 'errorMessage': 'something went wrong at server side ' });
    }
};

