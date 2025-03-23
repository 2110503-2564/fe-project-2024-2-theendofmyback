import { Dayjs } from "dayjs";
import { ReactNode } from "react";

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

export interface CampgroundsJson {
    success: boolean;
    count: number;
    pagination?: {
        next?: {
            page: number;
            limit: number;
        };
    };
    data: Campground[];
}

export interface AccountCardProps {
    name: string;
    email: string;
}

export interface AlertCardProps {
    alertsentense: string;
}

export interface Booking {
    _id: string;
    user: string;
    campground: string;
    checkInDate: string;
    checkOutDate: string;
    bookingAt: string;
}

export interface DateReserveProps {
    value: Dayjs | null;
    onChange: (newValue: Dayjs | null) => void;
}

export interface Review {
    _id: string;
    title: string;
    text: string;
    rating: number;
    campground: string;
    user: string;
    createdAt: string;
}

export interface SeeYoursButtonProps {
    name: string;
}

export interface SwitchProps {
    checked: boolean;
    onChange: () => void;
}

export interface StyledWrapperProps {
    darkMode: boolean;
}

export interface InputProps {
    value: string;
    onChange: (value: string) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface SidebarItemProps {
    icon: ReactNode;
    text: string;
    active?: boolean;
    alert?: boolean;
    pageRef: string;
}

export interface SidebarProps {
    children: ReactNode;
}

export interface SidebarContextProps {
    expanded: boolean;
}

export interface BannerProps {
    campgrounds: CampgroundsJson | null;
}