export const inputs = [
	{
		wrapDivStyle: "flex items-start flex-col justify-start",
		label: "שם פרטי",
		labelStyle: "text-slate-900 dark:text-white text-sm font-medium mb-2 block",
		inputStyle:
			"bg-white dark:bg-gray-500 " + // Base background
			"border border-gray-400 dark:border-gray-600 " + // Base border
			"w-full max-w-md mx-auto appearance-none text-slate-900 dark:text-white text-sm px-4 py-2 rounded-md transition-all " +
			"outline-none focus:outline-none " + // Remove default browser outline
			"focus:ring-2 focus:ring-blue-500 focus:border-transparent " + // Add a clean blue ring
			"focus:bg-white dark:focus:bg-gray-700", // FORCE background to stay solid on focus
		inputName: "fname",
		type: "text",
	},
	{
		wrapDivStyle: "flex items-start flex-col justify-start",
		label: "שם משפחה",
		labelStyle: "text-slate-900 dark:text-white text-sm font-medium mb-2 block",
		inputStyle:
			"bg-white dark:bg-gray-500 " + // Base background
			"border border-gray-400 dark:border-gray-600 " + // Base border
			"w-full max-w-md mx-auto appearance-none text-slate-900 dark:text-white text-sm px-4 py-2 rounded-md transition-all " +
			"outline-none focus:outline-none " + // Remove default browser outline
			"focus:ring-2 focus:ring-blue-500 focus:border-transparent " + // Add a clean blue ring
			"focus:bg-white dark:focus:bg-gray-700", // FORCE background to stay solid on focus
		inputName: "lname",
		type: "text",
	},
	{
		wrapDivStyle: "flex items-start flex-col justify-start",
		label: "אימייל",
		labelStyle: "text-slate-900 dark:text-white text-sm font-medium mb-2 block",
		inputStyle:
			"bg-white dark:bg-gray-500 " + // Base background
			"border border-gray-400 dark:border-gray-600 " + // Base border
			"w-full max-w-md mx-auto appearance-none text-slate-900 dark:text-white text-sm px-4 py-2 rounded-md transition-all " +
			"outline-none focus:outline-none " + // Remove default browser outline
			"focus:ring-2 focus:ring-blue-500 focus:border-transparent " + // Add a clean blue ring
			"focus:bg-white dark:focus:bg-gray-700", // FORCE background to stay solid on focus
		inputName: "mail",
		type: "text",
	},
	{
		wrapDivStyle: "flex items-start flex-col justify-start",
		label: "סיסמה",
		labelStyle: "text-slate-900 dark:text-white text-sm font-medium mb-2 block",
		inputStyle:
			"bg-white dark:bg-gray-500 " + // Base background
			"border border-gray-400 dark:border-gray-600 " + // Base border
			"w-full max-w-md mx-auto appearance-none text-slate-900 dark:text-white text-sm px-4 py-2 rounded-md transition-all " +
			"outline-none focus:outline-none " + // Remove default browser outline
			"focus:ring-2 focus:ring-blue-500 focus:border-transparent " + // Add a clean blue ring
			"focus:bg-white dark:focus:bg-gray-700", // FORCE background to stay solid on focus
		inputName: "password",
		type: "password",
	},
	{
		wrapDivStyle: "flex items-start flex-col justify-start",
		label: "אימות סיסמה",
		labelStyle: "text-slate-900 dark:text-white text-sm font-medium mb-2 block",
		inputStyle:
			"bg-white dark:bg-gray-500 " + // Base background
			"border border-gray-400 dark:border-gray-600 " + // Base border
			"w-full max-w-md mx-auto appearance-none text-slate-900 dark:text-white text-sm px-4 py-2 rounded-md transition-all " +
			"outline-none focus:outline-none " + // Remove default browser outline
			"focus:ring-2 focus:ring-blue-500 focus:border-transparent " + // Add a clean blue ring
			"focus:bg-white dark:focus:bg-gray-700", // FORCE background to stay solid on focus
		inputName: "confirm",
		type: "password",
	},
];

// Check mail validity
export const checkMailValitidy = (mail) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);

// Data for Header navbar component to crete the navigation routes
export const navigation = [
	{ name: "פרוייקטים פעילים", to: "/dashboard/projects/active" },
	{ name: "פרוייקטים שהסתיימו", to: "/dashboard/projects/completed" },
];

// Data for Header component when create the profile button menu
export const menuItemsData = {
	className: "block px-4 py-1 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden",
	data: [
		{
			name: "עריכה",
			to: "/dashboard/profile/edit-profile",
		},
		{
			name: "התנתקות",
			to: "/",
		},
	],
};

