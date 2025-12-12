import userService from "../service/user-service.js";

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body);
        res.status(200).json({
            success: true,
            data: result,
            message: "User registered successfully"
        });
    } catch (e) {
        next(e);
    }
}

const upload_data = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: 'File not provided' 
            });
        }
        const result = await userService.upload_data(req);
        res.status(200).json({
            success: true,
            data: result,
            message: "File Uploaded successfully"
        });
    } catch (e) {
        next(e);
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            success: true,
            data: result,
            message: "User logged in successfully"
        });
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const id = req.user.id;
        const result = await userService.get(id);
        res.status(200).json({
            success: true,
            data: result,
            message: "User fetched successfully"
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.user.id;
        const request = req.body;
        request.id = id;

        const result = await userService.update(request);
        res.status(200).json({
            success: true,
            data: result,
            message: "User updated successfully"
        });
    } catch (e) {
        next(e);
    }
}

const delete_data = async (req, res, next) => {
    try {
        await userService.delete_data(req.params.id, req.user.id);
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (e) {
        next(e);
    }
}

const logout = async (req, res, next) => {
    try {
        await userService.logout(req.user.id);
        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });
    } catch (e) {
        next(e);
    }
}

export default {
    register,
    login,
    get,
    update,
    logout,
    delete_data,
    upload_data
}
