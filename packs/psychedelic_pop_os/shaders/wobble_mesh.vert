#ifdef GL_ES
precision highp float;
#endif

attribute vec3 a_position;
attribute vec2 a_uv;

uniform mat4 u_model;
uniform mat4 u_view;
uniform mat4 u_proj;
uniform float u_time;
uniform float u_distort;

varying vec2 v_uv;

void main(){
  vec3 p = a_position;
  float wob = sin(p.x*4.0 + u_time*2.0) * cos(p.y*3.0 - u_time*2.3);
  p.z += wob * 0.12 * (0.5 + u_distort);

  v_uv = a_uv;
  gl_Position = u_proj * u_view * u_model * vec4(p, 1.0);
}
