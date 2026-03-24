# Psychedelic Pop OS Shader Pack

A high-chroma, poster-leaning shader template set designed for ShaderForge3 and standalone GLSL workflows.

## Contents
- `packs/psychedelic_pop_os/shaders/neon_bloom_kaleido.frag`: Kaleidoscopic floral bloom with neon color-cycling.
- `packs/psychedelic_pop_os/shaders/taffy_tunnel.frag`: Twisted candy tunnel with rhythmic stripe harmonics.
- `packs/psychedelic_pop_os/shaders/confetti_lattice.frag`: Grid + confetti motif with optional glitch accents.
- `packs/psychedelic_pop_os/shaders/gumdrop_plasma.frag`: Rounded plasma pattern with saturated palette transitions.
- `packs/psychedelic_pop_os/shaders/wobble_mesh.vert`: Soft wobble vertex deformation for mesh-driven variants.
- `packs/psychedelic_pop_os/shaders/sugar_scan_post.frag`: Film-grain + scanline + vignette finishing pass.
- `packs/psychedelic_pop_os/shaders/chroma_ghost_post.frag`: Chromatic ghosting / mild aberration pass.
- `packs/psychedelic_pop_os/presets/psychedelic_pop_blends.json`: Preset bundle with style weights + uniforms.
- `packs/psychedelic_pop_os/integrations/shaderforge3_prompt_block.md`: Prompt text block for generation workflows.

## Uniform contract (common)
- `u_resolution` (`vec2`) viewport in pixels
- `u_time` (`float`) seconds since start
- `u_mouse` (`vec2`) pointer position in pixels
- `u_intensity` (`float`) effect strength
- `u_glow` (`float`) emissive multiplier
- `u_distort` (`float`) geometric warping amount
- `u_glitch` (`float`) optional glitch amount (used by `confetti_lattice`)

## Optional post-processing uniforms
- `sugar_scan_post.frag`: `u_grain`, `u_vignette`
- `chroma_ghost_post.frag`: `u_aberration`, `u_scan`
