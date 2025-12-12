import {validate} from "../validation/validation.js";
import {
    createProductValidation,
    getProductValidation, searchProductValidation,
    updateProductValidation
} from "../validation/product-validation.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response-error.js";

const create = async (user, request) => {
    const product = validate(createProductValidation, request);
    product.user_id = user.id;
    product.created_by = user.id;

    return prismaClient.product.create({
        data: product,
        select: {
            id: true,
            product_name: true,
            file: true
        }
    });
}

const upload_data = async (request) => {
    productId = validate(getProductValidation, request.params.productId);

    const totalInDatabase = await prismaClient.product.count({
        where: {
            user_id: request.user.id,
            id: productId
        }
    });

    if (totalInDatabase !== 1) {
        throw new ResponseError(404, "product is not found");
    }

    return prismaClient.product.update({
        where: {
            id: productId
        },
        data: {
            file: `/uploads/${request.file.filename}`,
            updated_by: request.user.id
        }
    });
}

const get = async (user, productId) => {
    productId = validate(getProductValidation, productId);

    const product = await prismaClient.product.findFirst({
        where: {
            user_id: user.id,
            id: productId
        },
        select: {
            id: true,
            product_name: true,
            file: true
        }
    });

    if (!product) {
        throw new ResponseError(404, "product is not found");
    }

    return product;
}

const search = async (user, request) => {
    request = validate(searchProductValidation, request);
    
    const skip = (request.page - 1) * request.size;

    const filters = [];

    filters.push({
        user_id: user.id
    })

    if (request.product_name) {
        filters.push({
            product_name: {
                contains: request.product_name
            }
        });
    }

    const products = await prismaClient.product.findMany({
        where: {
            AND: filters
        },
        take: request.size,
        skip: skip
    });

    const totalItems = await prismaClient.product.count({
        where: {
            AND: filters
        }
    });

    return {
        data: products,
        paging: {
            page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / request.size)
        }
    }
}

const update = async (user, request) => {
    const product = validate(updateProductValidation, request);

    const totalProductInDatabase = await prismaClient.product.count({
        where: {
            user_id: user.id,
            id: product.id
        }
    });

    if (totalProductInDatabase !== 1) {
        throw new ResponseError(404, "product is not found");
    }

    return prismaClient.product.update({
        where: {
            id: product.id
        },
        data: {
            product_name: product.product_name,
            file: product.file
        },
        select: {
            id: true,
            product_name: true,
            file: true
        }
    })
}

const remove = async (user, productId) => {
    productId = validate(getProductValidation, productId);

    const totalInDatabase = await prismaClient.product.count({
        where: {
            user_id: user.id,
            id: productId
        }
    });

    if (totalInDatabase !== 1) {
        throw new ResponseError(404, "product is not found");
    }

    return prismaClient.product.update({
        where: {
            id: productId
        },
        data: {
            status_code: 0,
            updated_by: user.id
        }
    });
}

export default {
    create,
    get,
    update,
    remove,
    search,
    upload_data
}
