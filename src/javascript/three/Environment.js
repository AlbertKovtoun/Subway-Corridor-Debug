import * as THREE from "three"
import { loaders, scene } from "./Experience"

export class Environment {
  constructor() {
    loaders.rgbeLoader.load("/hdr/scene2.hdr", (environmentMap) => {
      environmentMap.mapping = THREE.EquirectangularReflectionMapping

      scene.environment = environmentMap
      scene.background = environmentMap
    })
  }
}
