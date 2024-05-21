/*
Copyright (c) 2023 Marco Massarelli

SPDX-License-Identifier: CC-BY-NC-SA-4.0

To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/

Authors: @ergogen + @infused-kim improvements + @ceoloide improvements

Description:
  Combined Thru-Hole and SMD diode footprint for SOD-123 package, like the Semtech 1N4148W
  component sold by Typeractive.xyz or LCSC.

Datasheet:
  https://cdn.shopify.com/s/files/1/0618/5674/3655/files/Semtech-1N4148W.pdf?v=1670451309

Params:
  side: default is B for Back
    the side on which to place the single-side footprint and designator, either F or B
  reversible: default is false
    if true, the footprint will be placed on both sides so that the PCB can be
    reversible
  include_tht: default is false
    if true it includes through-hole pads alongside SMD ones
  include_model_diode_{th,smd}: default is false
    if true it will include a specified 3D model into a footprint to be used
    when rendering the PCB.
  models_dir: default is '../../footprints/ceoloide/3dmodels/'
    Allows you to specify the path to a 3D model directory relative to the ergogen
    generated kicad PCB file.
    Use the ${VAR_NAME} syntax to point to a KiCad configured path.
  model_diode_{th,smd}_filename: defaults are below
    Allows you to specify the path to a 3D model file relative to models_dir.
    supported formats (step, stpz, wrl, wrz, x3d, idf, emn)
      th - 'diode_th.step'
      smd - 'diode_sod123.step'
  model_diode_{th,smd}_{offset,rotation,scale}: default is [x, y, z] an array of decimal numbers
    xyz offset (in mm), used to adjust the position of the 3d model
      relative the footprint.
    xyz rotation (in degrees), used to adjust the orientation of the 3d
      model relative the footprint.
    xyz scale, used to adjust the size of the 3d model relative to its
      original size.

@infused-kim's improvements:
 - Add option to hide thru-holes
 - Add virtual attribute to silence DRC error

@ceoloide's improvements:
 - Add single side support
 - Upgrade to KiCad 8

@grazfather's improvements:
 - Add support for diode 3D model
*/

