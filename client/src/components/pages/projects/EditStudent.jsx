import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../../ui/Modal";
import Input from "../../reuse/Input";
import Loading from "../../ui/Loading";
import SuccessModal from "../../ui/SuccessModal";

import useApi from "../../../hooks/useHttpRequest";
import { studentInputs } from "../../utils/utils";
import Button from "../../reuse/Button";

const EditStudent = () => {
	const navigate = useNavigate();
	const student = JSON.parse(localStorage.getItem("student"));

	// After the update, save the updated student for sending to project item
	const [updatedStudent, setUpdatedStudent] = useState({refresh: false, updates: {}});
	const [openModal, setOpenModal] = useState({ regularModal: false, successModal: false });
	const [formValues, setFormValues] = useState({
		fname: student.firstName || "",
		lname: student.lastName || "",
		phone: student.phone || "",
		id: student.studentId || "",
	});

	const { isLoading, patch, data } = useApi();

	const updateHandler = async (e) => {
		e.preventDefault();

		setUpdatedStudent({refresh: false, updates: {}, studentId: student._id});

		const updatedStudent = {};

		// If the user update some personal data
		if (formValues.fname !== student.firstName) {
			updatedStudent.firstName = formValues.fname;
		}
		if (formValues.lname !== student.lastName) {
			updatedStudent.lastName = formValues.lname;
		}
		if (formValues.phone !== student.phone) {
			updatedStudent.phone = formValues.phone;
		}
		if (formValues.id !== student.studentId) {
			updatedStudent.studentId = formValues.id;
		}

		try {
			const resp = await patch(`/students/update/${student._id}`, updatedStudent);
			if (resp.status) {
				setOpenModal({ regularModal: false, successModal: true });
				setUpdatedStudent({refresh: true, updates: resp.data});
			} else {
				setOpenModal({ regularModal: true, successModal: false });
			}
		} catch (error) {
			setOpenModal({ regularModal: true, successModal: false });
		}
	};

	const closeModalHandler = () => {
		setOpenModal({ regularModal: false, successModal: false });
		setFormValues({ fname: "", lname: "", phone: "", id: "" });
		navigate("/dashboard/projects/item", {state: updatedStudent});
	};

	return (
		<main className="relative w-full min-h-screen overflow-hidden">
			{/* 🔵 Background */}
			<div className="background_move absolute top-0 left-0 w-full h-full z-0" />

			{/* 🔵 Loader (on top of everything) */}
			{isLoading && (
				<div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
					<Loading />
				</div>
			)}

			{/* 🔵 Modal */}
			{openModal.regularModal && <Modal title="עדכון פרטי סטודנט" text={data} onConfirm={closeModalHandler} />}

			{/* 🔵 Success Modal */}
			{openModal.successModal && (
				<div className="relative z-40">
					<SuccessModal onClick={closeModalHandler} title="עדכון פרופיל" message="פרטי הסטודנט עודכנו בהצלחה" />
				</div>
			)}

			<div className="relative z-10 flex justify-center mt-6 p-4">
				<div
					dir="rtl"
					className="max-w-lg w-full bg-white/80 dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center"
				>
					<h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">עדכון פרטים</h1>

					<form onSubmit={updateHandler} className="w-full flex flex-col gap-4">
						{studentInputs.map((input) => (
							<Input
								key={input.inputName}
								{...input}
								value={formValues[input.inputName]}
								onChange={(type, value) => setFormValues((prev) => ({ ...prev, [type]: value }))}
							/>
						))}

						{/* The update button valid only if the user entered some data */}
						{(formValues.fname !== student.firstName ||
							formValues.lname !== student.lastName ||
							formValues.phone !== student.phone ||
							formValues.id !== student.studentId) && (
							<Button text="עדכון" type="submit" className="font-medium py-2 px-4 rounded-md shadow-sm" />
						)}
					</form>
				</div>
			</div>
		</main>
	);
};

export default EditStudent;
