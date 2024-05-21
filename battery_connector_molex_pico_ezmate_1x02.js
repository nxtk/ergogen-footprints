/*
Copyright (c) 2023 Marco Massarelli

SPDX-License-Identifier: CC-BY-NC-SA-4.0

To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/

Author: @infused-kim + @ceoloide improvements

Description:
  PCB footprint for for molex pico ezmate connector with 2 pins. Ideal for
  battery connections.

  This connector was chosen over the more common JST connector, because it
  has a mated profile height of only 1.65 mm. This is lower than the Kailh
  Choc hotswap sockets.

  It should also be compatible with the JST ACH connector (which is almost the
  same).

  One downside is that there are almost no batteries that ship with this
  connector. The one exception is the Nintendo Joycon 500 mAh battery.

  If you want to use the common 301230 battery, you will either need to crimp
  the connector yourself or buy a pre-crimped connector that you attach to
  the battery wires (available on digikey).

Params:
  side: default is F for Front
    the side on which to place the single-side footprint and designator, either F or B
  reversible: default is false
    if true, it will include pads on both Front and Back to make the footprint reversible
  include_silkscreen: default is true
    if true it will include the silkscreen. Recommended to be true to ensure connector
    polarity is not reversed, which can lead to shorting and damage to the MCU
  include_fabrication: default is true
    if true it will include the outline of the connector in the fabrication layer
  include_courtyard: default is true
    if true it will include a courtyard outline around the connector and in front of it
    to also account for the male connector plug and the wires. Recommended to be true
    at least once in the development of a board to confirm sufficient clearance for the
    connector and wires.
  include_model_{socket,plug}: default is false
    if true it will include a specified 3D model into a footprint to be used
    when rendering the PCB.
  models_dir: default is '../../footprints/ceoloide/3dmodels/'
    Allows you to specify the path to a 3D model directory relative to the ergogen
    generated kicad PCB file. 
    Use the ${VAR_NAME} syntax to point to a KiCad configured path.
  model_{socket,plug}_filename: defaults are below
    Allows you to specify the path to a 3D model file relative to models_dir.
    supported formats (step, stpz, wrl, wrz, x3d, idf, emn)
    socket - 'battery_connector_molexpicoezmate1x02_socket.step'
      plug - 'battery_connector_molexpicoezmate1x02_plug.step'
  model_{socket,plug}_{offset,rotation,scale}: default is [x, y, z] an array of decimal numbers
    xyz offset (in mm), used to adjust the position of the 3d model
      relative the footprint.
    xyz rotation (in degrees), used to adjust the orientation of the 3d
      model relative the footprint.
    xyz scale, used to adjust the size of the 3d model relative to its
      original size.

@ceoloide's improvements:
  - Add parameters to control silkscreen, fabrication, and courtyard
  - Expand courtyard to include space for the connector cable
  - Add polarity silkscreen
  - Upgrade to KiCad 8

@nxtk's improvements:
  - Add 3D model support
*/

