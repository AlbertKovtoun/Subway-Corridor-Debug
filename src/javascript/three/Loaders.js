import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader"
import { world } from "./Experience"

export class Loaders {
  constructor() {
    this.loadingScreen = document.querySelector(".loading-screen")
    this.loadingScreenBar = document.querySelector(".loading-bar-inside")

    this.loadingManager = new THREE.LoadingManager(
      () => {
        //On Loaded
        // console.log("Loading complete!")

        //Fade out the opacity of the loading screen
        this.loadingScreen.style.opacity = 0

        //Remove the loading screen from the DOM
        setTimeout(() => {
          this.loadingScreen.remove()
        }, 2000)

        world.setLights()
        world.setLightsFlickering()
        // world.setDimensionFlickering()
      },
      (itemUrl, itemsLoaded, itemsTotal) => {
        //On Progress
        let loadingProgress = itemsLoaded / itemsTotal

        //scale the loading bar to the loading progress from left to right
        this.loadingScreenBar.style.transform = `scaleX(${loadingProgress})`
      }
    )

    this.textureLoader = new THREE.TextureLoader()

    this.gltfLoader = new GLTFLoader(this.loadingManager)

    this.rgbeLoader = new RGBELoader()
  }
}
