import { createSlice } from "@reduxjs/toolkit";
import tuits from '../tuits/tuits.json';
import {findTuitsThunk, deleteTuitThunk,createTuitThunk, updateTuitThunk} from "../../services/tuits-thunks";

const initialState = {
    tuits: [],
    loading: false
}

const currentUser = {
    "userName": "NASA",
    "handle": "@nasa",
    "image": "../../images/nasa.jpg",
};


const templateTuit = {
    ...currentUser,
    "topic": "Space",
    "time": "2h",
    "liked": false,
    "dislike": 0,
    "retuits": 0,
    "likes": 0,
}



const tuitsSlice = createSlice({
    name: 'tuits',
    initialState,
    extraReducers: {
        [findTuitsThunk.pending]:
            (state) => {
                state.loading = true
                state.tuits = []
            },
        [findTuitsThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                state.tuits = payload
            },
        [findTuitsThunk.rejected]:
            (state, action) => {
                state.loading = false
                state.error = action.error
            },
        [deleteTuitThunk.fulfilled] :
            (state, { payload }) => {
                state.loading = false
                state.tuits = state.tuits.filter(t => t._id !== payload)
            },
        [createTuitThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                state.tuits.push(payload)
            },
        [updateTuitThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false;
                state.tuits = state.tuits.map(tuit => {
                  if (tuit._id === payload._id) {
                    return {
                      ...tuit,
                      ...payload
                    }
                  }
                  return tuit;
                });

            }
    },
    reducers: { }
});

export default tuitsSlice.reducer