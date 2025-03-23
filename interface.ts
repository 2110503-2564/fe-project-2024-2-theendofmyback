export interface Campground {
    _id: string;
    name: string;
    address: string;
    tel: string;
    price: number;
    capacity: number;
    description: string;
    image: string;
    promotions?: Promotion[];
  }
export interface Promotion {
    _id: string;
    name: string;
    campground: string;
    description: string;
    discount: number;
  }
  
  export interface UserProfile {
    name: string;
    email: string;
    tel: string;
    address: string;
    picture: string;
  }