import { useState } from "react";
import { useParams } from "react-router-dom";

import Modal from "../../ui/Modal";
import Input from "../../reuse/Input";
import Loading from "../../ui/Loading";
import { inputs } from "../../utils/utils";
import SuccessModal from "../../ui/SuccessModal";
import useApi from "../../../hooks/useHttpRequest";

const ResetPassword = () => {
	const { token } = useParams();
	const [formValues, setFormValues] = useState({
		password: "",
		confirm: "",
	});
	const [openModal, setOpenModal] = useState({ regularModal: false, successModal: false });
	const [isPasswordMatch, setIsPasswordMatch] = useState(true);

	const { isLoading, post, error, data } = useApi();

	// From all inputs, get only the password and confirm password inputs
	const filteredInputs = inputs.filter((input) => input.inputName === "password" || input.inputName === "confirm");

	const resetPasswordHandler = async (e) => {
		e.preventDefault();

		// Set it to true for the next time
		setIsPasswordMatch(true);

		// Check if the passwords match
		if (formValues.password !== formValues.confirm) {
			setIsPasswordMatch(false);
			return;
		}

		// Send the new password to server and replace the old one
		try {
			const resp = await post(`/auth/reset-password/${token}`, { newPassword: formValues.password });
      console.log(resp);
      
      if(resp.status) {
        setOpenModal({regularModal: false, successModal: true});
      } else {
        setOpenModal({regularModal: true, successModal: false});
      }
		} catch (error) {
			setOpenModal({regularModal: true, successModal: false});
			console.log(error.message);
		}
	};

	const closeModalHandler = () => {
		setOpenModal({regularModal: false, successModal: false});
		setFormValues({ password: "", confirm: "" });
		setIsPasswordMatch(true);
	};

	return (
		<>
			{isLoading && <Loading />}

			{error && openModal.regularModal && <Modal title="איפוס סיסמה" text={data !== 'jwt expired' ? data : "פג תוקף הלינק, לחץ שוב על 'שכחתי סיסמא'"} onConfirm={closeModalHandler} />}

			<>
				{openModal.successModal && !error && (
					<SuccessModal onClick={closeModalHandler} title="איפוס סיסמה" message="הסיסמה עודכנה בהצלחה" />
				)}

				<section dir="rtl" className="bg-gray-50 dark:bg-gray-900">
					<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
						<div className="flex flex-col w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
							<h2 className="text-center mb-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
								בחירת סיסמה חדשה
							</h2>
							<form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={resetPasswordHandler}>
								{filteredInputs.map((input) => (
									<Input
										key={input.inputName}
										{...input}
										value={formValues[input.inputName]}
										onChange={(type, value) =>
											setFormValues((prev) => ({ ...prev, [type]: value }))
										}
										isPasswordMatch={isPasswordMatch}
									/>
								))}

								<button
									type="submit"
									className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								>
									איפוס סיסמה
								</button>
							</form>
						</div>
					</div>
				</section>
			</>
		</>
	);
};

export default ResetPassword;
