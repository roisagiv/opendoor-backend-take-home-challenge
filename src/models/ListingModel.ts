import { Document, model, Schema } from "mongoose";

/*
        CSV contains
        id,street,status,price,bedrooms,bathrooms,sq_ft,lat,lng
*/

export interface IListing {
    id: string
    street: string
    status: string
    price: number
    bedrooms: number,
    bathrooms: number
    squareFoot: number
    latitude: number,
    longitude: number
}

const listingSchema = new Schema({
    bathrooms: { type: Number },
    bedrooms: { type: Number },
    id: { type: String, required: true },
    lat: { type: Number, alias: "latitude" },
    lng: { type: Number, alias: "longitude" },
    price: { type: Number },
    squareFoot: { type: Number },
    status: { type: String },
    street: { type: String },
});

export const listingModel = model<IListing & Document>('listing-details', listingSchema);