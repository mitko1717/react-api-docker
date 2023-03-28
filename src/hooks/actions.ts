import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { dataActions } from "../store/data/data.slice";

const actions = {
  ...dataActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
