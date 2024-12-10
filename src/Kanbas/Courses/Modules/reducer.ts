import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modules: [],
}
const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        setModules: (state, action) => {
            state.modules = action.payload;
        },      
        addModule: (state, { payload: module }) => {
            state.modules = [...state.modules, module] as any
        },
        deleteModule: (state, { payload: moduleId }) => {
            state.modules = state.modules.filter((module : any) => module._id !== moduleId)
        },
        editModule: (state, { payload: moduleId }) => {
            state.modules = state.modules.map((module : any) => module._id === moduleId ? { ...module, editing: true } : module) as any
        },
        updateModule: (state, { payload: module }) => {
            state.modules = state.modules.map((m : any) => m._id === module._id ? module : m) as any
        }
    }
})

export const { setModules, addModule, deleteModule, editModule, updateModule } = modulesSlice.actions
export default modulesSlice.reducer