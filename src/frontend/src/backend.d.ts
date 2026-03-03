import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Inquiry {
    packageName: string;
    numTravelers: bigint;
    name: string;
    email: string;
    message: string;
    travelDate: string;
}
export interface backendInterface {
    getAllInquiries(): Promise<Array<Inquiry>>;
    getSubscriberCount(): Promise<bigint>;
    searchDestination(term: string): Promise<bigint>;
    submitInquiry(name: string, email: string, packageName: string, travelDate: string, numTravelers: bigint, message: string): Promise<void>;
    subscribe(email: string): Promise<void>;
}
