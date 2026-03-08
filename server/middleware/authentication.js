import jwt from "jsonwebtoken";

const authentication = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
        
		if (!authHeader) {
			return res.send({status: false, data: "NO_TOKEN" });
		}

		const token = authHeader.split(" ")[1];
		const payload = jwt.verify(token, process.env.JWT_SECRET);

		req.user = {userId: payload.userId};

		next();
	} catch (error) {
		return res.send({status: false, data: "INVALID_TOKEN" });
	}
};

export default authentication;