import React from 'react'
import css from "./Loading.module.css"
export default function Loading() {
  return (
    <div class={css.loading}>
        <div className={css.rotor}><div></div></div>
    </div>
  )
}
