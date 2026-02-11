import {configureStore} from '@reduxjs/toolkit'

import errorReducer from '../feautes/ErrorSlice'


export  const store = configureStore({
 reducer:{
 error:errorReducer,
 }
})