#ifdef GL_ES
precision highp float;
#endif

attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float u_time;
uniform float u_distort;

varying vec2 v_uv;

void main(){
  vec3 p = position;
  float wob = sin(p.x*4.0 + u_time*2.0) * cos(p.y*3.0 - u_time*2.3);
  p.z += wob * 0.12 * (0.5 + u_distort);

  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
