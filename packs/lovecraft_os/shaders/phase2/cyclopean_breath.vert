#ifdef GL_ES
precision highp float;
#endif

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float u_time;
uniform float u_intensity;
uniform float u_distort;

varying vec2 v_uv;
varying float v_breath;

void main(){
  v_uv = uv;
  vec3 p = position;

  float t = u_time;
  float wave = sin((p.x + p.y) * 4.0 + t * 1.8) * cos(p.z * 3.0 - t * 1.2);
  float inhale = sin(t * 0.9) * 0.5 + 0.5;

  float breath = wave * inhale * u_distort;
  p += normal * breath * (0.08 + 0.16 * u_intensity);
  p.xy += normalize(p.xy + 1e-4) * breath * 0.03;

  v_breath = breath;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
