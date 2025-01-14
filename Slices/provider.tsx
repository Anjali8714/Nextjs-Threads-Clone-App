"use client"

import { Provider } from "react-redux"
import React from "react"
import { store } from "@/Store/store"

const Providers:React.FC<{children:React.ReactNode}>=({children})=>{
    return <Provider store = {store}>{children}</Provider>
}

export default Providers