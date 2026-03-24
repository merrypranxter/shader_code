#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_intensity;
uniform float u_glow;
uniform float u_distort;

void main(){
  vec2 p = (gl_FragCoord.xy - 0.5*u_resolution.xy)/min(u_resolution.x,u_resolution.y);
  float t = u_time;

  float r = length(p);
  float a = atan(p.y,p.x);

  float twist = 2.0*r + 0.9*u_distort*sin(t*0.9 + r*12.0);
  a += twist + 0.35*sin(t + p.x*4.0);

  float tunnel = 0.5 + 0.5*sin(18.0*log(1.0+r*2.2) - t*6.0 + a*7.0);
  float stripes = 0.5 + 0.5*sin(a*20.0 + t*5.0);
  float candy = smoothstep(0.45, 0.95, tunnel*stripes);

  vec3 c1 = vec3(1.0,0.2,0.3);
  vec3 c2 = vec3(1.0,0.8,0.2);
  vec3 c3 = vec3(0.2,1.0,0.85);
  vec3 c4 = vec3(0.35,0.2,1.0);

  vec3 col = mix(c1,c2,tunnel);
  col = mix(col,c3,stripes*0.6);
  col = mix(col,c4,candy*0.55);

  float pulse = 0.9 + 0.1*sin(t*4.0 + r*25.0);
  col += u_glow * 0.35 * candy * vec3(1.0,0.9,0.6);
  col *= pulse * (0.7 + 0.7*u_intensity);

  gl_FragColor = vec4(col,1.0);
}
