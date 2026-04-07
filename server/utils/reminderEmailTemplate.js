const reminderEmailTemplate = (projectName, lastMeetingDate) => {
	return `
		<h2>📅 Meeting Reminder</h2>
		<p><b>Project:</b> ${projectName}</p>
		<p><b>Last Meeting:</b> ${new Date(lastMeetingDate).toLocaleDateString()}</p>
		<p style="color:red;"><b>⚠️ צריך לקבוע שיחה לקבוצה</b></p>
	`;
};

export default reminderEmailTemplate;