export const courseInputs = [
	{
		wrapDivStyle: "flex items-start flex-col justify-start",
		label: "שם הפרוייקט",
		labelStyle: "text-slate-900 dark:text-white text-sm font-medium mb-2 block",
		inputStyle:
			"bg-white dark:bg-gray-500 " + // Base background
			"border border-gray-400 dark:border-gray-600 " + // Base border
			"w-full max-w-md mx-auto appearance-none text-slate-900 dark:text-white text-sm px-4 py-2 rounded-md transition-all " +
			"outline-none focus:outline-none " + // Remove default browser outline
			"focus:ring-2 focus:ring-blue-500 focus:border-transparent " + // Add a clean blue ring
			"focus:bg-white dark:focus:bg-gray-700", // FORCE background to stay solid on focus
		inputName: "name",
		type: "text",
	},
	{
		wrapDivStyle: "flex items-start flex-col justify-start",
		label: "סמסטרים",
		labelStyle: "text-slate-900 dark:text-white text-sm font-medium mb-2 block",
		inputStyle:
			"bg-white dark:bg-gray-500 " + // Base background
			"border border-gray-400 dark:border-gray-600 " + // Base border
			"w-full max-w-md mx-auto appearance-none text-slate-900 dark:text-white text-sm px-4 py-2 rounded-md transition-all " +
			"outline-none focus:outline-none " + // Remove default browser outline
			"focus:ring-2 focus:ring-blue-500 focus:border-transparent " + // Add a clean blue ring
			"focus:bg-white dark:focus:bg-gray-700", // FORCE background to stay solid on focus
		inputName: "semesters",
		type: "text",
		placeholder: "לדוגמא: א-ב / ב-ג / א",
	},
	{
		wrapDivStyle: "flex items-start flex-col justify-start",
		label: "תאריך התחלה",
		labelStyle: "text-slate-900 dark:text-white text-sm font-medium mb-2 block",
		inputStyle:
			"bg-white dark:bg-gray-500 " + // Base background
			"border border-gray-400 dark:border-gray-600 " + // Base border
			"w-full max-w-md mx-auto appearance-none text-slate-900 dark:text-white text-sm px-4 py-2 rounded-md transition-all " +
			"outline-none focus:outline-none " + // Remove default browser outline
			"focus:ring-2 focus:ring-blue-500 focus:border-transparent " + // Add a clean blue ring
			"focus:bg-white dark:focus:bg-gray-700", // FORCE background to stay solid on focus
		inputName: "startDate",
		type: "Date",
		placeholder: "לדוגמא: 1.1.2026",
	},
	{
		wrapDivStyle: "flex items-start flex-col justify-start",
		label: "תאריך סיום",
		labelStyle: "text-slate-900 dark:text-white text-sm font-medium mb-2 block",
		inputStyle:
			"bg-white dark:bg-gray-500 " + // Base background
			"border border-gray-400 dark:border-gray-600 " + // Base border
			"w-full max-w-md mx-auto appearance-none text-slate-900 dark:text-white text-sm px-4 py-2 rounded-md transition-all " +
			"outline-none focus:outline-none " + // Remove default browser outline
			"focus:ring-2 focus:ring-blue-500 focus:border-transparent " + // Add a clean blue ring
			"focus:bg-white dark:focus:bg-gray-700", // FORCE background to stay solid on focus
		inputName: "endDate",
		type: "Date",
		placeholder: "לדוגמא: 31.12.2026",
	},
];

