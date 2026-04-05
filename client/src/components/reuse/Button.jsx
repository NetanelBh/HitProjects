import React from "react";

const Button = ({ text, type, onClick, className="" }) => {
    const styles = `${className} bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-500 hover:brightness-110 active:brightness-110 text-white p-2 rounded-xl transition cursor-pointer`;
	
    return (
		<button
			type={type}
			onClick={onClick}
			className={styles}
		>
			{text}
		</button>
	);
};
export default Button;
