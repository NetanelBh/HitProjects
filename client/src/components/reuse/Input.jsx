import { forwardRef } from "react";

const Input = forwardRef(({ wrapDivStyle, label, labelStyle, inputStyle, inputName, type, defaultValue }, ref) => {
	return (
		<div className={wrapDivStyle}>
			<label className={labelStyle} htmlFor={inputName}>
				{label}
			</label>
			<input
				id={inputName}
				name={inputName}
				type={type}
				className={inputStyle}
				// TODO: REMOVE THE DEFAULT VALUES AFTER THE TESTS
				defaultValue={defaultValue}
				ref={ref}
			/>
		</div>
	);
});

export default Input;