module.exports = {
  params: {
    // reference, designator, location
    designator: 'D',
    side: 'B',

    // feature switches (excluding graphics and 3dmodels)
    reversible: false,
    include_tht: false,

    // routing params (pads, traces, vias, nets)
    from: { type: 'net', value: undefined },
    to: { type: 'net', value: undefined },

    // graphics
    include_silkscreen: true,

    // 3dmodels [x, y, z]
    include_model_diode_th: false,
    include_model_diode_smd: false,

    models_dir: '../../footprints/ceoloide/3dmodels/',
    model_diode_th_filename: 'diode_th.step',
    model_diode_th_offset: [0, 0, 0],
    model_diode_th_rotation: [0, 0, 0],
    model_diode_th_scale: [1, 1, 1],
    model_diode_smd_filename: 'diode_sod123.step',
    model_diode_smd_offset: [0, 0, 0],
    model_diode_smd_rotation: [0, 0, 0],
    model_diode_smd_scale: [1, 1, 1],
  },
  body: p => {
    const top = `
  (footprint "ceoloide:diode_tht_sod123"
    (layer "${p.side}.Cu")
    ${p.at}
    (property "Reference" "${p.ref}"
      (at 0 0 ${p.r})
      (layer "${p.side}.SilkS")
      ${p.ref_hide}
      (effects (font (size 1 1) (thickness 0.15))))
    `

    const front_silkscreen = `
    (fp_line (start 0.25 0) (end 0.75 0) (layer "F.SilkS") (stroke (width 0.1) (type solid)))
    (fp_line (start 0.25 0.4) (end -0.35 0) (layer "F.SilkS") (stroke (width 0.1) (type solid)))
    (fp_line (start 0.25 -0.4) (end 0.25 0.4) (layer "F.SilkS") (stroke (width 0.1) (type solid)))
    (fp_line (start -0.35 0) (end 0.25 -0.4) (layer "F.SilkS") (stroke (width 0.1) (type solid)))
    (fp_line (start -0.35 0) (end -0.35 0.55) (layer "F.SilkS") (stroke (width 0.1) (type solid)))
    (fp_line (start -0.35 0) (end -0.35 -0.55) (layer "F.SilkS") (stroke (width 0.1) (type solid)))
    (fp_line (start -0.75 0) (end -0.35 0) (layer "F.SilkS") (stroke (width 0.1) (type solid)))
    `
    const back_silkscreen = `
    (fp_line (start 0.25 0) (end 0.75 0) (layer "B.SilkS") (stroke (width 0.1) (type solid)))
    (fp_line (start 0.25 0.4) (end -0.35 0) (layer "B.SilkS") (stroke (width 0.1) (type solid)))
    (fp_line (start 0.25 -0.4) (end 0.25 0.4) (layer "B.SilkS") (stroke (width 0.1) (type solid)))
    (fp_line (start -0.35 0) (end 0.25 -0.4) (layer "B.SilkS") (stroke (width 0.1) (type solid)))
    (fp_line (start -0.35 0) (end -0.35 0.55) (layer "B.SilkS") (stroke (width 0.1) (type solid)))
    (fp_line (start -0.35 0) (end -0.35 -0.55) (layer "B.SilkS") (stroke (width 0.1) (type solid)))
    (fp_line (start -0.75 0) (end -0.35 0) (layer "B.SilkS") (stroke (width 0.1) (type solid)))
    `

    const front_pads = `
    (pad "1" smd rect (at -1.65 0 ${p.r}) (size 0.9 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${p.to.str})
    (pad "2" smd rect (at 1.65 0 ${p.r}) (size 0.9 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${p.from.str})
    `

    const back_pads = `
    (pad "2" smd rect (at 1.65 0 ${p.r}) (size 0.9 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${p.from.str})
    (pad "1" smd rect (at -1.65 0 ${p.r}) (size 0.9 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${p.to.str})
    `

    const tht = `
    (pad "1" thru_hole rect (at -3.81 0 ${p.r}) (size 1.778 1.778) (drill 0.9906) (layers "*.Cu" "*.Mask") ${p.to.str})
    (pad "2" thru_hole circle (at 3.81 0 ${p.r}) (size 1.905 1.905) (drill 0.9906) (layers "*.Cu" "*.Mask") ${p.from.str})
    `

    const model_th = `
    (model ${p.models_dir + p.model_diode_th_filename}
      (hide ${p.include_model_diode_th ? 'no' : 'yes'})
      (offset (xyz ${p.model_diode_th_offset[0]} ${p.model_diode_th_offset[1]} ${p.model_diode_th_offset[2]}))
      (scale (xyz ${p.model_diode_th_scale[0]} ${p.model_diode_th_scale[1]} ${p.model_diode_th_scale[2]}))
      (rotate (xyz ${p.model_diode_th_rotation[0]} ${p.model_diode_th_rotation[1]} ${p.model_diode_th_rotation[2]})))
    `

    const model_smd = `
    (model ${p.models_dir + p.model_diode_smd_filename}
      (hide ${p.include_model_diode_smd ? 'no' : 'yes'})
      (offset (xyz ${p.model_diode_smd_offset[0]} ${p.model_diode_smd_offset[1]} ${p.model_diode_smd_offset[2]}))
      (scale (xyz ${p.model_diode_smd_scale[0]} ${p.model_diode_smd_scale[1]} ${p.model_diode_smd_scale[2]}))
      (rotate (xyz ${p.model_diode_smd_rotation[0]} ${p.model_diode_smd_rotation[1]} ${p.model_diode_smd_rotation[2]})))
    `

    const bottom = `
  )
    `

    let final = top;

    if (p.side == "F" || p.reversible) {
      if (p.include_silkscreen) final += front_silkscreen
      final += front_pads;
    }

    if (p.side == "B" || p.reversible) {
      if (p.include_silkscreen) final += back_silkscreen
      final += back_pads;
    }

    if (p.include_tht) {
      final += tht;
    }

    final += model_th;
    final += model_smd;
    final += bottom;

    return final;
  }
}