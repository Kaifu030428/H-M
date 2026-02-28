import {configureStore} from '@reduxjs/toolkit'

import errorReducer from '../features/ErrorSlice'

export  const store = configureStore({
 reducer:{
 error:errorReducer,
 }
})