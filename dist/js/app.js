(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _f = require("./f35");

var _rocketTakeoff = require("./rocket-takeoff");

var _tapHotspot = require("./tap-hotspot");

var _tapClose = require("./tap-close");

// Copyright (c) 2021 8th Wall, Inc.
//
// app.js is the main entry point for your 8th Wall app. Code here will execute after head.html
// is loaded, and before body.html is loaded.
let tapAudio = new Audio("../resources/audios/click.wav");

window.hideAll = e => {
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
  document.getElementById('container').classList.add('collapsed');
};

window.clickRocketAdvertisement = e => {
  if (e.getAttribute('data-clicked') === null || e.getAttribute('data-clicked') === 'false') {
    e.setAttribute('data-clicked', 'true');
  } else {
    e.setAttribute('data-clicked', 'false');
  }

  if (e.getAttribute('data-clicked') === 'true') {
    const promise = tapAudio.play();

    if (promise !== undefined) {
      promise.then(_ => {// Autoplay started!
      }).catch(error => {
        // Autoplay was prevented.
        console.log(error);
      });
    }
  }

  window.location = 'https://www.aiaa.org/propulsionenergy?utm_source=Xcursion&utm_medium=QRcode&utm_campaign=Propulsion2021';
};

window.clickF35Advertisement = e => {
  if (e.getAttribute('data-clicked') === null || e.getAttribute('data-clicked') === 'false') {
    e.setAttribute('data-clicked', 'true');
  } else {
    e.setAttribute('data-clicked', 'false');
  }

  if (e.getAttribute('data-clicked') === 'true') {
    const promise = tapAudio.play();

    if (promise !== undefined) {
      promise.then(_ => {// Autoplay started!
      }).catch(error => {
        // Autoplay was prevented.
        console.log(error);
      });
    }
  }

  window.location = 'https://www.aiaa.org/aviation/program/why-attend?utm_source=Xcursion&utm_medium=QRcode&utm_campaign=Aviation2021';
}; // Register custom A-Frame components in app.js before the scene in body.html has loaded.


AFRAME.registerComponent('f35', _f.F35Component);
AFRAME.registerComponent('rockettakeoff', _rocketTakeoff.RocketTakeOffComponent);
AFRAME.registerComponent('tap-hotspot', _tapHotspot.TapHotspotComponent);
AFRAME.registerComponent('tap-close', _tapClose.TapCloseComponent);

},{"./f35":2,"./rocket-takeoff":3,"./tap-close":4,"./tap-hotspot":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.F35Component = void 0;
const F35Component = {
  init() {
    const scene = document.querySelector('a-scene');
    this.raycaster = new THREE.Raycaster();
    this.camera = document.getElementById('camera');
    this.threeCamera = this.camera.getObject3D('camera');
    this.ground = document.getElementById('ground');
    this.cursor = document.getElementById('cursor');
    this.rayOrigin = new THREE.Vector2(0, 0);
    this.cursorLocation = new THREE.Vector3(0, 0, 0);
    this.pointCameraContainer = document.getElementById('PointCameraContainer');
    this.pointCameraContainer.style.display = "block";

    if (scene.hasLoaded) {
      this.onLoadComplete();
    } else {
      scene.addEventListener('loaded', () => {
        this.onLoadComplete();
      });
    }
  },

  tick() {
    // Raycast from camera to 'ground'
    this.raycaster.setFromCamera(this.rayOrigin, this.threeCamera);
    const intersects = this.raycaster.intersectObject(this.ground.object3D, true);

    if (intersects.length > 0) {
      const [intersect] = intersects;
      this.cursorLocation = intersect.point;
    }

    this.el.object3D.position.y = 0.1;
    this.el.object3D.position.lerp(this.cursorLocation, 0.4);
    this.el.object3D.rotation.y = this.threeCamera.rotation.y;
  },

  onLoadComplete() {
    setTimeout(() => {
      this.pointCameraContainer.style.display = "none";
      this.cursor.setAttribute('src', '#reticle_lockheed');
      this.el.sceneEl.addEventListener('click', event => {
        const f35Spawned = document.getElementById('f35Spawned');

        if (f35Spawned != undefined) {
          return;
        }

        this.cursor.setAttribute('visible', false);
        const newElement = document.createElement('a-entity');
        newElement.setAttribute('id', 'f35Spawned');
        newElement.setAttribute('position', this.el.object3D.position);
        newElement.setAttribute('rotation', `${this.el.object3D.rotation.x} ${this.el.object3D.rotation.y + 50} ${this.el.object3D.rotation.z}`);
        newElement.setAttribute('scale', '0.48 0.48 0.48');
        newElement.setAttribute('gltf-model', '#f35');
        newElement.setAttribute('shadow', {
          receive: false
        });
        newElement.setAttribute('visible', false);
        this.el.sceneEl.appendChild(newElement);
        newElement.addEventListener('model-loaded', () => {
          newElement.setAttribute('animation-mixer', {
            clip: 'Take 001',
            loop: 'once',
            crossFadeDuration: 0.4,
            clampWhenFinished: true
          });
          newElement.setAttribute('visible', true);
          newElement.setAttribute('sound', 'src: #f35Sound; autoplay: true; loop: false; positional: false');
          newElement.components.sound.stopSound();
          newElement.components.sound.playSound();
        }); // Hotspots

        const hotspotIds = ["#f35-electronic-warfare", "#f35-helmet-and-pilote-interface", "#f35-low-observable-stealth", "#f35-network-enabled-ops", "#f35-sensor-and-fusion", "#f35-speed-and-range", "#f35-weapon-capability"];

        for (let i = 0; i < hotspotIds.length; i++) {
          const hotspotElement = document.createElement('a-entity');
          hotspotElement.setAttribute('id', 'f35-hotspot-' + (i + 1));
          hotspotElement.setAttribute('position', this.el.object3D.position);
          hotspotElement.setAttribute('rotation', `${this.el.object3D.rotation.x} ${this.el.object3D.rotation.y + 50} ${this.el.object3D.rotation.z}`);

          if (i == 0) {
            hotspotElement.setAttribute('scale', '1.8 1.8 1.8');
          } else if (i == 1) {
            hotspotElement.setAttribute('scale', '2.4 2.4 2.4');
          } else if (i == 2) {
            hotspotElement.setAttribute('scale', '1.2 1.2 1.2');
          } else if (i == 3) {
            hotspotElement.setAttribute('scale', '2.19 2.19 2.19');
          } else if (i == 4) {
            hotspotElement.setAttribute('scale', '2.568 2.568 2.568');
          } else if (i == 5) {
            hotspotElement.setAttribute('scale', '1.8 1.8 1.8');
          } else if (i == 6) {
            hotspotElement.setAttribute('scale', '2.1 2.1 2.1');
          }

          hotspotElement.setAttribute('gltf-model', hotspotIds[i]);
          hotspotElement.setAttribute('class', 'cantap');
          hotspotElement.setAttribute('tap-hotspot', '');
          newElement.setAttribute('cursor', 'rayOrigin: mouse');
          hotspotElement.setAttribute('shadow', {
            receive: false
          });
          hotspotElement.setAttribute('visible', false);
          this.el.sceneEl.appendChild(hotspotElement);
          hotspotElement.addEventListener('model-loaded', () => {
            hotspotElement.setAttribute('animation-mixer', {
              clip: 'Take 001',
              loop: 'once',
              crossFadeDuration: 0.4,
              clampWhenFinished: true
            });
            hotspotElement.setAttribute('visible', true);
          });
        }

        const adsElement = document.createElement('a-entity');
        adsElement.setAttribute('id', 'f35-ads');
        adsElement.setAttribute('position', `${this.el.object3D.position.x} ${this.el.object3D.position.y} ${this.el.object3D.position.z}`);
        adsElement.setAttribute('rotation', `${this.el.object3D.rotation.x} ${this.el.object3D.rotation.y + 50} ${this.el.object3D.rotation.z}`);
        adsElement.setAttribute('scale', '0.48 0.48 0.48');
        adsElement.setAttribute('gltf-model', '#f35-advertisement');
        adsElement.setAttribute('shadow', {
          receive: false
        });
        adsElement.setAttribute('visible', false);
        this.el.sceneEl.appendChild(adsElement);
        adsElement.addEventListener('model-loaded', () => {
          adsElement.setAttribute('animation-mixer', {
            clip: 'Take 001',
            loop: 'once',
            crossFadeDuration: 0.4,
            clampWhenFinished: true
          });
          adsElement.setAttribute('visible', true);
          adsElement.addEventListener('click', function () {
            window.clickF35Advertisement(adsElement);
          });
        });
      });
    }, 10000);
  }

};
exports.F35Component = F35Component;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RocketTakeOffComponent = void 0;
const RocketTakeOffComponent = {
  init() {
    const scene = document.querySelector('a-scene');
    this.raycaster = new THREE.Raycaster();
    this.camera = document.getElementById('camera');
    this.threeCamera = this.camera.getObject3D('camera');
    this.ground = document.getElementById('ground');
    this.cursor = document.getElementById('cursor');
    this.rayOrigin = new THREE.Vector2(0, 0);
    this.cursorLocation = new THREE.Vector3(0, 0, 0);
    this.pointCameraContainer = document.getElementById('PointCameraContainer');
    this.pointCameraContainer.style.display = "block";

    if (scene.hasLoaded) {
      this.onLoadComplete();
    } else {
      scene.addEventListener('loaded', () => {
        this.onLoadComplete();
      });
    }
  },

  tick() {
    // Raycast from camera to 'ground'
    this.raycaster.setFromCamera(this.rayOrigin, this.threeCamera);
    const intersects = this.raycaster.intersectObject(this.ground.object3D, true);

    if (intersects.length > 0) {
      const [intersect] = intersects;
      this.cursorLocation = intersect.point;
    }

    this.el.object3D.position.y = 0.1;
    this.el.object3D.position.lerp(this.cursorLocation, 0.4);
    this.el.object3D.rotation.y = this.threeCamera.rotation.y;
  },

  onLoadComplete() {
    setTimeout(() => {
      this.pointCameraContainer.style.display = "none";
      this.cursor.setAttribute('src', '#reticle_aiaa');
      this.el.sceneEl.addEventListener('click', event => {
        const rocketSpawned = document.getElementById('rocketSpawned');

        if (rocketSpawned != undefined) {
          return;
        }

        this.cursor.setAttribute('visible', false);
        const newElement = document.createElement('a-entity');
        newElement.setAttribute('id', 'rocketSpawned');
        newElement.setAttribute('position', this.el.object3D.position);
        newElement.setAttribute('rotation', `${this.el.object3D.rotation.x} ${this.el.object3D.rotation.y} ${this.el.object3D.rotation.z}`);
        newElement.setAttribute('scale', '3 3 3');
        newElement.setAttribute('gltf-model', '#rocketTakeOff');
        newElement.setAttribute('shadow', {
          receive: false
        });
        newElement.setAttribute('visible', false);
        this.el.sceneEl.appendChild(newElement);
        newElement.addEventListener('model-loaded', () => {
          newElement.setAttribute('animation-mixer', {
            clip: 'Take 001',
            loop: 'once',
            crossFadeDuration: 0.4,
            clampWhenFinished: true
          });
          newElement.setAttribute('visible', true);
          newElement.setAttribute('sound', 'src: #rocketTakeOffSound; autoplay: false; loop: false; positional: false');
          newElement.components.sound.stopSound();
          newElement.components.sound.playSound();
        });
        const adsElement = document.createElement('a-entity');
        adsElement.setAttribute('id', 'rocket-takeoff-ads');
        adsElement.setAttribute('position', this.el.object3D.position);
        adsElement.setAttribute('rotation', `${this.el.object3D.rotation.x} ${this.el.object3D.rotation.y} ${this.el.object3D.rotation.z}`);
        adsElement.setAttribute('scale', '1 1 1');
        adsElement.setAttribute('gltf-model', '#rocket-takeoff-advertisement');
        adsElement.setAttribute('class', 'cantap');
        adsElement.setAttribute('cursor', 'rayOrigin: mouse');
        adsElement.setAttribute('shadow', {
          receive: false
        });
        adsElement.setAttribute('visible', false);
        this.el.sceneEl.appendChild(adsElement);
        adsElement.addEventListener('model-loaded', () => {
          adsElement.setAttribute('animation-mixer', {
            clip: 'Take 001',
            loop: 'once',
            crossFadeDuration: 0.4,
            clampWhenFinished: true
          });
          adsElement.setAttribute('visible', true);
          adsElement.addEventListener('click', function () {
            window.clickRocketAdvertisement(adsElement);
          });
        });
      });
    }, 10000);
  }

};
exports.RocketTakeOffComponent = RocketTakeOffComponent;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TapCloseComponent = void 0;
const TapCloseComponent = {
  init() {
    const handleClickEvent = e => {
      hideAll(e);
    };

    this.el.addEventListener('click', handleClickEvent, true);
  }

};
exports.TapCloseComponent = TapCloseComponent;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TapHotspotComponent = void 0;
const TapHotspotComponent = {
  init() {
    const id = this.el.getAttribute('id');
    const index = parseInt(id.replace('f35-hotspot-', ''), 10);
    const contents = document.getElementById('contents');
    const container = document.getElementById('container');
    const hotspotContents = ["<h3>ELECTRONIC WARFARE</h3><br><br><p>Advanced electronic warfare capabilities locate and track enemy forces, jam radars, and disrupt attacks.</p><br></br>", "<h3>HELMET & PILOT INTERFACE</h3><br><p style='font-size: 18px'>The F&#8209;35 Helmet is one of the most advanced pieces of technology on the planet. The information a pilot needs to complete any mission: air-speed, heading, altitude, targeting information and warnings &mdash; is projected on the helmet's visor, rather than on a traditional Heads-up Display. This approach greatly reduces the pilot's workload and increases responsiveness.</p><br></br>", "<h3>LOW OBSERVABLE STEALTH</h3><br><p style='font-size: 18px'>The F&#8209;35's aligned edges, reduced engine signature, internal carriage of weapons and fuel and embedded sensors all contribute to its unique stealth performance.</p><p style='font-size: 18px'>With stealth designed in from day one, the F&#8209;35 has an unmatched ability to evade enemy detection and enter contested airspace.</p><br></br>", "<h3>NETWORK<br>ENABLED OPS</h3><br><p>The F&#8209;35 serves as an information and communications gateway, sharing its operational picture with the ground, sea and air assets.</p><br></br>", "<h3>SENSOR SUITE<br>AND FUSION</h3><br><p style='font-size: 18px'>The F&#8209;35 has the most advanced sensor suite of any fighter in history, including the Active Electronically Scanned Array (AESA) radar, Distributed Aperture System (DAS), Electro Optical Targeting System (EOTS), and advanced electronic warfare capabilities to locate/track enemy forces, jam radars and disrupt attacks.</p><br></br>", "<h3>F&#8209;35 SPEED<br>AND RANGE</h3><br><p style='font-size: 18px'>The Pratt & Whitney F135 is the most powerful fighter engine in the world.</p><p style='font-size: 18px'>With a top speed of Mach 1.6 (~1,200 mph), the F&#8209;35 is a long range, supersonic fighter, even with a full complement of internal weapons and fuel.</p><br></br>", "<h3>F&#8209;35 WEAPONS CAPABILITY</h3><br><br><p>25 mm GAU-22/A cannon</p><p>Two AIM-120C/D air-to-air missiles</p><p>Two 2,000-pound GBU-31 JDAM guided bombs</p><br></br>"];
    let tapAudio = new Audio("../resources/audios/click.wav");
    const self = this.el;
    this.el.addEventListener('click', function () {
      if (self.getAttribute('data-clicked') === null || self.getAttribute('data-clicked') === 'false') {
        self.setAttribute('data-clicked', 'true');
      } else {
        self.setAttribute('data-clicked', 'false');
      }

      hideAll(self);
      tapAudio.muted = true;

      if (index > 0) {
        container.classList.remove('collapsed');
        contents.innerHTML = hotspotContents[index - 1];

        if (tapAudio.paused) {
          if (self.getAttribute('data-clicked') === 'true') {
            const promise = tapAudio.play();
            tapAudio.muted = false;

            if (promise !== undefined) {
              promise.then(_ => {// Autoplay started!
              }).catch(error => {
                // Autoplay was prevented.
                console.log(error);
              });
            }
          }
        }
      }
    }, true);
  }

};
exports.TapHotspotComponent = TapHotspotComponent;

},{}]},{},[1]);
