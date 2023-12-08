import * as THREE from "three"

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader"

import { camera, renderer, scene, sizes } from "./Experience"

import tintVertexShader from "../../shaders/tint/vertex.glsl?raw"
import tintFragmentShader from "../../shaders/tint/fragment.glsl?raw"

import noiseVertexShader from "../../shaders/noise/vertex.glsl?raw"
import noiseFragmentShader from "../../shaders/noise/fragment.glsl?raw"

import lensDistortionVertexShader from "../../shaders/lensDistortion/vertex.glsl?raw"
import lensDistortionFragmentShader from "../../shaders/lensDistortion/fragment.glsl?raw"

import vignetteVertexShader from "../../shaders/vignette/vertex.glsl?raw"
import vignetteFragmentShader from "../../shaders/vignette/fragment.glsl?raw"

export class PostProcessing {
  constructor() {
    this.renderTarget = new THREE.WebGLRenderTarget(800, 600, { samples: 5 })

    this.effectComposer = new EffectComposer(
      renderer.renderer,
      this.renderTarget
    )

    this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.effectComposer.setSize(sizes.width, sizes.height)

    this.renderPass = new RenderPass(scene, camera.camera)
    this.effectComposer.addPass(this.renderPass)

    this.gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
    this.effectComposer.addPass(this.gammaCorrectionPass)

    //Tint
    this.TintShader = {
      vertexShader: tintVertexShader,
      fragmentShader: tintFragmentShader,

      uniforms: {
        tDiffuse: { value: null },
        uTintColor: { value: new THREE.Color("#60B2F1") },
      },
    }

    this.tintPass = new ShaderPass(this.TintShader)
    // this.effectComposer.addPass(this.tintPass)

    //TV noise
    this.NoiseShader = {
      vertexShader: noiseVertexShader,
      fragmentShader: noiseFragmentShader,

      uniforms: {
        tDiffuse: { value: null },
        uTime: { value: 0 },
        uNoiseStrength: { value: 40 },
      },
    }

    this.noisePass = new ShaderPass(this.NoiseShader)
    this.effectComposer.addPass(this.noisePass)

    //Lens Distortion
    this.LensDistortionShader = {
      vertexShader: lensDistortionVertexShader,
      fragmentShader: lensDistortionFragmentShader,

      uniforms: {
        tDiffuse: { value: null },
        uTime: { value: 0 },
      },
    }

    this.lensDistortionPass = new ShaderPass(this.LensDistortionShader)
    this.effectComposer.addPass(this.lensDistortionPass)

    //Vignette
    this.VignetteShader = {
      vertexShader: vignetteVertexShader,
      fragmentShader: vignetteFragmentShader,

      uniforms: {
        tDiffuse: { value: null },
      },
    }

    this.vignettePass = new ShaderPass(this.VignetteShader)
    this.effectComposer.addPass(this.vignettePass)

    this.effectComposer.renderTarget1.texture.colorSpace = THREE.SRGBColorSpace
    this.effectComposer.renderTarget2.texture.colorSpace = THREE.SRGBColorSpace

    window.addEventListener("resize", () => {
      this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      this.effectComposer.setSize(sizes.width, sizes.height)
    })
  }
}
