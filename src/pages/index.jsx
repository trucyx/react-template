import React from 'react'
import ReactDOM from 'react-dom'
import Header from '../components/Header/'

import '../assets/css/base.css'

const ROOT_ID = 'main-page'

function createRootContainer() {
    const $root = document.createElement('div')
    $root.setAttribute('id', ROOT_ID)
    document.body.appendChild($root)

    return $root
}

function getRootContainer() {
    const $root = document.getElementById(ROOT_ID)

    return $root || createRootContainer()
}

const $main = getRootContainer()

ReactDOM.render(
    <Header />,
    $main
)
