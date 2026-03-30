import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../../ui/Modal";
import Input from "../../reuse/Input";
import Loading from "../../ui/Loading";
import useApi from "../../../hooks/useHttpRequest";
import { checkMailValitidy } from "../../utils/utils";

const ForgotPassword = () => {
	const [formValues, setFormValues] = useState({ mail: "", isValidMail: true });
	const navigate = useNavigate();
	const [openModal, setOpenModal] = useState(false);

	const { isLoading, post } = useApi();

	const resetMailHandler = async (e) => {
		e.preventDefault();

		setFormValues({ ...formValues, isValidMail: true });

		const validity = checkMailValitidy(formValues.mail);
		if (!validity) {
			setFormValues({ ...formValues, isValidMail: false });
			return;
		}

		try {
			const response = await post("/auth/forgot-password", {
				email: formValues.mail,
			});

			if (response.status) {
				setOpenModal(true);
				return;
			}

			setFormValues({ ...formValues, isValidMail: false });
		} catch (err) {
			navigate("/");
			return;
		}
	};

	const closeModalHandler = () => {
		setOpenModal(false);
		navigate("/");
	};

	return (
		<main className="relative w-full min-h-screen overflow-hidden">
			{/* 🔵 Background */}
			<div className="background_move absolute top-0 left-0 w-full h-full z-0" />

			{/* 🔵 Loader */}
			{isLoading && (
				<div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
					<Loading />
				</div>
			)}

			{/* 🔵 Modal */}
			{openModal && (
				<div className="relative z-40">
					<Modal
						title="איפוס סיסמה"
						text="לינק לאיפוס סיסמה נשלח לתיבת הדואר שלך"
						onConfirm={closeModalHandler}
					/>
				</div>
			)}

			{/* 🔵 Form */}
			{!openModal && (
				<div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-8">
					<div
						dir="rtl"
						className="w-full max-w-md p-6 bg-white/80 rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 sm:p-8"
					>
						<h2 className="mb-8 text-lg text-center font-bold text-gray-900 dark:text-white">
							איפוס סיסמה
						</h2>

						<form className="space-y-4" onSubmit={resetMailHandler}>
							<Input
								wrapDivStyle="flex items-start flex-col justify-start"
								label="כתובת המייל שלך"
								labelStyle="text-slate-900 text-sm font-medium mb-2 block"
								inputStyle="bg-slate-100 border border-gray-400 w-full text-slate-900 text-sm px-4 py-2 rounded-md focus:bg-transparent outline-blue-500 transition-all"
								inputName="mail"
								type="text"
								value={formValues.mail}
								onChange={(type, value) => setFormValues((prev) => ({ ...prev, [type]: value }))}
								isValidEmail={formValues.isValidMail}
							/>

							<button
								type="submit"
								className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
							>
								שלח
							</button>
						</form>
					</div>
				</div>
			)}
		</main>
	);
};

export default ForgotPassword;
