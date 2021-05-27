const TapHotspotComponent = {
    init() {
        const id = this.el.getAttribute('id')
        const index = parseInt(id.replace('f35-hotspot-', ''), 10);
        const contents = document.getElementById('contents')
        const container = document.getElementById('container')
        const hotspotContents = [
            "<h3>ELECTRONIC WARFARE</h3><br><br><p>Advanced electronic warfare capabilities locate and track enemy forces, jam radars, and disrupt attacks.</p><br></br>", 
            "<h3>HELMET & PILOT INTERFACE</h3><br><p style='font-size: 18px'>The F-35 Helmet is one of the most advanced pieces of technology on the planet. The information a pilot needs to complete any mission: air-speed, heading, altitude, targeting information and warnings &mdash; is projected on the helmet's visor, rather than on a traditional Heads-up Display. This approach greatly reduces the pilot's workload and increases responsiveness.</p><br></br>", 
            "<h3>LOW OBSERVABLE STEALTH</h3><br><p style='font-size: 18px'>The F-35's aligned edges, reduced engine signature, internal carriage of weapons and fuel and embedded sensors all contribute to its unique stealth performance.</p><p style='font-size: 18px'>With stealth designed in from day one, the F-35 has an unmatched ability to evade enemy detection and enter contested airspace.</p><br></br>", 
            "<h3>NETWORK<br>ENABLED OPS</h3><br><p>The F-35 serves as an information and communications gateway, sharing its operational picture with the ground, sea and air assets.</p><br></br>", 
            "<h3>SENSOR SUITE<br>AND FUSION</h3><br><p style='font-size: 18px'>The F-35 has the most advanced sensor suite of any fighter in history, including the Active Electronically Scanned Array (AESA) radar, Distributed Aperture System (DAS), Electro Optical Targeting System (EOTS), and advanced electronic warfare capabilities to locate/track enemy forces, jam radars and disrupt attacks.</p><br></br>", 
            "<h3>F-35 SPEED<br>AND RANGE</h3><br><p style='font-size: 18px'>The Pratt & Whitney F135 is the most powerful fighter engine in the world.</p><p style='font-size: 18px'>With a top speed of Mach 1.6 (~1,200 mph), the F-35 is a long range, supersonic fighter, even with a full complement of internal weapons and fuel.</p><br></br>", 
            "<h3>F-35 WEAPONS CAPABILITY</h3><br><br><p>25 mm GAU-22/A cannon</p><p>Two AIM-120C/D air-to-air missiles</p><p>Two 2,000-pound GBU-31 JDAM guided bombs</p><br></br>", 
        ]
        let tapAudio = new Audio("../resources/audios/click.wav")
        const self = this.el

        this.el.addEventListener('click', function () {
            if (self.getAttribute('data-clicked') === null || self.getAttribute('data-clicked') === 'false') {
                self.setAttribute('data-clicked', 'true')
            }
            else {
                self.setAttribute('data-clicked', 'false')
            }
            hideAll(self)
            tapAudio.muted = true
            if (index > 0) {
                container.classList.remove('collapsed')
                contents.innerHTML = hotspotContents[index - 1]
                if (tapAudio.paused) {
                    if (self.getAttribute('data-clicked') === 'true') {
                        const promise = tapAudio.play()
                        tapAudio.muted = false
                        if (promise !== undefined) {
                            promise.then(_ => {
                                // Autoplay started!
                            }).catch(error => {
                                // Autoplay was prevented.
                                console.log(error)
                            })
                        }
                    }
                }
            }
        }, true)
    },
}
export { TapHotspotComponent }