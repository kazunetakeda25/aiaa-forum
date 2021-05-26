// Copyright (c) 2021 8th Wall, Inc.
//
// app.js is the main entry point for your 8th Wall app. Code here will execute after head.html
// is loaded, and before body.html is loaded.
import { F35Component } from './f35'
import { RocketTakeOffComponent } from './rocket-takeoff'
import { TapHotspotComponent } from './tap-hotspot'
import { TapCloseComponent } from './tap-close'

let tapAudio = new Audio("../resources/audios/click.wav")

window.hideAll = (e) => {
    // if (e.getAttribute('data-clicked') === null || e.getAttribute('data-clicked') === 'false') {
    //     e.setAttribute('data-clicked', 'true')
    // }
    // else {
    //     e.setAttribute('data-clicked', 'false')
    // }
    // if (e.getAttribute('data-clicked') === 'true') {
    //     const promise = tapAudio.play()
    //     if (promise !== undefined) {
    //         promise.then(_ => {
    //             // Autoplay started!
    //         }).catch(error => {
    //             // Autoplay was prevented.
    //             console.log(error)
    //         })
    //     }
    // }

    document.getElementById('container').classList.add('collapsed')
}

window.clickRocketAdvertisement = (e) => {
    if (e.getAttribute('data-clicked') === null || e.getAttribute('data-clicked') === 'false') {
        e.setAttribute('data-clicked', 'true')
    }
    else {
        e.setAttribute('data-clicked', 'false')
    }
    if (e.getAttribute('data-clicked') === 'true') {
        const promise = tapAudio.play()
        if (promise !== undefined) {
            promise.then(_ => {
                // Autoplay started!
            }).catch(error => {
                // Autoplay was prevented.
                console.log(error)
            })
        }
    }

    window.location = 'https://www.aiaa.org/propulsionenergy?utm_source=Xcursion&utm_medium=QRcode&utm_campaign=Propulsion2021'
}

window.clickF35Advertisement = (e) => {
    if (e.getAttribute('data-clicked') === null || e.getAttribute('data-clicked') === 'false') {
        e.setAttribute('data-clicked', 'true')
    }
    else {
        e.setAttribute('data-clicked', 'false')
    }
    if (e.getAttribute('data-clicked') === 'true') {
        const promise = tapAudio.play()
        if (promise !== undefined) {
            promise.then(_ => {
                // Autoplay started!
            }).catch(error => {
                // Autoplay was prevented.
                console.log(error)
            })
        }
    }

    window.location = 'https://www.aiaa.org/aviation/program/why-attend?utm_source=Xcursion&utm_medium=QRcode&utm_campaign=Aviation2021'
}

// Register custom A-Frame components in app.js before the scene in body.html has loaded.
AFRAME.registerComponent('f35', F35Component)
AFRAME.registerComponent('rockettakeoff', RocketTakeOffComponent)
AFRAME.registerComponent('tap-hotspot', TapHotspotComponent)
AFRAME.registerComponent('tap-close', TapCloseComponent)
