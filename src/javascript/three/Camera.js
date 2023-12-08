import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { canvas, scene, sizes } from "./Experience"

export class Camera {
  constructor() {
    this.cursor = { x: 0, y: 0 }

    this.setCamera()
    this.setCameraControls()
  }

  setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      64.6,
      sizes.width / sizes.height,
      0.1,
      100
    )
    // this.camera.position.set(-2.53755, 0.941612, 9.79471)
    this.camera.position.set(-2.53755, 0.941612, 7)
    scene.add(this.camera)
  }

  setCameraControls() {
    this.controls = new OrbitControls(this.camera, canvas)
    this.controls.enableDamping = true

    window.addEventListener("mousemove", (ev) => {
      this.cursor.x = ev.clientX / sizes.width - 0.5
      this.cursor.y = ev.clientY / sizes.height - 0.5
    })
  }

  // update() {
  //   this.camera.lookAt(0, 1, 0)

  //   const cameraX = this.cursor.x * 1 - 1.5
  //   const cameraY = -this.cursor.y * 1 + 1

  //   this.camera.position.x += (cameraX - this.camera.position.x) * 0.04
  //   this.camera.position.y += (cameraY - this.camera.position.y) * 0.04
  // }
}
