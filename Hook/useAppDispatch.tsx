
import { RootState } from "@/Store/store";
import { TypedUseSelectorHook, useSelector ,useDispatch } from "react-redux";
import { AppDispatch } from "@/Store/store";


export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch :() => AppDispatch = useDispatch;
