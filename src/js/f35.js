const F35Component = {

    init() {
        const scene = document.querySelector('a-scene');
        this.raycaster = new THREE.Raycaster()
        this.camera = document.getElementById('camera')
        this.threeCamera = this.camera.getObject3D('camera')
        this.ground = document.getElementById('ground')
        this.cursor = document.getElementById('cursor')
        this.rayOrigin = new THREE.Vector2(0, 0)
        this.cursorLocation = new THREE.Vector3(0, 0, 0)
        this.pointCameraContainer = document.getElementById('PointCameraContainer')
        this.pointCameraContainer.style.display = "block"

        if (scene.hasLoaded) {
            this.onLoadComplete()
        } else {
            scene.addEventListener('loaded', () => {
                this.onLoadComplete()
            })
        }
    },
    tick() {
        // Raycast from camera to 'ground'
        this.raycaster.setFromCamera(this.rayOrigin, this.threeCamera)
        const intersects = this.raycaster.intersectObject(this.ground.object3D, true)
        if (intersects.length > 0) {
            const [intersect] = intersects
            this.cursorLocation = intersect.point
        }
        this.el.object3D.position.y = 0.1
        this.el.object3D.position.lerp(this.cursorLocation, 0.4)
        this.el.object3D.rotation.y = this.threeCamera.rotation.y
    },
    onLoadComplete() {
        setTimeout(() => {
            this.pointCameraContainer.style.display = "none"

            this.cursor.setAttribute('src', '#reticle_lockheed')

            this.el.sceneEl.addEventListener('click', (event) => {
                const f35Spawned = document.getElementById('f35Spawned')
                if (f35Spawned != undefined) {
                    return
                }
                this.cursor.setAttribute('visible', false)
                
                const newElement = document.createElement('a-entity')
                newElement.setAttribute('id', 'f35Spawned')
                newElement.setAttribute('position', this.el.object3D.position)
                newElement.setAttribute('rotation', `${this.el.object3D.rotation.x} ${this.el.object3D.rotation.y + 50} ${this.el.object3D.rotation.z}`)
                newElement.setAttribute('scale', '0.48 0.48 0.48')
                newElement.setAttribute('gltf-model', '#f35')
                newElement.setAttribute('shadow', {
                    receive: false
                })
                newElement.setAttribute('visible', false)
                this.el.sceneEl.appendChild(newElement)
                newElement.addEventListener('model-loaded', () => {
                    newElement.setAttribute('animation-mixer', {
                        clip: 'Take 001',
                        loop: 'once',
                        crossFadeDuration: 0.4,
                        clampWhenFinished: true
                    })
                    newElement.setAttribute('visible', true)
                    newElement.setAttribute('sound', 'src: #f35Sound; autoplay: true; loop: false; positional: false')
                    newElement.components.sound.stopSound()
                    newElement.components.sound.playSound()
                })
    
                // Hotspots
                const hotspotIds = [
                    "#f35-electronic-warfare", 
                    "#f35-helmet-and-pilote-interface", 
                    "#f35-low-observable-stealth", 
                    "#f35-network-enabled-ops", 
                    "#f35-sensor-and-fusion", 
                    "#f35-speed-and-range", 
                    "#f35-weapon-capability", 
                ]

                for (let i = 0; i < hotspotIds.length; i++) {
                    const hotspotElement = document.createElement('a-entity');
                    hotspotElement.setAttribute('id', 'f35-hotspot-' + (i + 1))
                    hotspotElement.setAttribute('position', this.el.object3D.position)
                    hotspotElement.setAttribute('rotation', `${this.el.object3D.rotation.x} ${this.el.object3D.rotation.y + 50} ${this.el.object3D.rotation.z}`)
                    if (i == 0) {
                        hotspotElement.setAttribute('scale', '1.8 1.8 1.8')
                    } else if (i == 1) {
                        hotspotElement.setAttribute('scale', '2.4 2.4 2.4')
                    } else if (i == 2) {
                        hotspotElement.setAttribute('scale', '1.2 1.2 1.2')
                    } else if (i == 3) {
                        hotspotElement.setAttribute('scale', '2.19 2.19 2.19')
                    } else if (i == 4) {
                        hotspotElement.setAttribute('scale', '2.568 2.568 2.568')
                    } else if (i == 5) {
                        hotspotElement.setAttribute('scale', '1.8 1.8 1.8')
                    } else if (i == 6) {
                        hotspotElement.setAttribute('scale', '2.1 2.1 2.1')
                    }
                    hotspotElement.setAttribute('gltf-model', hotspotIds[i])
                    hotspotElement.setAttribute('class', 'cantap')
                    hotspotElement.setAttribute('tap-hotspot', '')
                    newElement.setAttribute('cursor', 'rayOrigin: mouse')
                    hotspotElement.setAttribute('shadow', {
                        receive: false
                    })
                    hotspotElement.setAttribute('visible', false)
                    this.el.sceneEl.appendChild(hotspotElement)
                    hotspotElement.addEventListener('model-loaded', () => {
                        hotspotElement.setAttribute('animation-mixer', {
                            clip: 'Take 001',
                            loop: 'once',
                            crossFadeDuration: 0.4,
                            clampWhenFinished: true
                        })
                        hotspotElement.setAttribute('visible', true)
                    })
                }

                const adsElement = document.createElement('a-entity');
                adsElement.setAttribute('id', 'f35-ads')
                adsElement.setAttribute('position', `${this.el.object3D.position.x} ${this.el.object3D.position.y} ${this.el.object3D.position.z}`)
                adsElement.setAttribute('rotation', `${this.el.object3D.rotation.x} ${this.el.object3D.rotation.y + 50} ${this.el.object3D.rotation.z}`)
                adsElement.setAttribute('scale', '0.48 0.48 0.48')
                adsElement.setAttribute('gltf-model', '#f35-advertisement')
                adsElement.setAttribute('shadow', {
                    receive: false
                })
                adsElement.setAttribute('visible', false)
                this.el.sceneEl.appendChild(adsElement)
                adsElement.addEventListener('model-loaded', () => {
                    adsElement.setAttribute('animation-mixer', {
                        clip: 'Take 001',
                        loop: 'once',
                        crossFadeDuration: 0.4,
                        clampWhenFinished: true
                    })
                    adsElement.setAttribute('visible', true)
                    adsElement.addEventListener('click', function() {
                        window.clickF35Advertisement(adsElement)
                    })
                })
            })
        }, 10000)
    }
}

export {
    F35Component
}
