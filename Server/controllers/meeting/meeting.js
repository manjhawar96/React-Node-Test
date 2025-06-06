const MeetingHistory = require('../../model/schema/meeting')
const mongoose = require('mongoose');
const { meetingSchema } = require('../../validators/meeting');

const add = async (req, res) => {
   try {
    const { error, value } = meetingSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    const meeting = await MeetingHistory.create({...value})
    return res.status(201).json(meeting)
   } catch (err) {
    return res.status(500).json({ error:`Internal Server Error` });
   }
}

const index = async (req, res) => {
    try {
        const filter = { deleted: false };
        if (req.query.createBy) {
            filter.createBy = req.query.createBy
        }
        const meetings = await MeetingHistory.find(filter).sort({timestamp: -1});
        return res.status(200).json(meetings);
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error'});
    }
}

const view = async (req, res) => {
    try {
        const meetings = await MeetingHistory.findOne({_id: req.params.id, deleted:false});
        if (!meetings) return res.status(404).json({error: 'Meeting not found'});
        return res.status(200).json(meetings)
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error'});
    }
}

const deleteData = async (req, res) => {
    try {
        const result = await MeetingHistory.findByIdAndUpdate(req.params.id, { deleted: true })
        if (!result) res.status(404).json({error: 'Meeting not found'});
        return res.status(200).json({message: 'Deleted Successfully'});
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error'});
    }
}

const deleteMany = async (req, res) => {
    try {
        const ids = req.body;
        if(!Array.isArray(ids)) return res.status(400).json({error: 'Invalid payload'});
        await MeetingHistory.updateMany(
            { 
              _id: {$in: ids.map(id => new mongoose.Types.ObjectId(id))}  
            },
            { deleted: true }
        );
        return res.status(200).json({message: 'Deleted Successfully'});
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error'});
    }
}

module.exports = { add, index, view, deleteData, deleteMany }