import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../reuse/Input";
import Loading from "../ui/Loading";
import useApi from "../../hooks/useHttpRequest";

const ForgotPassword = () => {
  const emailRef = useRef();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

	const resetMailHandler = async (e) => {
		e.preventDefault();
	};

  // TODO: INSIDE THE INPUT ADD THE PROPERTIES TO USE THE INPUT COMPONTENT

	return (
		<section dir="rtl" className="bg-gray-50 dark:bg-gray-900">
			<div className="flex items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
					<h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
						איפוס סיסמה
					</h2>
					<form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={resetMailHandler}>
						<Input />
          
            <div>
							<label
								htmlFor="email"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								כתובת המייל שלך
							</label>
							<input
								type="email"
								name="email"
								id="email"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 focus:bg-transparent outline-blue-500 transition-all block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="name@company.com"
								required=""
							/>
						</div>

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
	);
};

export default ForgotPassword;
