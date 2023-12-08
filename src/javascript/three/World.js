import * as THREE from "three"
import {
  dust,
  getRandomNumber,
  loaders,
  postProcessing,
  renderer,
  scene,
} from "./Experience"

export class World {
  constructor() {
    this.loadModel()
  }

  getRandomBoolean() {
    return Math.random() > 0.5
  }

  loadModel() {
    loaders.gltfLoader.load("/models/world-opt.glb", (gltf) => {
      this.world = gltf.scene

      for (let child of this.world.children) {
        if (child.isMesh && child.material.map) {
          child.material.map.anisotropy =
            renderer.renderer.capabilities.getMaxAnisotropy()

          child.material.envMapIntensity = 0.6
        }

        if (child.isMesh) {
          child.receiveShadow = true
          child.castShadow = true
        }
      }

      scene.add(this.world)
    })
  }

  setLights() {
    this.pointLightsColor = "#C8F8FF"

    this.pointLight0Intensity = 2
    this.pointLight1Intensity = 20

    this.pointLight0Position = this.world.getObjectByName("Light0Ref").position
    this.pointLight1Position = this.world.getObjectByName("Light1Ref").position

    this.pointLight0Mesh = this.world.getObjectByName("Light0Mesh")
    this.pointLight1Mesh = this.world.getObjectByName("Light1Mesh")

    //Light0
    this.pointLight0C = new THREE.PointLight(
      this.pointLightsColor,
      this.pointLight0Intensity
    )
    this.pointLight0C.position.set(
      this.pointLight0Position.x,
      this.pointLight0Position.y,
      this.pointLight0Position.z
    )
    this.pointLight0C.castShadow = true
    this.pointLight0C.shadow.normalBias = 0.04

    this.pointLight0R = new THREE.PointLight(
      this.pointLightsColor,
      this.pointLight0Intensity
    )
    this.pointLight0R.position.set(
      this.pointLight0Position.x + 0.5,
      this.pointLight0Position.y,
      this.pointLight0Position.z
    )

    this.pointLight0L = new THREE.PointLight(
      this.pointLightsColor,
      this.pointLight0Intensity
    )
    this.pointLight0L.position.set(
      this.pointLight0Position.x - 0.5,
      this.pointLight0Position.y,
      this.pointLight0Position.z
    )

    //Light1
    this.pointLight1C = new THREE.PointLight(
      this.pointLightsColor,
      this.pointLight1Intensity
    )
    this.pointLight1C.position.set(
      this.pointLight1Position.x,
      this.pointLight1Position.y,
      this.pointLight1Position.z
    )
    this.pointLight1C.castShadow = true
    this.pointLight1C.shadow.normalBias = 0.04

    this.pointLight1R = new THREE.PointLight(
      this.pointLightsColor,
      this.pointLight1Intensity * 0.25
    )
    this.pointLight1R.position.set(
      this.pointLight1Position.x + 0.9,
      this.pointLight1Position.y,
      this.pointLight1Position.z
    )

    this.pointLight1L = new THREE.PointLight(
      this.pointLightsColor,
      this.pointLight1Intensity * 0.25
    )
    this.pointLight1L.position.set(
      this.pointLight1Position.x - 0.9,
      this.pointLight1Position.y,
      this.pointLight1Position.z
    )

    scene.add(
      this.pointLight0C,
      this.pointLight0R,
      this.pointLight0L,
      this.pointLight1C,
      this.pointLight1R,
      this.pointLight1L
    )

    this.ambientLight = new THREE.AmbientLight("#60B2F1", 0.1)
    scene.add(this.ambientLight)
  }

  setLightsFlickering() {
    let isLight0On = 1

    setInterval(() => {
      isLight0On = this.getRandomBoolean()

      //Light0
      if (isLight0On) {
        this.pointLight0C.visible = true
        this.pointLight0L.visible = true
        this.pointLight0R.visible = true

        this.pointLight0Mesh.material.emissiveIntensity = 10
      } else {
        this.pointLight0C.visible = false
        this.pointLight0L.visible = false
        this.pointLight0R.visible = false

        this.pointLight0Mesh.material.emissiveIntensity = 0.1
      }
    }, getRandomNumber(0.8, 1) * 200)
  }

  setDimensionFlickering() {
    let isDownUnder = 1

    setInterval(() => {
      isDownUnder = this.getRandomBoolean()

      if (isDownUnder) {
        postProcessing.tintPass.enabled = true
        postProcessing.noisePass.enabled = true
        dust.particlesPoints.visible = true
      } else {
        postProcessing.tintPass.enabled = false
        postProcessing.noisePass.enabled = false
        dust.particlesPoints.visible = false
      }
    }, getRandomNumber(0.8, 1) * 2000)
  }
}
