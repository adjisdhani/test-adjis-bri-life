import {prismaClient} from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "test"
        }
    })
}

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "test",
            password: await bcrypt.hash("test", 10),
            name: "test",
            token: "test",
            created_by: 9999,
            id: 99999
        }
    })
}

export const getTestUser = async () => {
    return prismaClient.user.findFirst({
        where: {
            username:  "test"
        }
    });
}

export const removeAllTestProducts = async () => {
    await prismaClient.product.deleteMany({
        where: {
            user_id: 99999
        }
    });
}

export const createTestProduct = async () => {
    await prismaClient.product.create({
        data: {
            product_name: "test",
            user_id: 99999,
            created_by: 9999,
        }
    })
}

export const createManyTestProducts = async () => {
    for (let i = 0; i < 15; i++) {
        await prismaClient.product.create({
            data: {
                user_id: 99999,
                product_name: `test ${i}`,
                file: `${i}`,
                created_by: 9999,
            }
        })
    }
}

export const getTestProduct = async () => {
    return prismaClient.product.findFirst({
        where: {
            user_id: 99999
        }
    })
}
