import React from "react";

// onClose prop sends only if the modal should contain a close button(not just OK)
const Modal = ({ title, text, onConfirm, onClose = undefined }) => {
	return (
		<div
			dir="rtl"
			className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto"
		>
			<div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
				<div className="flex items-center pb-3 border-b border-gray-300">
					<h3 className="text-slate-900 text-xl font-semibold flex-1">{title}</h3>
					<svg
						id="closeIcon"
						xmlns="http://www.w3.org/2000/svg"
						className="w-3.5 h-3.5 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
						viewBox="0 0 320.591 320.591"
					></svg>
				</div>

				<div className="my-6">
					<p className="text-slate-600 text-sm leading-relaxed">{text}</p>
				</div>

				<div className="border-t border-gray-300 pt-6 flex justify-start gap-4">
					<button
						id="confirmButton"
						type="button"
						className="px-4 py-2 cursor-pointer rounded-lg text-white text-sm font-medium border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
						onClick={onConfirm}
					>
						אישור
					</button>

					{onClose && (
						<button
							id="closeButton"
							type="button"
							className="px-4 py-2 cursor-pointer rounded-lg text-slate-900 text-sm font-medium border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
                            onClick={onClose}
						>
							ביטול
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Modal;
