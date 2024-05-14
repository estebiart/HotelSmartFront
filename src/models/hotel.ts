// Hotel interface
export interface Hotel {
    _id: string; // MongoDB id
    name: string;
    images: string[]; // Array of image URLs
    place: string;
    address: string;
    description: string;
    rooms: Room[]; // Array of Room objects
}

// Room interface
export interface Room {
    _id: string; // MongoDB id
    hotel: string; // Reference to Hotel object id
    roomType: string;
    price: number;
    capacity: number;
    availability: boolean;
}
