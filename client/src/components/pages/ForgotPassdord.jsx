import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../ui/Modal";
import Input from "../reuse/Input";
import Loading from "../ui/Loading";
import useApi from "../../hooks/useHttpRequest";

const ForgotPassword = () => {
	const emailRef = useRef();
	const navigate = useNavigate();
	const [openModal, setOpenModal] = useState(false);

	const { isLoading, post } = useApi();

	const resetMailHandler = async (e) => {
		e.preventDefault();

		try {
			const response = await post("/auth/forgot-password", {
				email: emailRef.current.value,
			});
			if (response.status) {
				setOpenModal(true);
				return;
			}

			// If the email send didn't succeed, redirect to login again
			navigate("/");
		} catch (err) {
			navigate("/");
			return;
		}
	};

	const closeModalHandler = () => {
		setOpenModal(false);
	};

	return (
		<>
			{isLoading && <Loading />}
			{!isLoading && (
				<>
					{openModal && <Modal title="איפוס סיסמה" text="לינק לאיפוס סיסמה נשלח לתיבת הדואר שלך" onConfirm={closeModalHandler} />}

					{!openModal && (
						<section dir="rtl" className="bg-gray-50 dark:bg-gray-900">
							<div className="flex items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
								<div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
									<h2 className="mb-8 text-lg text-center font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
										איפוס סיסמה
									</h2>

									<form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={resetMailHandler}>
										<Input
											wrapDivStyle="flex items-start flex-col justify-start"
											label="כתובת המייל שלך"
											labelStyle="text-slate-900 text-sm font-medium mb-2 block"
											inputStyle="bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-blue-500 transition-all"
											inputName="email"
											type="email"
											ref={emailRef}
										/>

										<button
											type="submit"
											className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
										>
											שלח
										</button>
									</form>
								</div>
							</div>
						</section>
					)}
				</>
			)}
		</>
	);
};

export default ForgotPassword;
