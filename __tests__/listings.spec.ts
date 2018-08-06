// tslint:disable:no-implicit-dependencies
import geojsonhint from "@mapbox/geojsonhint";
import supertest from "supertest";

describe("listings endpoint", () => {
    const request = supertest(process.env.TARGET);

    it("should be valid geojson", done => {
        request
            .get('/listings')
            .expect(response => {
                const errors = geojsonhint.hint(response.body);
                expect(errors).toHaveLength(0);
            })
            .expect(200, done);
    });

    describe("price filters", () => {

        it("should filter by min_price", done => {
            request
                .get('/listings?min_price=299000')
                .expect(response => {
                    expect(response.body.features).toHaveLength(43);
                })
                .expect(200, done);
        });

        it("should filter by max_price", done => {
            request
                .get('/listings?max_price=101000')
                .expect(response => {
                    expect(response.body.features).toHaveLength(62);
                })
                .expect(200, done);
        });

        it("should filter by both max_price and min_price", done => {
            request
                .get('/listings?max_price=101000&min_price=100900')
                .expect(response => {
                    expect(response.body.features).toHaveLength(2);
                })
                .expect(200, done);
        });

    });

    describe("bedrooms filters", () => {

        it("should filter by min_bed", done => {
            request
                .get('/listings?min_bed=5')
                .expect(response => {
                    expect(response.body.features).toHaveLength(2468);
                })
                .expect(200, done);
        });

        it("should filter by max_bed", done => {
            request
                .get('/listings?max_bed=1')
                .expect(response => {
                    expect(response.body.features).toHaveLength(0);
                })
                .expect(200, done);
        });

        it("should filter by both max_bed and min_bed", done => {
            request
                .get('/listings?max_bed=4&min_bed=3')
                .expect(response => {
                    expect(response.body.features).toHaveLength(5063);
                })
                .expect(200, done);
        });

    });

    describe("bathrooms filter", () => {

        it("should filter by min_bath", done => {
            request
                .get('/listings?min_bath=3')
                .expect(response => {
                    expect(response.body.features).toHaveLength(3340);
                })
                .expect(200, done);
        });

        it("should filter by max_bath", done => {
            request
                .get('/listings?max_bath=1')
                .expect(response => {
                    expect(response.body.features).toHaveLength(3343);
                })
                .expect(200, done);
        });

    });
});