export const studentInputs = [
	{
		wrapDivStyle: "flex items-start flex-col justify-start",
		label: "שם פרטי",
		labelStyle: "text-slate-900 dark:text-white text-sm font-medium mb-2 block",
		inputStyle:
			"bg-white dark:bg-gray-500 " + // Base background
			"border border-gray-400 dark:border-gray-600 " + // Base border
			"w-full text-slate-900 dark:text-white text-sm px-4 py-2 rounded-md transition-all " +
			"outline-none focus:outline-none " + // Remove default browser outline
			"focus:ring-2 focus:ring-blue-500 focus:border-transparent " + // Add a clean blue ring
			"focus:bg-white dark:focus:bg-gray-700", // FORCE background to stay solid on focus
		inputName: "fname",
		type: "text",
	},
	{
		wrapDivStyle: "flex items-start flex-col justify-start",
		label: "שם משפחה",
		labelStyle: "text-slate-900 dark:text-white text-sm font-medium mb-2 block",
		inputStyle:
			"bg-white dark:bg-gray-500 " + // Base background
			"border border-gray-400 dark:border-gray-600 " + // Base border
			"w-full text-slate-900 dark:text-white text-sm px-4 py-2 rounded-md transition-all " +
			"outline-none focus:outline-none " + // Remove default browser outline
			"focus:ring-2 focus:ring-blue-500 focus:border-transparent " + // Add a clean blue ring
			"focus:bg-white dark:focus:bg-gray-700", // FORCE background to stay solid on focus
		inputName: "lname",
		type: "text",
	},
	{
		wrapDivStyle: "flex items-start flex-col justify-start",
		label: "טלפון",
		labelStyle: "text-slate-900 dark:text-white text-sm font-medium mb-2 block",
		inputStyle:
			"bg-white dark:bg-gray-500 " + // Base background
			"border border-gray-400 dark:border-gray-600 " + // Base border
			"w-full text-slate-900 dark:text-white text-sm px-4 py-2 rounded-md transition-all " +
			"outline-none focus:outline-none " + // Remove default browser outline
			"focus:ring-2 focus:ring-blue-500 focus:border-transparent " + // Add a clean blue ring
			"focus:bg-white dark:focus:bg-gray-700", // FORCE background to stay solid on focus
		inputName: "phone",
		type: "tel",
	},
	{
		wrapDivStyle: "flex items-start flex-col justify-start",
		label: "מספר ת.ז.",
		labelStyle: "text-slate-900 dark:text-white text-sm font-medium mb-2 block",
		inputStyle:
			"bg-white dark:bg-gray-500 " + // Base background
			"border border-gray-400 dark:border-gray-600 " + // Base border
			"w-full text-slate-900 dark:text-white text-sm px-4 py-2 rounded-md transition-all " +
			"outline-none focus:outline-none " + // Remove default browser outline
			"focus:ring-2 focus:ring-blue-500 focus:border-transparent " + // Add a clean blue ring
			"focus:bg-white dark:focus:bg-gray-700", // FORCE background to stay solid on focus
		inputName: "id",
		type: "text",
	},
];

export const calculateProgress = (startDate, endDate) => {
	const now = new Date();
	const start = new Date(startDate);
	const end = new Date(endDate);

	if (now <= start) return 0;
	if (now >= end) return 100;

	const total = end - start;
	const passed = now - start;

	return Math.round((passed / total) * 100);
};

import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const exportToExcel = async (studentsList, projectName) => {
	const workbook = new ExcelJS.Workbook();
	const worksheet = workbook.addWorksheet("סטודנטים");

	// 🔹 RTL sheet
	worksheet.views = [{ rightToLeft: true }];

	// 🔹 Define columns
	worksheet.columns = [
		{ header: "", key: "index", width: 5 },
		{ header: "שם הפרויקט", key: "projectName", width: 25 },
		{ header: "שם", key: "name", width: 25 },
		{ header: "ת.ז.", key: "id", width: 15 },
		{ header: "פלאפון", key: "phone", width: 18 },
	];

	// 🔹 Add rows
	studentsList.forEach((s, index) => {
		worksheet.addRow({
			index: index + 1,
			projectName: s.projectName || "",
			name: s.name || "",
			id: s.id || "",
			phone: s.phone || "",
		});
	});

	// 🔹 Style header row
	const headerRow = worksheet.getRow(1);
	headerRow.font = { bold: true };
	headerRow.alignment = { horizontal: "center", vertical: "middle" };
	headerRow.eachCell((cell) => {
		cell.fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "FFADD8E6" }, // Light Blue
		};
		cell.border = {
			top: { style: "thin" },
			left: { style: "thin" },
			bottom: { style: "thin" },
			right: { style: "thin" },
		};
	});

	// 🔹 Right-align all data cells & apply zebra colors
	worksheet.eachRow((row, rowNumber) => {
		// Skip header
		if (rowNumber === 1) return;

		row.eachCell((cell) => {
			cell.alignment = { horizontal: "right", vertical: "middle" };
			cell.border = {
				top: { style: "thin" },
				left: { style: "thin" },
				bottom: { style: "thin" },
				right: { style: "thin" },
			};

			// Zebra striping
			cell.fill = {
				type: "pattern",
				pattern: "solid",
				fgColor: { argb: rowNumber % 2 === 0 ? "FFFFFFFF" : "FFFFFACD" }, // Even = white, Odd = light yellow
			};
		});
	});

	// 🔹 Generate file
	const buffer = await workbook.xlsx.writeBuffer();
	const file = new Blob([buffer], {
		type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	});
	saveAs(file, `${projectName} - students list`);
};

export const formatFunction = (isoDate) => {
	return new Intl.DateTimeFormat("he-IL", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	}).format(new Date(isoDate));
};
