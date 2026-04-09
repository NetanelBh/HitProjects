import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../../ui/Modal";
import Input from "../../reuse/Input";
import Loading from "../../ui/Loading";
import Button from "../../reuse/Button";
import SuccessModal from "../../ui/SuccessModal";
import useApi from "../../../hooks/useHttpRequest";

import { studentInputs } from "../../utils/utils";

const AddStudent = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState({ regularModal: false, successModal: false });
	const [formValues, setFormValues] = useState({ fname: "", lname: "", phone: "", id: "" });

	const { patch, isLoading, data } = useApi();

    const project = JSON.parse(localStorage.getItem("selectedProject"));

    const addStudentHandler = async (e) => {
        e.preventDefault();

        const studentData = { firstName: formValues.fname, lastName: formValues.lname, phone: formValues.phone, studentId: formValues.id };    
        try {
            const resp = await patch(`/projects/add-student/${project._id}`, studentData);
            if (resp.status) {
                localStorage.setItem("selectedProject", JSON.stringify(resp.data));
                setOpenModal({ regularModal: false, successModal: true });
            } else {
                setOpenModal({ regularModal: true, successModal: false });
            }
        } catch (error) {
            setOpenModal({ regularModal: true, successModal: false });
        }
    };

    const cancelHandler = () => {
        navigate("/dashboard/projects/item");
    };

    const closeModalHandler = () => {
        setOpenModal({ regularModal: false, successModal: false });
        navigate("/dashboard/projects/item");
    };

	return (
		<main className="relative w-full min-h-screen overflow-hidden">
			{/* 🔵 Background */}
			<div className="background_move absolute top-0 left-0 w-full h-full z-0" />

			{/*🔵 Loader */}
			{isLoading && (
				<div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
					<Loading />
				</div>
			)}

			{/* 🔵 success Modal */}
			{openModal.successModal && (
				<div className="relative z-40">
					<SuccessModal onClick={closeModalHandler} title="הוספת סטודנט" message="הסטודנט נוסף בהצלחה" />
				</div>
			)}

			{/* 🔵 Regular Modal */}
			{openModal.regularModal && (
				<div className="relative z-40">
					<Modal onConfirm={closeModalHandler} title="הוספת סטודנט לפרוייקט" text={data} />
				</div>
			)}

			{/* 🔵 Form */}
			<div className="relative z-10 flex mt-12 justify-center p-4">
				<div
					dir="rtl"
					className="max-w-lg w-full bg-white/80 dark:bg-gray-800/80 dark:text-white rounded-lg shadow-md px-8 py-10 flex flex-col items-center"
				>
					<h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
						הוספת סטודנט לפרוייקט
					</h1>

					<form onSubmit={addStudentHandler} className="w-full flex flex-col gap-4">
						{studentInputs.map((input) => (
							<Input
								key={input.inputName}
								{...input}
								value={formValues[input.inputName]}
								onChange={(type, value) => setFormValues((prev) => ({ ...prev, [type]: value }))}
								defaultValue={input.defaultValue}
							/>
						))}

						{/* Add student */}
						<Button text="הוסף סטודנט" type="submit" />

						{/* Cancel */}
						<Button text="ביטול" type="button" onClick={cancelHandler} className="w-fit self-center" />
					</form>
				</div>
			</div>
		</main>
	);
};

export default AddStudent;
