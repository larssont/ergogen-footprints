module.exports = {
  params: {
    designator: 'TPD',
    side: 'F',
    GND: { type: 'net', value: "GND" },
    DATA: { type: 'net', value: "TP_DATA" },
    CLOCK: { type: 'net', value: "TP_CLOCK" },
    RESET: { type: 'net', value: "TP_RESET" },
    VCC: { type: 'net', value: "V3" },
    LEFT: { type: 'net', value: "TP_LEFT" },
    MIDDLE: { type: 'net', value: "TP_MIDDLE" },
    RIGHT: { type: 'net', value: "TP_RIGHT" },
    // Connections to trackpoint sensor
    TPS1: { type: 'net', value: "TPS_1" },
    TPS2: { type: 'net', value: "TPS_2" },
    TPS3: { type: 'net', value: "TPS_3" },
    TPS4: { type: 'net', value: "TPS_4" },
    // Extra space for keep out zone to take up
    zone_padding: 0.5 
  },
  body: p => {
    const fp = [];
    const flip = p.side === "F";
    if (!flip && p.side !== "B") throw new Error('unsupported side: ' + p.side);

    fp.push(`(footprint "Sprintek_SK8707-01_Driver"`);
    fp.push(p.at);
    fp.push(`(layer ${(flip ? "B" : "F")}.Cu)`);
    fp.push(`(attr smd)`);

    fp.push(`(property "Reference" "${p.ref}" ${p.ref_hide} (at 0 0 ${p.r}) (layer "${p.side}.SilkS") (effects (font (size 1 1) (thickness 0.15))${p.side === "B" ? " (justify mirror)" : ""}))`);


    fp.push(
      `
        (zone
              (net 0)
              (net_name "")
              (layer "${p.side}.Cu")
              (name "Trackpoint Driver - Restricted Area ")
              (hatch full 0.5)
              (connect_pads
                  (clearance 0)
              )
              (min_thickness 0.25)
              (filled_areas_thickness no)
              (keepout
                  (tracks not_allowed)
                  (vias not_allowed)
                  (pads not_allowed)
                  (copperpour not_allowed)
                  (footprints not_allowed)
              )
              (fill
                  (thermal_gap 0.5)
                  (thermal_bridge_width 0.5)
              )
              (polygon
                  (pts
                      (xy ${p.eaxy(1.48 - p.zone_padding, 1.55 - p.zone_padding)})
                      (xy ${p.eaxy(11.5, 1.55 - p.zone_padding)})
                      (xy ${p.eaxy(11.5, 4.35 + p.zone_padding)})
                      (xy ${p.eaxy(1.48 - p.zone_padding, 4.35 + p.zone_padding)})
                  )
              )
          )
      `
    )

    // Pads
    fp.push(`(pad "1" smd roundrect (at ${(flip ? -4.78 : 4.78)} 7.25 ${p.r}) (size 1.2 2.4) (layers "${(flip ? "F" : "B")}.Cu" "${(flip ? "F" : "B")}.Paste" "${(flip ? "F" : "B")}.Mask") (roundrect_rratio 0.25) ${p.RIGHT})`);
    fp.push(`(pad "2" smd roundrect (at ${(flip ? -2.98 : 2.98)} 7.25 ${p.r}) (size 1.2 2.4) (layers "${(flip ? "F" : "B")}.Cu" "${(flip ? "F" : "B")}.Paste" "${(flip ? "F" : "B")}.Mask") (roundrect_rratio 0.25) ${p.MIDDLE})`);
    fp.push(`(pad "3" smd roundrect (at ${(flip ? -1.18 : 1.18)} 7.25 ${p.r}) (size 1.2 2.4) (layers "${(flip ? "F" : "B")}.Cu" "${(flip ? "F" : "B")}.Paste" "${(flip ? "F" : "B")}.Mask") (roundrect_rratio 0.25) ${p.LEFT})`);
    fp.push(`(pad "4" smd roundrect (at ${(flip ? 0.62 : -0.62)} 7.25 ${p.r}) (size 1.2 2.4) (layers "${(flip ? "F" : "B")}.Cu" "${(flip ? "F" : "B")}.Paste" "${(flip ? "F" : "B")}.Mask") (roundrect_rratio 0.25) ${p.VCC})`);
    fp.push(`(pad "5" smd roundrect (at ${(flip ? 2.42 : -2.42)} 7.25 ${p.r}) (size 1.2 2.4) (layers "${(flip ? "F" : "B")}.Cu" "${(flip ? "F" : "B")}.Paste" "${(flip ? "F" : "B")}.Mask") (roundrect_rratio 0.25) ${p.RESET})`);
    fp.push(`(pad "6" smd roundrect (at ${(flip ? 4.22 : -4.22)} 7.25 ${p.r}) (size 1.2 2.4) (layers "${(flip ? "F" : "B")}.Cu" "${(flip ? "F" : "B")}.Paste" "${(flip ? "F" : "B")}.Mask") (roundrect_rratio 0.25) ${p.CLOCK})`);
    fp.push(`(pad "7" smd roundrect (at ${(flip ? 6.02 : -6.02)} 7.25 ${p.r}) (size 1.2 2.4) (layers "${(flip ? "F" : "B")}.Cu" "${(flip ? "F" : "B")}.Paste" "${(flip ? "F" : "B")}.Mask") (roundrect_rratio 0.25) ${p.DATA})`);
    fp.push(`(pad "8" smd roundrect (at ${(flip ? 7.82 : -7.82)} 7.25 ${p.r}) (size 1.2 2.4) (layers "${(flip ? "F" : "B")}.Cu" "${(flip ? "F" : "B")}.Paste" "${(flip ? "F" : "B")}.Mask") (roundrect_rratio 0.25) ${p.GND})`);
    fp.push(`(pad "9" smd roundrect (at ${(flip ? -3.75 : 3.75)} -7.25 ${p.r + 90}) (size 2.4 2) (layers "${(flip ? "F" : "B")}.Cu" "${(flip ? "F" : "B")}.Paste" "${(flip ? "F" : "B")}.Mask") (roundrect_rratio 0.25) ${p.TPS4})`);
    fp.push(`(pad "10" smd roundrect (at ${(flip ? -1.25 : 1.25)} -7.25 ${p.r + 90}) (size 2.4 2) (layers "${(flip ? "F" : "B")}.Cu" "${(flip ? "F" : "B")}.Paste" "${(flip ? "F" : "B")}.Mask") (roundrect_rratio 0.25) ${p.TPS3})`);
    fp.push(`(pad "11" smd roundrect (at ${(flip ? 1.25 : -1.25)} -7.25 ${p.r + 90}) (size 2.4 2) (layers "${(flip ? "F" : "B")}.Cu" "${(flip ? "F" : "B")}.Paste" "${(flip ? "F" : "B")}.Mask") (roundrect_rratio 0.25) ${p.TPS2})`);
    fp.push(`(pad "12" smd roundrect (at ${(flip ? 3.75 : -3.75)} -7.25 ${p.r + 90}) (size 2.4 2) (layers "${(flip ? "F" : "B")}.Cu" "${(flip ? "F" : "B")}.Paste" "${(flip ? "F" : "B")}.Mask") (roundrect_rratio 0.25) ${p.TPS1})`);

    // B.SilkS
    fp.push(`(fp_rect (start ${(flip ? 11.5 : -11.5)} -7.25) (end ${(flip ? -11.5 : 11.5)} 7.25) (stroke (width 0.1) (type default)) (fill none) (layer ${(flip ? "F.SilkS" : "B.SilkS")}))`);
    fp.push(`(fp_text user "Trackpoint Driver" (at ${(flip ? -6.5 : 6.5)} 0.5 ${p.r + 0}) (unlocked yes) (layer ${(flip ? "F.SilkS" : "B.SilkS")}) (effects (font (size 1 1) (thickness 0.15)) (justify left bottom${flip ? "" : " mirror"})))`);

    fp.push(`(generator "pcbnew")`);
    fp.push(`(generator_version "8.0")`);

    fp.push(`)`);

    return fp.join('\n');
  }
}


