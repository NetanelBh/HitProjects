import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import useApi from "../../hooks/useHttpRequest";
import Loading from "../ui/Loading";

const Login = () => {
	const { isLoading, post } = useApi();

	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isVerifiedEmail, setIsVerifiedEmail] = useState(true);
	const [isVerifiedPassword, setIsVerifiedPassword] = useState(true);

	// Clear the session storage only once when enter to login page(aviod case re-rendering and remove the real token)
	useEffect(() => {
		sessionStorage.clear();
	}, []);

	const onChangeHandler = (type, value) => {
		if (type === "email") {
			setEmail(value);
			setIsVerifiedEmail(true);
		} else if (type === "password") {
			setPassword(value);
			setIsVerifiedPassword(true);
		}
	};

	const loginHandler = async (e) => {
		e.preventDefault();

		try {
			const response = await post("/auth/login", {
				email,
				password,
			});

			if (response.data === "אימייל לא תקין") {
				setIsVerifiedEmail(false);
				return;
			}

			if (response.data === "סיסמה שגויה") {
				setIsVerifiedPassword(false);
				return;
			}

			sessionStorage.setItem("token", response.data.token);
			setEmail("");
			setPassword("");
			navigate("/dashboard");
		} catch (error) {
			console.log("Login error:", error);
		}
	};

	return (
		<div dir="rtl" className="min-h-screen flex flex-col items-center justify-center p-4">
			{isLoading && <Loading />}
			<div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 bg-[#F9F8F6] [box-shadow:0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
				<div className="md:max-w-md w-full px-4 py-4">
					<form onSubmit={loginHandler}>
						<h1 className=" mb-12 text-slate-900 text-3xl font-bold text-center">כניסה</h1>

						<div>
							<label className="text-slate-900 text-[13px] font-medium block mb-2" htmlFor="email">
								מייל
							</label>
							<div className="relative flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="#bbb"
									stroke="#bbb"
									className="w-[18px] h-[18px] absolute left-2"
									viewBox="0 0 682.667 682.667"
								>
									<defs>
										<clipPath id="a" clipPathUnits="userSpaceOnUse">
											<path d="M0 512h512V0H0Z" data-original="#000000"></path>
										</clipPath>
									</defs>
									<g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
										<path
											fill="none"
											strokeMiterlimit="10"
											strokeWidth="40"
											d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
											data-original="#000000"
										></path>
										<path
											d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
											data-original="#000000"
										></path>
									</g>
								</svg>

								<input
									autoComplete="email"
									id="email"
									name="email"
									type="text"
									value={email}
									onFocus={() => setIsVerifiedEmail(true)}
									onChange={(e) => onChangeHandler("email", e.target.value)}
									required
									className={`w-full text-slate-900 text-sm focus:border-blue-600 pr-2 pl-8 py-2 outline-none ${!isVerifiedEmail ? "border-2 border-red-500" : "border-b border-slate-300"}`}
									placeholder="הכנס כתובת מייל"
								/>
							</div>
						</div>
						<div className="mt-8">
							<label className="text-slate-900 text-[13px] font-medium block mb-2" htmlFor="password">
								סיסמה
							</label>
							<div className="relative flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="#bbb"
									stroke="#bbb"
									className="w-[18px] h-[18px] absolute left-2 cursor-pointer"
									viewBox="0 0 128 128"
									onClick={() => setShowPassword((prev) => !prev)}
								>
									<path
										d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
										data-original="#000000"
									></path>
								</svg>

								<input
									id="password"
									name="password"
									value={password}
									type={showPassword ? "text" : "password"}
									onFocus={() => setIsVerifiedPassword(true)}
									onChange={(e) => onChangeHandler("password", e.target.value)}
									required
									className={`w-full text-slate-900 text-sm focus:border-blue-600 pr-2 pl-8 py-2 outline-none ${!isVerifiedPassword ? "border-2 border-red-500" : "border-b border-slate-300"}`}
									placeholder="הכנס סיסמה"
								/>
							</div>
						</div>

						<div className="mt-4">
							<NavLink
								to="/forgot-password"
								className="text-blue-600 font-medium text-sm hover:underline"
							>
								שכחת סיסמה?
							</NavLink>
						</div>

						<div className="mt-12">
							<button
								type="submit"
								className="w-full shadow-xl py-2.5 px-4 text-sm font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
							>
								כניסה
							</button>
						</div>

						<div className="flex mt-6 justify-center">
							<span className="text-[13px] text-slate-600">
								אין לך משתמש?{" "}
								<NavLink
									to="/register"
									className="text-blue-600 font-medium hover:underline ml-1 whitespace-nowrap"
								>
									הירשם כאן
								</NavLink>
							</span>
						</div>
					</form>
				</div>

				<div className="hidden md:flex w-full h-full items-center bg-[#000842] rounded-xl p-8">
					<img
						src="https://readymadeui.com/signin-image.webp"
						className="w-full aspect-[12/12] object-contain"
						alt="login-image"
					/>
				</div>
			</div>
		</div>
	);
};

export default Login;
