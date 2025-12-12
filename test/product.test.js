import {
    createManyTestProducts,
    createTestProduct,
    createTestUser,
    getTestProduct,
    removeAllTestProducts,
    removeTestUser
} from "./test-util.js";
import supertest from "supertest";
import {web} from "../src/application/web.js";

describe('POST /api/products', function () {
    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeAllTestProducts();
        await removeTestUser();
    })

    it('should can create new product', async () => {
        const result = await supertest(web)
            .post("/api/products")
            .set('Token', 'test')
            .send({
                product_name: "test",
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.product_name).toBe("test");
    });

    it('should reject if request is not valid', async () => {
        const result = await supertest(web)
            .post("/api/products")
            .set('Token', 'test')
            .send({
                product_name: "",
            });

        expect(result.status).toBe(400);
    });
});

describe('GET /api/products/:productId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestProduct();
    })

    afterEach(async () => {
        await removeAllTestProducts();
        await removeTestUser();
    })

    it('should can get product', async () => {
        const testProduct = await getTestProduct();

        const result = await supertest(web)
            .get("/api/products/" + testProduct.id)
            .set('Token', 'test');

        expect(result.status).toBe(200);
    });

    it('should return 404 if product id is not found', async () => {
        const testProduct = await getTestProduct();

        const result = await supertest(web)
            .get("/api/products/" + (testProduct.id + 1))
            .set('Token', 'test');

        expect(result.status).toBe(404);
    });
});

describe('PUT /api/products/:productId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestProduct();
    })

    afterEach(async () => {
        await removeAllTestProducts();
        await removeTestUser();
    })

    it('should can update existing product', async () => {
        const testProduct = await getTestProduct();

        const result = await supertest(web)
            .put('/api/products/' + testProduct.id)
            .set('Token', 'test')
            .send({
                product_name: "Test",
            });

        expect(result.status).toBe(200);
    });

    it('should reject if request is invalid', async () => {
        const testProduct = await getTestProduct();

        const result = await supertest(web)
            .put('/api/products/' + testProduct.id)
            .set('Token', 'test')
            .send({
                product_name: "",
            });

        expect(result.status).toBe(400);
    });

    it('should reject if product is not found', async () => {
        const testProduct = await getTestProduct();

        const result = await supertest(web)
            .put('/api/products/' + (testProduct.id + 1))
            .set('Token', 'test')
            .send({
                product_name: "Test",
            });

        expect(result.status).toBe(404);
    });
});

// describe('DELETE /api/products/:productId', function () {
//     beforeEach(async () => {
//         await createTestUser();
//         await createTestProduct();
//     })

//     afterEach(async () => {
//         await removeAllTestProducts();
//         await removeTestUser();
//     })

//     it('should can delete product', async () => {
//         let testProduct = await getTestProduct();
//         const result = await supertest(web)
//             .delete('/api/products/' + testProduct.id)
//             .set('Token', 'test');

//         expect(result.status).toBe(200);

//         testProduct = await getTestProduct();
//         expect(testProduct).toBeNull();
//     });

//     it('should reject if product is not found', async () => {
//         let testProduct = await getTestProduct();
//         const result = await supertest(web)
//             .delete('/api/products/' + (testProduct.id + 1))
//             .set('Token', 'test');

//         expect(result.status).toBe(404);
//     });
// });

describe('GET /api/products', function () {
    beforeEach(async () => {
        await createTestUser();
        await createManyTestProducts();
    })

    afterEach(async () => {
        await removeAllTestProducts();
        await removeTestUser();
    })

    it('should can search without parameter', async () => {
        const result = await supertest(web)
            .get('/api/products')
            .set('Token', 'test');

        expect(result.status).toBe(200);
    });

    it('should can search to page 2', async () => {
        const result = await supertest(web)
            .get('/api/products')
            .query({
                page: 2
            })
            .set('Token', 'test');

        expect(result.status).toBe(200);
    });

    it('should can search using name', async () => {
        const result = await supertest(web)
            .get('/api/products')
            .query({
                product_name: "test 1"
            })
            .set('Token', 'test');

        expect(result.status).toBe(200);
    });
});
