const request = require("supertest");
const app = require("../app");
const {sequelize} = require("../models");
const {queryInterface} = sequelize;

beforeAll((done) => {
    
    queryInterface.bulkInsert("Games", 
        [
            {
                title: "AAA",
                year: 2021,
                categories: "AAA",
                platforms: "AAA",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: "BBB",
                year: 2019,
                categories: "BBB",
                platforms: "BBB",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: "CCC",
                year: 2020,
                categories: "CCC",
                platforms: "CCC",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ],
        {}
    )
    .then(() => {
        done();
    })
    .catch(err => {
        console.log(err);
        done(err);
    })
})

afterAll((done) => {
    
    queryInterface.bulkDelete("Games", null, {})
        .then(() => {
            done();
        })
        .catch(err => {
            console.log(err);
            done(err);
        })
})

describe("Test find all games", () => {
    
    it("find all expenses", (done) => {
        request(app)
            .get("/api/games")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then((response) => {
                let {body, status} = response;
                
                expect(status).toBe(200);
                expect(body.data.length).toEqual(3);
                done();
            })
            .catch(err => {
                console.log(err);
                done(err)
            })
    })
})