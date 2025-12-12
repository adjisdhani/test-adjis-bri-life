import {validate} from "../validation/validation.js";
import {
    getUserValidation,
    loginUserValidation,
    registerUserValidation,
    updateUserValidation
} from "../validation/user-validation.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response-error.js";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";

const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
        where: {
            username: user.username
        }
    });

    if (countUser === 1) {
        throw new ResponseError(400, "Username already exists");
    }

    user.password   = await bcrypt.hash(user.password, 10);
    user.created_by = 1;

    return prismaClient.user.create({
        data: user,
        select: {
            id: true,
            username: true,
            name: true,
            file: true
        }
    });
}

const upload_data = async (request) => {
    const id = validate(getUserValidation, request.user.id);

    const user = await prismaClient.user.findUnique({
        where: {
            id: id
        }
    });

    if (!user) {
        throw new ResponseError(404, "user is not found");
    }

    return prismaClient.user.update({
        where: {
            id: id
        },
        data: {
            updated_by: id,
            file: `/uploads/${request.file.filename}`,
        },
        select: {
            username: true
        }
    })
}

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);
    const user = await prismaClient.user.findFirst({
        where: {
            username: loginRequest.username
        },
        select: {
            username: true,
            password: true,
            status_code: true,
            id: true
        }
    });

    if (!user) {
        throw new ResponseError(401, "User is not found");
    }

    if (user.status_code !== 1) {
        throw new ResponseError(401, "User is not active");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const token = uuid().toString()
    return prismaClient.user.update({
        data: {
            token: token,
            updated_by: user.id
        },
        where: {
            id: user.id
        },
        select: {
            token: true
        }
    });
}

const get = async (id) => {
    id = validate(getUserValidation, id);

    const user = await prismaClient.user.findUnique({
        where: {
            id: id
        },
        select: {
            username: true,
            name: true,
            id: true
        }
    });

    if (!user) {
        throw new ResponseError(404, "user is not found");
    }

    return user;
}

const update = async (request) => {
    const user = validate(updateUserValidation, request);

    const totalUserInDatabase = await prismaClient.user.count({
        where: {
            id: user.id
        }
    });

    if (totalUserInDatabase !== 1) {
        throw new ResponseError(404, "user is not found");
    }

    const data = {};
    if (user.name) {
        data.name = user.name;
    }
    if (user.password) {
        data.password = await bcrypt.hash(user.password, 10);
    }
    if (user.status_code) {
        data.status_code = user.status_code;
    }
    if (user.file) {
        data.file = user.file;
    }

    return prismaClient.user.update({
        where: {
            id: user.id
        },
        data: data,
        select: {
            username: true,
            name: true,
            id: true
        }
    })
}

const delete_data = async (id, updated_by) => {
    id = validate(getUserValidation, id);

    const user = await prismaClient.user.findUnique({
        where: {
            id: id
        }
    });

    if (!user) {
        throw new ResponseError(404, "user is not found");
    }

    return prismaClient.user.update({
        where: {
            id: id
        },
        data: {
            status_code: 0,
            updated_by: updated_by
        },
        select: {
            username: true
        }
    })
}

const logout = async (id) => {
    // id = validate(getUserValidation, Number(id));

    const user = await prismaClient.user.findUnique({
        where: {
            id: id
        }
    });

    if (!user) {
        throw new ResponseError(404, "user is not found");
    }

    return prismaClient.user.update({
        where: {
            id: id
        },
        data: {
            token: null
        },
        select: {
            username: true
        }
    })
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
