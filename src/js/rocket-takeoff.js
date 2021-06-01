const RocketTakeOffComponent = {

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
            
            this.cursor.setAttribute('src', '#reticle_aiaa')

            this.el.sceneEl.addEventListener('click', (event) => {
                const rocketSpawned = document.getElementById('rocketSpawned')
                if (rocketSpawned != undefined) {
                    return
                }
                this.cursor.setAttribute('visible', false)

                const newElement = document.createElement('a-entity')
                newElement.setAttribute('id', 'rocketSpawned')
                newElement.setAttribute('position', this.el.object3D.position)
                newElement.setAttribute('rotation', `${this.el.object3D.rotation.x} ${this.el.object3D.rotation.y} ${this.el.object3D.rotation.z}`)
                newElement.setAttribute('scale', '3 3 3')
                newElement.setAttribute('gltf-model', '#rocketTakeOff')
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
                    newElement.setAttribute('sound', 'src: #rocketTakeOffSound; autoplay: false; loop: false; positional: false')
                    newElement.components.sound.stopSound()
                    newElement.components.sound.playSound()
                })

                const adsElement = document.createElement('a-entity');
                adsElement.setAttribute('id', 'rocket-takeoff-ads')
                adsElement.setAttribute('position', this.el.object3D.position)
                adsElement.setAttribute('rotation', `${this.el.object3D.rotation.x} ${this.el.object3D.rotation.y} ${this.el.object3D.rotation.z}`)
                adsElement.setAttribute('scale', '1 1 1')
                adsElement.setAttribute('gltf-model', '#rocket-takeoff-advertisement')
                adsElement.setAttribute('class', 'cantap')
                adsElement.setAttribute('cursor', 'rayOrigin: mouse')
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
                        window.clickRocketAdvertisement(adsElement)
                    })
                })
            })
        }, 10000)
    }
}

export {
    RocketTakeOffComponent
}
