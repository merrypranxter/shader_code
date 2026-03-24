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
  float t = u_time * 0.85;

  vec2 q = p;
  q.x += 0.18*sin(q.y*8.0 + t*2.2) * (0.5 + u_distort);
  q.y += 0.18*cos(q.x*7.0 - t*2.5) * (0.5 + u_distort);

  float f =
    sin(q.x*9.0 + t*2.0) +
    sin(q.y*10.0 - t*1.8) +
    sin((q.x+q.y)*7.0 + t*2.7) +
    sin(length(q)*16.0 - t*3.2);

  f *= 0.25;
  float m = 0.5 + 0.5*f;

  vec3 a = vec3(1.0,0.25,0.45);
  vec3 b = vec3(0.25,0.95,1.0);
  vec3 c = vec3(0.95,1.0,0.3);

  vec3 col = mix(a,b,m);
  col = mix(col,c,0.5+0.5*sin(t + f*4.0));
  col += u_glow*0.3*pow(m,2.0);

  col *= (0.65 + 0.8*u_intensity);
  gl_FragColor = vec4(col,1.0);
}
