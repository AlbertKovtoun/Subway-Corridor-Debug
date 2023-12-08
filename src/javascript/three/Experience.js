import * as THREE from "three"
import Stats from "stats.js"
import gsap from "gsap"

import { Camera } from "./Camera"
import { Renderer } from "./Renderer"
import { Sizes } from "./Sizes"
import { Loaders } from "./Loaders"
import { Dust } from "./Dust"
import { World } from "./World"
import { Environment } from "./Environment"
import { PostProcessing } from "./PostProcessing"

import { Pane } from "tweakpane"

export function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min
}

export const pane = new Pane()

const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)

export const canvas = document.querySelector("canvas.webgl")

export const scene = new THREE.Scene()

export const loaders = new Loaders()

export const environment = new Environment()

export const world = new World()

export const dust = new Dust()

export const sizes = new Sizes()

export const camera = new Camera()

export const renderer = new Renderer()

export const postProcessing = new PostProcessing()

//Animate
const clock = new THREE.Clock()
let time = Date.now()

console.log(
  "If you're reading this, hey! You can find the source code here: https://github.com/AlbertKovtoun/Subway-Corridor"
)

const tick = () => {
  stats.begin()

  const elapsedTime = clock.getElapsedTime()

  const currentTime = Date.now()
  const deltaTime = currentTime - time
  time = currentTime

  // Update controls
  camera.controls.update()
  // camera.update()

  dust.update(elapsedTime)
  postProcessing.noisePass.material.uniforms.uTime.value = elapsedTime
  postProcessing.lensDistortionPass.material.uniforms.uTime.value = elapsedTime

  // Render
  // renderer.renderer.render(scene, camera.camera)
  postProcessing.effectComposer.render()

  window.requestAnimationFrame(tick)

  stats.end()
}

tick()
