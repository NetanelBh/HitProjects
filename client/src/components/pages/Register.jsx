import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Input from "../reuse/Input";
import Loading from "../ui/Loading";
import ConfirmModal from "../ui/ConfirmModal";
import useApi from "../../hooks/useHttpRequest";
import { registerInputs } from "../utils.js/utils";

const Register = () => {
	const { isLoading, post } = useApi();

	const [openModal, setOpenModal] = useState(false);
	const [navigateTo, setNavigateTo] = useState("");
	const [isUserExist, setIsUserExist] = useState(false);
	const [isPasswordMatch, setIsPasswordMatch] = useState(true);

	const navigate = useNavigate();

	const fnameRef = useRef();
	const lnameRef = useRef();
	const mailRef = useRef();
	const passwordRef = useRef();
	const confirmRef = useRef();

	// Add the refs to the inputs
	registerInputs[0].ref = fnameRef;
	registerInputs[1].ref = lnameRef;
	registerInputs[2].ref = mailRef;
	registerInputs[3].ref = passwordRef;
	registerInputs[4].ref = confirmRef;

	const registerHandler = async (e) => {
		e.preventDefault();

		if (passwordRef.current.value !== confirmRef.current.value) {
			setIsPasswordMatch(false);
			return;
		}

		setIsPasswordMatch(true);

		const user = {
			firstName: fnameRef.current.value,
			lastName: lnameRef.current.value,
			email: mailRef.current.value,
			password: passwordRef.current.value,
		};

		setIsUserExist(false);

		try {
			const returnedUser = await post("/auth/register", user);
			if (!returnedUser.status) {
				setIsUserExist(true);
				return;
			}

			setOpenModal(true);
			setNavigateTo("/");
		} catch (error) {
			console.log(error);
		}
	};

	const closeModalHandler = () => {
		setOpenModal(false);
		navigate(navigateTo);
	};

	return (
		<>
			{isLoading && <Loading />}

			{!isLoading && (
				<>
					{openModal && (
						<ConfirmModal onClick={closeModalHandler} title="הרישום הצליח" message="המשתמש נוצר בהצלחה" />
					)}

					{!openModal && (
						<div
							dir="rtl"
							className="max-w-lg mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center"
						>
							<h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
								הרשמה
							</h1>
							<form onSubmit={registerHandler} className="w-full flex flex-col gap-4">
								{registerInputs.map((input, i) => (
									<Input
										key={i}
										wrapDivStyle={input.wrapDivStyle}
										label={input.label}
										labelStyle={input.labelStyle}
										inputStyle={input.inputStyle}
										inputName={input.inputName}
										type={input.type}
										ref={input.ref}
										isPasswordMatch={isPasswordMatch}
										isUserExist={isUserExist}
									/>
								))}

								<button
									type="submit"
									className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm"
								>
									הירשם
								</button>
							</form>

							<div className="mt-4 text-center">
								<span className="text-[13px] text-slate-600">יש לך כבר חשבון? </span>
								<NavLink
									to="/"
									className="text-blue-600 font-medium hover:underline ml-1 whitespace-nowrap"
								>
									כניסה
								</NavLink>
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default Register;
