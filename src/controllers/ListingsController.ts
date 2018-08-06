import { Context } from "koa";
import { listingModel } from "../models/ListingModel";

export default class ListingController {
    public static async get(context: Context) {
        const {
            min_price, max_price,
            min_bed, max_bed,
            min_bath, max_bath
        } = context.query;

        const query: IListingsQuery = {
            bathrooms: { $gte: min_bath || 0 },
            bedrooms: { $gte: min_bed || 0 },
            price: { $gte: min_price || 0 },
        };

        if (max_price) {
            query.price.$lte = max_price;
        }
        if (max_bed) {
            query.bedrooms.$lte = max_bed;
        }
        if (max_bath) {
            query.bathrooms.$lte = max_bath;
        }

        const listings = await listingModel.find(query);
        const features: IGeoJsonFeature[] = listings.map(listing => ({
            geometry: {
                coordinates: [listing.latitude, listing.longitude],
                type: "Point",
            },
            properties: {
                bathrooms: listing.bathrooms,
                bedrooms: listing.bedrooms,
                id: listing.id,
                price: listing.price,
                sq_ft: listing.squareFoot,
                street: listing.street,
            },
            type: "Feature",
        }));

        const response: IResponse = {
            features,
            type: "FeatureCollection",
        }

        context.body = response;
    }
}

interface IListingsQuery {
    price?: IOperator
    bedrooms?: IOperator
    bathrooms?: IOperator
}

interface IOperator {
    $gte?: object
    $lte?: object
}

interface IResponse {
    type: string
    features: IGeoJsonFeature[]
}

interface IGeoJsonFeature {
    type: string,
    geometry: IGeoJsonPoint
    properties: IGeoJsonListing
}

interface IGeoJsonListing {
    id: string
    price: number
    street: string
    bedrooms: number
    bathrooms: number
    sq_ft: number
}

interface IGeoJsonPoint {
    type: string
    coordinates: number[]
}