module.exports = {
  params: {
    // reference, designator, location
    designator: 'CONN',
    side: 'F',
    
    // feature switches (excluding graphics and 3dmodels)
    reversible: false,
    
    // routing params (pads, traces, vias, nets)
    BAT_P: { type: 'net', value: 'BAT_P' },
    BAT_N: { type: 'net', value: 'GND' },

    // graphics
    include_silkscreen: true,
    include_fabrication: true,
    include_courtyard: true,

    // 3dmodels [x, y, z]
    include_model_socket: false,
    include_model_plug: false,
    
    models_dir: '../../footprints/ceoloide/3dmodels/', 
    model_socket_filename: 'battery_connector_molexpicoezmate1x02_socket.step',
    model_socket_offset: [0, 0, 0],
    model_socket_rotation: [0, 0, 0],
    model_socket_scale: [1, 1, 1],
    model_plug_filename: 'battery_connector_molexpicoezmate1x02_plug.step',
    model_plug_offset: [0, 0, 0],
    model_plug_rotation: [0, 0, 0],
    model_plug_scale: [1, 1, 1],
  },
  body: p => {
    const top = `
  (footprint "ceoloide:battery_connector_molex_pico_ezmate_1x02"
    (layer "${p.side}.Cu")
    ${p.at}
    (property "Reference" "${p.ref}"
      (at 0.1 3.9 ${p.r})
      (layer "${p.side}.SilkS")
      ${p.ref_hide}
      (effects (font (size 1 1) (thickness 0.15))))
    (attr smd)
    `

    const front_silkscreen = `
    (fp_line (start 0.5 3.85) (end 1.5 3.85) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 1 4.35) (end 1 3.35) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -0.5 3.85) (end -1.5 3.85) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 0.64 2.63) (end 1.14 2.63) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 0.34 2.13) (end 0.64 2.63) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -0.34 2.13) (end 0.34 2.13) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -0.64 2.63) (end -0.34 2.13) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -1.16 -2.09) (end -1.16 -2.3) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -2.21 -2.09) (end -1.16 -2.09) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -2.21 1.24) (end -2.21 -2.09) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -1.14 2.63) (end -0.64 2.63) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 2.21 -2.09) (end 1.16 -2.09) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 2.21 1.24) (end 2.21 -2.09) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    `

    const front_fabrication = `
    (fp_line (start -0.45 2.02) (end 0.45 2.02) (layer "F.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start -0.75 2.52) (end -0.45 2.02) (layer "F.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start -2.1 2.52) (end -0.75 2.52) (layer "F.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start -2.1 -1.98) (end 2.1 -1.98) (layer "F.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start -0.6 -1.272893) (end -0.1 -1.98) (layer "F.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start -1.1 -1.98) (end -0.6 -1.272893) (layer "F.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start 2.1 -1.98) (end 2.1 2.52) (layer "F.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start -2.1 -1.98) (end -2.1 2.52) (layer "F.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start 0.75 2.52) (end 2.1 2.52) (layer "F.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start 0.45 2.02) (end 0.75 2.52) (layer "F.Fab") (stroke (width 0.1) (type solid)))
    `

    const front_courtyard = `
    (fp_line (start 2.6 -2.8) (end -2.6 -2.8) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
    (fp_line (start -2.6 -2.8) (end -2.6 6.75) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
    (fp_line (start 2.6 6.75) (end 2.6 -2.8) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
    (fp_line (start -2.6 6.75) (end 2.6 6.75) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
    `

    const front_pads = `
    (pad "" smd roundrect (at 1.75 1.9 ${p.r}) (size 0.7 0.8) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.25))
    (pad "" smd roundrect (at -1.75 1.9 ${p.r}) (size 0.7 0.8) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.25))
    (pad "2" smd roundrect (at 0.6 -1.875 ${p.r}) (size 0.6 0.85) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.25) ${p.BAT_P.str})
    (pad "1" smd roundrect (at -0.6 -1.875 ${p.r}) (size 0.6 0.85) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.25) ${p.BAT_N.str})
    `

    const back_silkscreen = `
    (fp_line (start 0.5 3.85) (end 1.5 3.85) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -0.5 3.85) (end -1.5 3.85) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -1 4.35) (end -1 3.35) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -0.34 2.13) (end -0.64 2.63) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -0.64 2.63) (end -1.14 2.63) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 1.16 -2.09) (end 1.16 -2.3) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 2.21 -2.09) (end 1.16 -2.09) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 2.21 1.24) (end 2.21 -2.09) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -2.21 -2.09) (end -1.16 -2.09) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -2.21 1.24) (end -2.21 -2.09) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 0.64 2.63) (end 0.34 2.13) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 1.14 2.63) (end 0.64 2.63) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 0.34 2.13) (end -0.34 2.13) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    `

    const back_fabrication = `
    (fp_line (start 2.1 -1.98) (end -2.1 -1.98) (layer "B.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start 0.6 -1.272893) (end 0.1 -1.98) (layer "B.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start 1.1 -1.98) (end 0.6 -1.272893) (layer "B.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start -2.1 -1.98) (end -2.1 2.52) (layer "B.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start 2.1 -1.98) (end 2.1 2.52) (layer "B.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start -0.75 2.52) (end -2.1 2.52) (layer "B.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start -0.45 2.02) (end -0.75 2.52) (layer "B.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start 0.45 2.02) (end -0.45 2.02) (layer "B.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start 0.75 2.52) (end 0.45 2.02) (layer "B.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start 2.1 2.52) (end 0.75 2.52) (layer "B.Fab") (stroke (width 0.1) (type solid)))
    `

    const back_courtyard = `
    (fp_line (start -2.6 6.75) (end -2.6 -2.8) (layer "B.CrtYd") (stroke (width 0.05) (type solid)))
    (fp_line (start 2.6 6.75) (end -2.6 6.75) (layer "B.CrtYd") (stroke (width 0.05) (type solid)))
    (fp_line (start -2.6 -2.8) (end 2.6 -2.8) (layer "B.CrtYd") (stroke (width 0.05) (type solid)))
    (fp_line (start 2.6 -2.8) (end 2.6 6.75) (layer "B.CrtYd") (stroke (width 0.05) (type solid)))
    `

    const back_pads = `
    (pad "" smd roundrect (at 1.75 1.9 ${180 + p.r}) (size 0.7 0.8) (layers "B.Cu" "B.Paste" "B.Mask") (roundrect_rratio 0.25))
    (pad "" smd roundrect (at -1.75 1.9 ${180 + p.r}) (size 0.7 0.8) (layers "B.Cu" "B.Paste" "B.Mask") (roundrect_rratio 0.25))
    (pad "1" smd roundrect (at 0.6 -1.875 ${180 + p.r}) (size 0.6 0.85) (layers "B.Cu" "B.Paste" "B.Mask") (roundrect_rratio 0.25) ${p.BAT_N.str})
    (pad "2" smd roundrect (at -0.6 -1.875 ${180 + p.r}) (size 0.6 0.85) (layers "B.Cu" "B.Paste" "B.Mask") (roundrect_rratio 0.25) ${p.BAT_P.str})
    `

    const model_socket = `
    (model ${p.models_dir + p.model_socket_filename}
      (hide ${p.include_model_socket ? 'no' : 'yes'})
      (offset (xyz ${p.model_socket_offset[0]} ${p.model_socket_offset[1]} ${p.model_socket_offset[2]}))
      (scale (xyz ${p.model_socket_scale[0]} ${p.model_socket_scale[1]} ${p.model_socket_scale[2]}))
      (rotate (xyz ${p.model_socket_rotation[0]} ${p.model_socket_rotation[1]} ${p.model_socket_rotation[2]})))
    `
    const model_plug = `
    (model ${p.models_dir + p.model_plug_filename}
      (hide ${p.include_model_plug ? 'no' : 'yes'})
      (offset (xyz ${p.model_plug_offset[0]} ${p.model_plug_offset[1]} ${p.model_plug_offset[2]}))
      (scale (xyz ${p.model_plug_scale[0]} ${p.model_plug_scale[1]} ${p.model_plug_scale[2]}))
      (rotate (xyz ${p.model_plug_rotation[0]} ${p.model_plug_rotation[1]} ${p.model_plug_rotation[2]})))
    `

    const bottom = `
  )
    `

    let final = top;
    if (p.side == "F" || p.reversible) {
      final += front_pads;
      if(p.include_silkscreen) final += front_silkscreen;
      if(p.include_courtyard) final += front_courtyard;
      if(p.include_fabrication) final += front_fabrication;
    }

    if (p.side == "B" || p.reversible) {
      final += back_pads;
      if(p.include_silkscreen) final += back_silkscreen;
      if(p.include_courtyard) final += back_courtyard;
      if(p.include_fabrication) final += back_fabrication;
    }

    final += model_socket;
    final += model_plug;
    final += bottom;

    return final;
  }
}