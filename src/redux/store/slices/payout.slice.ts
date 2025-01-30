import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPayouts, processPayouts } from "../../../services/payouts.services";

interface PayoutState {
    payouts: any[];
    loading: boolean;
    error: string | null;
    successMessage: string | null;
}

const initialState: PayoutState = {
    payouts: [],
    loading: false,
    error: null,
    successMessage: null,
};

// Async thunk to fetch payouts
export const loadUserPayouts = createAsyncThunk("payouts/getUserPayouts", async () => {
    try {
        const data = await fetchPayouts();
        return data;
    } catch (error: any) {
        console.error("Error fetching User Payouts in frontend services:", error);
        throw error;
    }
});

// Async thunk to process payouts
export const processPayout = createAsyncThunk(
    "payouts/processPayout",
    async (amount: number, { rejectWithValue }) => {
        try {
            const data = await processPayouts(amount);
            return data; // Return processed payout data
        } catch (error: any) {
            console.error("Error processing payout:", error);
            return rejectWithValue(error.message || "Failed to process payout");
        }
    }
);

const payoutSlice = createSlice({
    name: "payout",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Handle loading, success, and error states for loading payouts
        builder
            .addCase(loadUserPayouts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadUserPayouts.fulfilled, (state, action) => {
                state.loading = false;
                state.payouts = action.payload;
            })
            .addCase(loadUserPayouts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Handle loading, success, and error states for processing payouts
        builder
            .addCase(processPayout.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(processPayout.fulfilled, (state) => {
                state.loading = false;
                state.successMessage = "Payout processed successfully!";
                // Optionally, you can refresh the payout data here if needed
            })
            .addCase(processPayout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default payoutSlice.reducer;
