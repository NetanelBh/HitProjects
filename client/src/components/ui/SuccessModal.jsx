const SuccessModal = ({ onClick, title, message }) => {
	return (
		<div className="fixed inset-0 flex justify-center items-center z-[1000] overflow-auto">
			{/* Backdrop */}
			<div className="fixed inset-0 bg-gray-700/50"></div>

			{/* Modal content */}
			<div className="relative w-full max-w-lg bg-white shadow-lg rounded-lg p-6 z-10">
				<div className="text-center mt-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-14 fill-green-500 mx-auto"
						viewBox="0 0 512 512"
					>
						<path d="M383.841 171.838c-7.881-8.31-21.02-8.676-29.343-.775L221.987 296.732l-63.204-64.893c-8.005-8.213-21.13-8.393-29.35-.387-8.213 7.998-8.386 21.137-.388 29.35l77.492 79.561a20.687 20.687 0 0 0 14.869 6.275 20.744 20.744 0 0 0 14.288-5.694l147.373-139.762c8.316-7.888 8.668-21.027.774-29.344z" />
						<path d="M256 0C114.84 0 0 114.84 0 256s114.84 256 256 256 256-114.84 256-256S397.16 0 256 0zm0 470.487c-118.265 0-214.487-96.214-214.487-214.487 0-118.265 96.221-214.487 214.487-214.487 118.272 0 214.487 96.221 214.487 214.487 0 118.272-96.215 214.487-214.487 214.487z" />
					</svg>

					<div className="mt-6">
						<h3 className="text-xl font-semibold text-slate-900">{title}</h3>
						<p className="text-sm text-slate-500 leading-relaxed mt-3">{message}</p>
					</div>
				</div>

				{/* Only this button closes the modal */}
				<button
					onClick={() => onClick("successModal")}
					className="mt-8 w-full px-5 py-2.5 text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:outline-none"
				>
					אישור
				</button>
			</div>
		</div>
	);
};

export default SuccessModal;
