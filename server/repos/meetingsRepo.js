import MeetingModel from "../models/Meeting.js";

export const addMeeting = (project, meetingDate) => {
    const meeting = MeetingModel({project, meetingDate});
    return meeting.save();
};

export const getMeetings = (project) => {
    return MeetingModel.find({project});
};