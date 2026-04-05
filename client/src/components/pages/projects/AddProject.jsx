import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../../ui/Modal";
import Input from "../../reuse/Input";
import Loading from "../../ui/Loading";
import { courseInputs } from "../../utils/utils";
import SuccessModal from "../../ui/SuccessModal";
import useApi from "../../../hooks/useHttpRequest";
import Button from "../../reuse/Button";

// TODO: ADD THE DROPDOWN TO SELECT THE WHATSAPP GROUP WHEN ADD IT TO WEBSITE(THE GROUP I OPENED FOR AUTOMATIC MESSAGE SENDING)
// TODO: FOLLOW THE CHATGPT INSTRUCTIONS. I FINISHED THE WHATSAPP ROUTER, START HERE FROM STEP3-FRONTEND

const AddProject = () => {
	const [navigateTo, setNavigateTo] = useState("");
	const [isCourseExist, setIsCourseExist] = useState(false);
	const [openModal, setOpenModal] = useState({ regularModal: false, successModal: false });
	const [formValues, setFormValues] = useState({
		name: "",
		semesters: "",
		startDate: "",
		endDate: "",
	});

	const navigate = useNavigate();
	const { isLoading, post, error, data } = useApi();

	const addCourseHandler = async (e) => {
		e.preventDefault();
		setIsCourseExist(false);

		const course = {
			name: formValues.name,
			startDate: formValues.startDate,
			endDate: formValues.endDate,
			semesters: formValues.semesters,
		};

		try {
			const returnedCourse = await post("/projects/create", course);

			if (!returnedCourse.status) {
				setIsCourseExist(true);
				setOpenModal({ regularModal: true, successModal: false });
				return;
			}

			setOpenModal({ regularModal: false, successModal: true });
			setNavigateTo("/dashboard/projects/active");
		} catch (error) {
			console.log(error.message);
		}
	};

	const closeModalHandler = () => {
		setOpenModal({ regularModal: false, successModal: false });
		// Only when add course is successful, reset the form values and navigate to courses list
		if (!error) {
			setFormValues({ courseName: "", semesters: "", year: "" });
			setIsCourseExist(false);
		}

		navigate(navigateTo);
	};

	const cancelHandler = () => {
		navigate("/dashboard/projects/active");
	};

	return (
		<main className="relative w-full min-h-screen overflow-hidden">
			{/* 🔵 Background */}
			<div className="background_move absolute top-0 left-0 w-full h-full z-0" />

			{/*🔵 Loader */}
			{isLoading && (
				<div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
					<Loading />
				</div>
			)}

			{/* 🔵 success Modal */}
			{openModal.successModal && (
				<div className="relative z-40">
					<SuccessModal onClick={closeModalHandler} title="הוספת פרוייקט" message="הפרוייקט נוסף בהצלחה" />
				</div>
			)}

			{/* 🔵 Regular Modal */}
			{openModal.regularModal && (
				<div className="relative z-40">
					<Modal onConfirm={closeModalHandler} title="הוספת פרוייקט" text={data} />
				</div>
			)}

			{/* 🔵 Form */}
			<div className="relative z-10 flex mt-12 justify-center p-4">
				<div
					dir="rtl"
					className="max-w-lg w-full bg-white/80 dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center"
				>
					<h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
						הוספת פרוייקט
					</h1>

					<form onSubmit={addCourseHandler} className="w-full flex flex-col gap-4">
						{courseInputs.map((input) => (
							<Input
								key={input.inputName}
								{...input}
								value={formValues[input.inputName]}
								onChange={(type, value) => setFormValues((prev) => ({ ...prev, [type]: value }))}
								isUserExist={isCourseExist} // reuse error for existing course
							/>
						))}

						{/* Add project button */}
						<Button
							text="הוסף פרוייקט"
							type="submit"
							className="font-medium py-2 px-4 rounded-md shadow-sm"
						/>

						{/* Cancel */}
						<Button
							text="ביטול"
							type="button"
							onClick={cancelHandler}
							className="font-medium py-2 px-4 rounded-md shadow-sm w-fit self-center"
						/>
					</form>
				</div>
			</div>
		</main>
	);
};

export default AddProject;
