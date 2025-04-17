module.exports = {
    params: {
        designator: 'MH',
        side: 'F',
        hole_size: 2.2,         // Hole size in mm
        hole_drill: 2.2,         // Drill size in mm
        clearance: 0.1,          // Clearance around the hole
        keepout_size: 0,         // Diameter of the keepout zone
        precision: 0.1           // Maximum segment length in mm
    },
    body: p => {
        // Calculate the minimum allowable diameter
        const minZone = p.hole_size + 2 * p.clearance;

        // Generate the polygon points for the circular zone
        const circle = (r, precision) => {
            const circumference = 2 * Math.PI * r;
            const num_points = Math.ceil(circumference / precision);
            return Array.from({ length: num_points + 1 }, (_, i) => {
                const angle = (i * 2 * Math.PI) / num_points;
                return `(xy ${p.eaxy(
                    r * Math.cos(angle),
                    r * Math.sin(angle)
                )})`;
            }).join('\n');
        };

        // Only include the zone if the radius is large enough
        const zone = p.keepout_size > minZone ? 
            `(zone
                (net 0)
                (net_name "")
                (layer "${p.side}.Cu")
                (name "Standoff Zone")
                (hatch full 0.5)
                (connect_pads
                    (clearance 0)
                )
                (min_thickness 0.25)
                (filled_areas_thickness no)
                (keepout
                    (tracks allowed)
                    (vias allowed)
                    (pads not_allowed)
                    (copperpour allowed)
                    (footprints not_allowed)
                )
                (fill
                    (thermal_gap 0.5)
                    (thermal_bridge_width 0.5)
                )
                (polygon
                    (pts
                        ${circle(p.keepout_size / 2, p.precision)}
                    )
                )
            )` : '';

        return `
            (footprint "mh_npth"
                (layer "${p.side}.Cu")
                ${p.at}
                (property "Reference" "${p.ref}"
                    (at 0 2.55 ${p.r})
                    (layer "${p.side}.SilkS")
                    ${p.ref_hide}
                    (effects (font (size 1 1) (thickness 0.15)))
                )
                (pad "" np_thru_hole circle
                    (at 0 0 ${p.r})
                    (size ${p.hole_size} ${p.hole_size})
                    (drill ${p.hole_drill})
                    (layers "*.Cu" "*.Mask")
                    (clearance ${p.clearance})
                )
                ${zone}
            )`
    }
};
