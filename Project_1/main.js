import * as THREE from 'three'
import "./style.css"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import gsap from 'gsap';


//Scene
const scene =new THREE.Scene();


// create our Sphere 
const geometry = new THREE.SphereGeometry( 3, 64, 64 );

//Material
const material = new THREE.MeshStandardMaterial( { 
  color: "#FFE3C6",
  roughness:0.5
}); 

//Mesh
const mesh = new THREE.Mesh( geometry, material );
//zur scene hinzufügen
scene.add(mesh);


//Size of the Window
const size= {
  widht:window.innerWidth,
  height: window.innerHeight,

}

//Light
const light=new THREE.PointLight(0xffffff,1 , 100)
//X, Y,Z Postion
light.position.set(0,10,10)
scene.add(light)

//Camera
const camera=new THREE.PerspectiveCamera(45, size.widht/ size.height ,0.1,100);
//Camera postion
camera.position.z=20;
//camera hinzufügen
scene.add(camera)


//Renderer
const canvas= document.querySelector(".webgl");
const renderer= new THREE.WebGLRenderer({canvas});
//smoother Edges
renderer.setPixelRatio(3)

//wie groß ist Renderer
renderer.setSize(size.widht, size.height)
renderer.render(scene,camera)

//Orbit Control!!!
const controls= new OrbitControls(camera, canvas)
controls.enableDamping=true
//pan = schwenken
controls.enablePan=false
controls.enableZoom=false
controls.autoRotate=true
controls.autoRotateSpeed=5




//Resize
window.addEventListener("resize",() => {

  //Update Size
  size.widht = window.innerWidth;
  size.height = window.innerHeight;

  //Update Camera
  camera.updateProjectionMatrix()

  //Aspect Ratio=Seitenverhöltnis
  camera.aspect = size.widht/ size.height
  renderer.setSize(size.widht, size.height)
})

//Update by Frame
const loop =()=> {
  controls.update();
   renderer.render(scene,camera)
  window.requestAnimationFrame(loop)
} 
loop()


//Timeline magicc
//beim Laden hineinzoomen
//fromTo() Methode !!!
//duration = Dauer
const tl= gsap.timeline({defaults: {duration:1}})
tl.fromTo(mesh. scale,{ z:0,x:0, y:0}, {z:1, x:1, y:1})
tl.fromTo("nav", {y:"-100%"},{y:"0%"})
tl.fromTo(".title", {opacity:0},{opacity:1})

//Mouse animation color hover down up
let mouseDown= false;
//color Array
let rgb=[];
window.addEventListener("mousedown",() => (mouseDown=true))
window.addEventListener("mouseup",() => (mouseDown=false))
//e=Event
window.addEventListener("mousemove", (e) => {
  if(mouseDown){
    rgb = [
      //Value 0-255 on the xAxis and yAxis
      Math.round((e.pageX/size.widht) * 255),
      Math.round((e.pageY/size.height) * 255),
      155,
    ]
    console.log(rgb)
    //lets animate ???
    let newColor= new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color,{
      r:  newColor.r,
      g:  newColor.g,
      b:  newColor.b,
    })
  }
 
})