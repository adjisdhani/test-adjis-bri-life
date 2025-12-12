import supertest from "supertest";
import {web} from "../src/application/web.js";
import {createTestUser, getTestUser, removeTestUser} from "./test-util.js";
import bcrypt from "bcrypt";

describe('POST /api/users', function () {

    afterEach(async () => {
        await removeTestUser();
    })

    it('test for new user', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'test',
                name: 'test'
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined();
    });

    it('test reject if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: '',
                password: '',
                name: ''
            });

        expect(result.status).toBe(400);
    });

    it('test reject if username already registered', async () => {
        let result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'test',
                name: 'test'
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined();

        result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'test',
                name: 'test'
            });

        expect(result.status).toBe(400);
    });
});

describe('POST /api/users/login', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('test can login', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "test"
            });


        expect(result.status).toBe(200);
    });

    it('test reject login if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "",
                password: ""
            });


        expect(result.status).toBe(400);
    });

    it('should reject login if password is wrong', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "wrong"
            });


        expect(result.status).toBe(401);
    });

    it('should reject login if username is wrong', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "salah",
                password: "salah"
            });

        expect(result.status).toBe(401);
    });
});

describe('GET /api/users/self', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can get current user', async () => {
        const result = await supertest(web)
            .get('/api/users/self')
            .set('Token', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('test');
    });

    it('should reject if token is invalid', async () => {
        const result = await supertest(web)
            .get('/api/users/self')
            .set('Token', 'salah');

        expect(result.status).toBe(401);
    });
});

describe('PATCH /api/users/self', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can update user', async () => {
        const result = await supertest(web)
            .patch("/api/users/self")
            .set("Token", "test")
            .send({
                name: "testtt",
                password: "testtttt"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("testtt");

        const user = await getTestUser();
        expect(await bcrypt.compare("testtttt", user.password)).toBe(true);
    });

    it('should can update user name', async () => {
        const result = await supertest(web)
            .patch("/api/users/self")
            .set("Token", "test")
            .send({
                name: "testtttt"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("testtttt");
    });

    it('should can update user password', async () => {
        const result = await supertest(web)
            .patch("/api/users/self")
            .set("Token", "test")
            .send({
                password: "test"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");

        const user = await getTestUser();
        expect(await bcrypt.compare("test", user.password)).toBe(true);
    });

    it('should reject if request is not valid', async () => {
        const result = await supertest(web)
            .patch("/api/users/self")
            .set("Token", "salah")
            .send({});

        expect(result.status).toBe(401);
    });
});
