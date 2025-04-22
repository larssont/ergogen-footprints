module.exports = {
  params: {
    designator: 'TPS',
    side: 'F',
    TPS1: { type: 'net', value: "TPS_1" },
    TPS2: { type: 'net', value: "TPS_2" },
    TPS3: { type: 'net', value: "TPS_3" },
    TPS4: { type: 'net', value: "TPS_4" },
    hole_size: 7,
    silkscreen: true,
  },
  body: p => {
    const fp = [];
    const flip = p.side === "F";
    if (!flip && p.side !== "B") throw new Error('unsupported side: ' + p.side);

    fp.push(`(footprint "TP_Sprintek_SK8707-01_Sensor"`);
    fp.push(p.at);
    fp.push(`(layer ${(flip ? "B" : "F")}.Cu)`);
    fp.push(`(attr smd)`);

    fp.push(`(property "Reference" "${p.ref}" ${p.ref_hide} (at 0 0 ${p.r}) (layer "${p.side}.SilkS") (effects (font (size 1 1) (thickness 0.15))${p.side === "B" ? " (justify mirror)" : ""}))`);


    // Pads
    fp.push(`(pad "" smd circle (at ${(flip ? 4.75 : -4.75)} -4.75 ${p.r}) (size 2.5 2.5) (layers "${(flip ? "F" : "B")}.Cu" "${(flip ? "F" : "B")}.Paste" "${(flip ? "F" : "B")}.Mask"))`);
    fp.push(`(pad "" smd circle (at ${(flip ? 4.75 : -4.75)} 4.75 ${p.r}) (size 2.5 2.5) (layers "${(flip ? "F" : "B")}.Cu" "${(flip ? "F" : "B")}.Paste" "${(flip ? "F" : "B")}.Mask"))`);
    fp.push(`(pad "" np_thru_hole circle (at 0 0 ${p.r}) (size ${p.hole_size} ${p.hole_size}) (drill ${p.hole_size}) (layers "F&B.Cu" "*.Mask"))`);
    fp.push(`(pad "" smd circle (at ${(flip ? -4.75 : 4.75)} -4.75 ${p.r}) (size 2.5 2.5) (layers "${(flip ? "F" : "B")}.Cu" "${(flip ? "F" : "B")}.Paste" "${(flip ? "F" : "B")}.Mask"))`);
    fp.push(`(pad "" smd circle (at ${(flip ? -4.75 : 4.75)} 4.75 ${p.r}) (size 2.5 2.5) (layers "${(flip ? "F" : "B")}.Cu" "${(flip ? "F" : "B")}.Paste" "${(flip ? "F" : "B")}.Mask"))`);
    fp.push(`(pad "1" smd roundrect (at ${(flip ? 3.75 : -3.75)} 10.84 ${p.r + 90}) (size 2.4 2) (layers "${(flip ? "F" : "B")}.Cu" "${(flip ? "F" : "B")}.Paste" "${(flip ? "F" : "B")}.Mask") (roundrect_rratio 0.25) (thermal_bridge_angle 45) ${p.TPS4})`);
    fp.push(`(pad "2" smd roundrect (at ${(flip ? 1.25 : -1.25)} 10.84 ${p.r + 90}) (size 2.4 2) (layers "${(flip ? "F" : "B")}.Cu" "${(flip ? "F" : "B")}.Paste" "${(flip ? "F" : "B")}.Mask") (roundrect_rratio 0.25) (thermal_bridge_angle 45) ${p.TPS3})`);
    fp.push(`(pad "3" smd roundrect (at ${(flip ? -1.25 : 1.25)} 10.84 ${p.r + 90}) (size 2.4 2) (layers "${(flip ? "F" : "B")}.Cu" "${(flip ? "F" : "B")}.Paste" "${(flip ? "F" : "B")}.Mask") (roundrect_rratio 0.25) (thermal_bridge_angle 45) ${p.TPS2})`);
    fp.push(`(pad "4" smd roundrect (at ${(flip ? -3.75 : 3.75)} 10.84 ${p.r + 90}) (size 2.4 2) (layers "${(flip ? "F" : "B")}.Cu" "${(flip ? "F" : "B")}.Paste" "${(flip ? "F" : "B")}.Mask") (roundrect_rratio 0.25) (thermal_bridge_angle 45) ${p.TPS1})`);

    // Styling
    const displayLayer = p.silkscreen ? (flip ? "F.SilkS" : "B.SilkS") : "Dwgs.User"

    fp.push(`(fp_line (start ${(flip ? 6.6 : -6.6)} -7.45) (end ${(flip ? 6.6 : -6.6)} -4.45) (stroke (width 0.1) (type default)) (layer ${displayLayer}))`);
    fp.push(`(fp_line (start ${(flip ? 6.6 : -6.6)} 7.84) (end ${(flip ? 6.6 : -6.6)} 10.84) (stroke (width 0.1) (type default)) (layer ${displayLayer}))`);
    fp.push(`(fp_line (start ${(flip ? 6.6 : -6.6)} 10.84) (end ${(flip ? 3.6 : -3.6)} 10.84) (stroke (width 0.1) (type default)) (layer ${displayLayer}))`);
    fp.push(`(fp_line (start ${(flip ? 3.6 : -3.6)} -7.45) (end ${(flip ? 6.6 : -6.6)} -7.45) (stroke (width 0.1) (type default)) (layer ${displayLayer}))`);
    fp.push(`(fp_line (start ${(flip ? -3.6 : 3.6)} 10.84) (end ${(flip ? -6.6 : 6.6)} 10.84) (stroke (width 0.1) (type default)) (layer ${displayLayer}))`);
    fp.push(`(fp_line (start ${(flip ? -6.6 : 6.6)} -7.45) (end ${(flip ? -3.6 : 3.6)} -7.45) (stroke (width 0.1) (type default)) (layer ${displayLayer}))`);
    fp.push(`(fp_line (start ${(flip ? -6.6 : 6.6)} -4.45) (end ${(flip ? -6.6 : 6.6)} -7.45) (stroke (width 0.1) (type default)) (layer ${displayLayer}))`);
    fp.push(`(fp_line (start ${(flip ? -6.6 : 6.6)} 10.84) (end ${(flip ? -6.6 : 6.6)} 7.84) (stroke (width 0.1) (type default)) (layer ${displayLayer}))`);
    fp.push(`(fp_text user "Trackpoint" (at 0 7.5 ${p.r + 0}) (unlocked yes) (layer ${displayLayer}) (effects (font (size 1 1) (thickness 0.15)) (justify bottom${ flip ? "" : " mirror"})))`);
    fp.push(`(fp_text user "Sensor" (at 0 9 ${p.r + 0}) (unlocked yes) (layer ${displayLayer}) (effects (font (size 1 1) (thickness 0.15)) (justify bottom${ flip ? "" : " mirror"})))`);

    // Dwgs.User
    fp.push(`(fp_rect (start ${(flip ? 1.2 : -1.2)} -1.2) (end ${(flip ? -1.2 : 1.2)} 1.2) (stroke (width 0.1) (type default)) (fill solid) (layer "Dwgs.User"))`);
    
    fp.push(`(generator "pcbnew")`);
    fp.push(`(generator_version "8.0")`);

    fp.push(`)`);

    return fp.join('\n');
  }
}