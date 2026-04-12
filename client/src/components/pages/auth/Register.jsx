import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Input from "../../reuse/Input";
import Loading from "../../ui/Loading";
import SuccessModal from "../../ui/SuccessModal";
import useApi from "../../../hooks/useHttpRequest";
import { inputs, checkMailValitidy } from "../../utils/utils";
import Button from "../../reuse/Button";

const Register = () => {
	const { isLoading, post } = useApi();

	const [openModal, setOpenModal] = useState(false);
	const [navigateTo, setNavigateTo] = useState("");
	const [isUserExist, setIsUserExist] = useState(false);
	const [isValidEmail, setIsValidEmail] = useState(true);
	const [isPasswordMatch, setIsPasswordMatch] = useState(true);
	const [formValues, setFormValues] = useState({
		fname: "",
		lname: "",
		mail: "",
		password: "",
		confirm: "",
	});

	const navigate = useNavigate();

	const registerHandler = async (e) => {
		e.preventDefault();

		setIsPasswordMatch(true);
		setIsValidEmail(true);
		setIsUserExist(false);

		if (formValues.password !== formValues.confirm) {
			setIsPasswordMatch(false);
			return;
		}

		// Check if the email is valid
		const validity = checkMailValitidy(formValues.mail);
		if (!validity) {
			setIsValidEmail(false);
			return;
		}

		const user = {
			firstName: formValues.fname,
			lastName: formValues.lname,
			email: formValues.mail,
			password: formValues.password,
		};

		try {
			const returnedUser = await post("/auth/register", user);
			// check if the user already exist
			if (!returnedUser.status) {
				setIsUserExist(true);
				return;
			}

			setOpenModal(true);
			setNavigateTo("/");
		} catch (error) {
			console.log(error.message);
		}
	};

	const closeModalHandler = () => {
		setOpenModal(false);
		navigate(navigateTo);
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
			{openModal && (
				<div className="relative z-40">
					<SuccessModal onClick={closeModalHandler} title="הרישום הצליח" message="המשתמש נוצר בהצלחה" />
				</div>
			)}

			{/* 🔵 Form */}
			{!openModal && (
				<div className="relative z-10 flex mt-6 justify-center p-4">
					<div
						dir="rtl"
						className="max-w-lg w-full bg-white/80 dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center"
					>
						<h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">הרשמה</h1>

						<form onSubmit={registerHandler} className="w-full flex flex-col gap-4">
							{inputs.map((input) => (
								<Input
									key={input.inputName}
									{...input}
									value={formValues[input.inputName]}
									onChange={(type, value) => setFormValues((prev) => ({ ...prev, [type]: value }))}
									isPasswordMatch={isPasswordMatch}
									isUserExist={isUserExist}
									isValidEmail={isValidEmail}
								/>
							))}

							<Button text="הרשמה" type="submit" className="shadow-sm" />
						</form>

						<div className="mt-4 text-center">
							<span className="text-[13px] text-slate-600 dark:text-white">יש לך כבר חשבון? </span>
							<NavLink
								to="/"
								className="text-blue-400 font-medium hover:underline ml-1 whitespace-nowrap"
							>
								כניסה
							</NavLink>
						</div>
					</div>
				</div>
			)}
		</main>
	);
};

export default Register;
