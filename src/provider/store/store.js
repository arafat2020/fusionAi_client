import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../features/userClice";
import { notifyReducer } from "../features/notifySlice";
import { termReducer } from "../features/termslice";
import { myartReducer } from "../features/myartSlice";
import { modelReducer } from "../features/modelSlice";
import { feedReducer } from "../features/feedslice";
import { myFovriteReducer } from "../features/myfovarite";
import { gruoReducer } from "../features/groupslice";
import { myGroupReducer } from "../features/myGroup";

export default configureStore({
  reducer: {
    user: userReducer,
    notify: notifyReducer,
    term: termReducer,
    myart: myartReducer,
    model: modelReducer,
    feed: feedReducer,
    myfovarite: myFovriteReducer,
    group: gruoReducer,
    myGroup:myGroupReducer
  },
});
