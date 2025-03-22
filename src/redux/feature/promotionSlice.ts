import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PromotionItem = {
    _id: string;
    name: string;
    description: string;
    discount: number;
    campground: string;
};

type PromotionState = {
    promotionItems: PromotionItem[];
};

const initialState: PromotionState = { promotionItems: [] };

export const promotionSlice = createSlice({
    name: "promotionSlice",
    initialState,
    reducers: {
        addPromotion(state, action: PayloadAction<PromotionItem>) {
            // Remove any existing promotion with the same ID before adding
            state.promotionItems = state.promotionItems.filter(
                (promo) => promo._id !== action.payload._id
            );
            state.promotionItems.push(action.payload);
        },

        removePromotion(state, action: PayloadAction<string>) {
            // Remove by _id
            state.promotionItems = state.promotionItems.filter(
                (promo) => promo._id !== action.payload
            );
        },
    },
});

export const { addPromotion, removePromotion } = promotionSlice.actions;
export default promotionSlice.reducer;
