"use client"
import React from 'react'

function Child(props:any) {

    const msg="hello CHILD"
    props.fromChild(msg)
  return (
    <div>
        {/* {props.toChild}<br/> */}
        {}1
    </div>
  )
}

export default Child