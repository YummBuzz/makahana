import React from 'react'

export default function Scrollbutton() {
  return (
    <>
    {/* <!--up-button--> */}
   <div className="up-button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <i className="ph-bold ph-caret-up"></i>
      </div>
    </>
  )
}
