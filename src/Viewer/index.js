import React, { Component } from 'react';
import * as BABYLON from 'babylonjs';
// import {Texture} from "@babylonjs/core/Materials/Textures"
import BabylonScene from '../BabylonScene/'; // import the component above linking to file we just created.

export default class Viewer extends Component<{}, {}> {
    onSceneMount = (e: SceneEventArgs) => {
        const { canvas, scene, engine } = e;

        var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        
        var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
        light.diffuse = new BABYLON.Color3(0.98, 0.98, 0.98);
        
        // // Skybox
        // var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
        // var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        // skyboxMaterial.backFaceCulling = false;
        // skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene);
        // skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        // skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        // skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        // skybox.material = skyboxMaterial;	
    
        
        
        var mat = new BABYLON.StandardMaterial("texture", scene);
        mat.diffuseTexture = new BABYLON.Texture("/images/rock1.jpg",scene);
        
        var columns = 6;
        var rows = 1;
    
        const faceUV = new Array(6);
    
        for (let i = 0; i < 6; i++) {
            faceUV[i] = new BABYLON.Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
        }
        
        const options = {
            faceUV: faceUV,
            wrap: true
        };
        
        
        var box = BABYLON.MeshBuilder.CreateBox("box", options);
        box.material = mat;
    

        engine.runRenderLoop(() => {
            if (scene) {
                scene.render();
            }
        });
    }

    render() {               
        return (
            // <div>
                <BabylonScene onSceneMount={this.onSceneMount} />
            // </div>
        )
    }
}