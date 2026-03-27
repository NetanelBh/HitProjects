export const inputs = [
    {
        wrapDivStyle: "flex items-start flex-col justify-start",
        label: "שם פרטי",
        labelStyle: "text-slate-900 text-sm font-medium mb-2 block",
        inputStyle: "bg-slate-200 border border-gray-400 w-full text-slate-900 text-sm px-4 py-2 rounded-md focus:bg-transparent outline-blue-500 transition-all",
        inputName: "fname",
        type: "text",
    },{
        wrapDivStyle: "flex items-start flex-col justify-start",
        label: "שם משפחה",
        labelStyle: "text-slate-900 text-sm font-medium mb-2 block",
        inputStyle: "bg-slate-200 border border-gray-400 w-full text-slate-900 text-sm px-4 py-2 rounded-md focus:bg-transparent outline-blue-500 transition-all",
        inputName: "lname",
        type: "text",
    },{
        wrapDivStyle: "flex items-start flex-col justify-start",
        label: "אימייל",
        labelStyle: "text-slate-900 text-sm font-medium mb-2 block",
        inputStyle: "bg-slate-200 border border-gray-400 w-full text-slate-900 text-sm px-4 py-2 rounded-md focus:bg-transparent outline-blue-500 transition-all",
        inputName: "mail",
        type: "text",
    },{
        wrapDivStyle: "flex items-start flex-col justify-start",
        label: "סיסמה",
        labelStyle: "text-slate-900 text-sm font-medium mb-2 block",
        inputStyle: "bg-slate-200 border border-gray-400 w-full text-slate-900 text-sm pl-8 pr-4 py-2 rounded-md focus:bg-transparent outline-blue-500 transition-all",
        inputName: "password",
        type: "password",
    },{
        wrapDivStyle: "flex items-start flex-col justify-start",
        label: "אימות סיסמה",
        labelStyle: "text-slate-900 text-sm font-medium mb-2 block",
        inputStyle: "bg-slate-200 border border-gray-400 w-full text-slate-900 text-sm pl-8 pr-4 py-2 rounded-md focus:bg-transparent outline-blue-500 transition-all",
        inputName: "confirm",
        type: "password",
    }
]

// Check mail validity
export const checkMailValitidy = (mail) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);

// Data for Header navbar component to crete the navigation routes
export const navigation = [
	{ name: "הפרוייקטים שלי", to: "/dashboard/projects/my-projects" }
];

// Data for Header component when create the profile button menu
export const menuItemsData = {
    className: "block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden",
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