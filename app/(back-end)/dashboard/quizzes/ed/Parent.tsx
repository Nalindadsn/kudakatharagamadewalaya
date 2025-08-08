"use client"
import React from 'react'
import Child from './Child'

function Parent() {
    const [childMsg, setChildMsg] = React.useState(null)
  return (
    <div>
        <Child fromChild={setChildMsg} />
        <div>{childMsg}</div>

    </div>
  )
}

export default Parent