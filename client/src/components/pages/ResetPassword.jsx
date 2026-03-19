import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

import Modal from "../ui/Modal";
import Input from "../reuse/Input";
import Loading from "../ui/Loading";
import { inputs } from "../utils.js/utils";
import SuccessModal from "../ui/SuccessModal";
import useApi from "../../hooks/useHttpRequest";

const ResetPassword = () => {
	const token = useParams();
	const passwordRef = useRef();
	const confirmRef = useRef();
	const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const { isLoading, post, error, data } = useApi();

	// From all inputs, get only the password and confirm password inputs
	const filteredInputs = inputs.filter((input) => input.inputName === "password" || input.inputName === "confirm");
	filteredInputs[0].ref = passwordRef;
	filteredInputs[1].ref = confirmRef;

	const resetPasswordHandler = async (e) => {
		e.preventDefault();

    // Check if the passwords match
		if (passwordRef.current.value !== confirmRef.current.value) {
			setIsPasswordMatch(false);
			return;
		}

    // Set it to true for the next time
		setIsPasswordMatch(true);
    
    // Send the new password to server and replace the old one
    // TODO: WHEN OPEN MODAL, WILL CHECK IF THERE IS AN ERROR, IF NOT, RENDER SUCCESSMODAL, IF ERROR RENDER MODAL
    try {
      // TODO: SEND TO SERVER THE NEW PASSWORD FROM HERE
      
    } catch (error) {
      
    }
	};

	return (
		<section dir="rtl" className="bg-gray-50 dark:bg-gray-900">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<div className="flex flex-col w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
					<h2 className="text-center mb-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
						בחירת סיסמה חדשה
					</h2>
					<form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={resetPasswordHandler}>
						{filteredInputs.map((input) => (
							<Input key={input.inputName} {...input} isPasswordMatch={isPasswordMatch} />
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
	);
};

export default ResetPassword;
