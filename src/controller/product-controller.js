import productService from "../service/product-service.js";

const create = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const result = await productService.create(user, request);
        res.status(200).json({
            success: true,
            data: result,
            message: "Product created successfully"
        })
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
        const result = await productService.upload_data(req);
        res.status(200).json({
            success: true,
            data: result,
            message: "File Uploaded successfully"
        });
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const user = req.user;
        const productId = req.params.productId ?? 0;
        if (productId) {
            const result = await productService.get(user, productId);
            res.status(200).json({
                success: true,
                data: result,
                message: "Product fetched successfully"
            })
        } else {
            const request = {
                product_name: req.query.product_name,
                page: req.query.page,
                size: req.query.size
            };

            const result = await productService.search(user, request);
            res.status(200).json({
                success: true,
                data: result.data,
                paging: result.paging,
                message: "Product fetched successfully"
            });
        }
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const user = req.user;
        const productId = req.params.productId;
        const request = req.body;
        request.id = productId;

        const result = await productService.update(user, request);
        res.status(200).json({
            success: true,
            data: result,
            message: "Product updated successfully"
        })
    } catch (e) {
        next(e);
    }
}

const remove = async (req, res, next) => {
    try {
        const user = req.user;
        const productId = req.params.productId;

        await productService.remove(user, productId);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })
    } catch (e) {
        next(e);
    }
}

export default {
    create,
    get,
    update,
    remove,
    upload_data
}
