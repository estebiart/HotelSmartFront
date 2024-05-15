
export interface Hotel {
    _id: string; 
    name: string;
    images: string[]; 
    place: string;
    address: string;
    description: string;
    rooms: Room[];

}


export interface Room {
    _id: string; 
    hotel: string; 
    roomType: string;
    price: number;
    capacity: number;
    availability: boolean;
}
