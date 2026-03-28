import { useState } from "react";

import Modal from "../../ui/Modal";
import Input from "../../reuse/Input";
import Loading from "../../ui/Loading";
import SuccessModal from "../../ui/SuccessModal";

import useApi from "../../../hooks/useHttpRequest";
import { inputs } from "../../utils.js/utils";

const EditProfile = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	
  const [openModal, setOpenModal] = useState({ regularModal: false, successModal: false });
	const [isPasswordMatch, setIsPasswordMatch] = useState(true);
	const [formValues, setFormValues] = useState({
		fname: user.firstName || "",
		lname: user.lastName || "",
		password: "",
		confirm: "",
	});

	const { isLoading, patch, data } = useApi();

	const updateHandler = async (e) => {
		e.preventDefault();

		setIsPasswordMatch(true);

		const updatedUser = {};

		// If the user update some personal data
		if (formValues.fname !== user.firstName) {
			updatedUser.firstName = formValues.fname;
		}
		if (formValues.lname !== user.lastName) {
			updatedUser.lastName = formValues.lname;
		}
		// If the user entered a new password, check if equals
		if (formValues.password !== "" && formValues.password === formValues.confirm) {
			updatedUser.password = formValues.password;
		} else if (formValues.password !== "" && formValues.password !== formValues.confirm) {
			setIsPasswordMatch(false);
			return;
		}

		try {
			setOpenModal(true);
			// const resp = await patch("/users/update", updatedUser);
			if (resp.status) {
				setOpenModal({ regularModal: false, successModal: true });
			} else {
				setOpenModal({ regularModal: true, successModal: false });
			}
		} catch (error) {
			setOpenModal({ regularModal: true, successModal: false });
		}
	};

	const closeModalHandler = () => {
		setOpenModal({ regularModal: false, successModal: false });
		setFormValues({ fname: "", lname: "", password: "", confirm: "" });
		setIsPasswordMatch(true);
	};

	// Return only the objects that the user can edit(I don't need email)
	const allowedInputs = new Set(["fname", "lname", "password", "confirm"]);
	const filteredInputs = inputs
		.filter((input) => allowedInputs.has(input.inputName))
		.map((filterdInput) => {
			if (filterdInput.inputName === "password") {
				return { ...filterdInput, label: "סיסמה חדשה" };
			}

			if (filterdInput.inputName === "confirm") {
				return { ...filterdInput, label: "אימות סיסמה" };
			}

			return filterdInput;
		});

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
			{openModal.regularModal && <Modal title="עדכון פרופיל" text={data} onConfirm={closeModalHandler} />}

			{/* 🔵 Success Modal */}
			{openModal.successModal && (
				<div className="relative z-40">
					<SuccessModal onClick={closeModalHandler} title="עדכון פרופיל" message="הפרופיל עודכן בהצלחה" />
				</div>
			)}

			<div className="relative z-10 min-h-screen flex items-center justify-center p-4">
				<div
					dir="rtl"
					className="max-w-lg w-full bg-white/80 dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center"
				>
					<h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">עדכון פרטים</h1>

					<form onSubmit={updateHandler} className="w-full flex flex-col gap-4">
						{filteredInputs.map((input) => (
							<Input
								key={input.inputName}
								{...input}
								value={formValues[input.inputName]}
								onChange={(type, value) => setFormValues((prev) => ({ ...prev, [type]: value }))}
								isPasswordMatch={isPasswordMatch}
							/>
						))}

						{/* The update button valid only if the user entered some data */}
						{(formValues.fname !== user.firstName ||
							formValues.lname !== user.lastName ||
							formValues.password !== "" ||
							formValues.confirm !== "") && (
							<button
								type="submit"
								className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm"
							>
								עדכון
							</button>
						)}
					</form>
				</div>
			</div>
		</main>
	);
};

export default EditProfile;
