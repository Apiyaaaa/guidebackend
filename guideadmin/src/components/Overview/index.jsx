import React from 'react'
import { useEffect } from "react";

export default function Overview() {
  useEffect(()=>{
    if(!sessionStorage.getItem("loggedin")){
      window.location = '/login'
    }
    },[])
  return (
    <h1>欢迎使用留导航后台</h1>
  )
}
