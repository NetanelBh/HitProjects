import * as meetingsRepo from "../repos/meetingsRepo.js";

export const addMeeting = (projectId, meetingData) => {
    return meetingsRepo.addMeeting(projectId, meetingData);
};

export const getMeetings = (projectId) => {
    return meetingsRepo.getMeetings(projectId);
};