import React, { useEffect } from "react";
import { SliderHandle, SliderInput, SliderTrack } from "@reach/slider";
import { curveCatmullRom, drag, easeElastic, event, line, select } from "d3";
import {
	getDragTarget,
	getEventCoords,
	getNormalizedOffset,
	getPosFromValue,
	getSteppedValue,
	getValueFromPos
} from "./utils";
import { IRubberSliderProps, TSliderPos } from "./rubber-slider.d";

export const RubberSlider: React.FC<IRubberSliderProps> = ({
	id = "rubber-slider",
	name,
	className = "",
	value = 0,
	onChange = (value: number): void => {},
	width = 200,
	height = 100,
	max = 100,
	min = 0,
	step = 1,
	easeFunction = easeElastic,
	easeDuration = 700,
	onDragStart = (position: TSliderPos): void => {},
	onDrag = (position: TSliderPos): void => {},
	onDragEnd = (position: TSliderPos): void => {},
	style = {}
}) => {
	const points = [
		[0, height / 2],
		[getPosFromValue(value, width, min, max), height / 2],
		[width, height / 2]
	];

	const handleDragStart = () => {
		const [, y] = getEventCoords(width, height);
		const value = getValueFromPos(points[1][0], width, min, max);

		onDragStart([getSteppedValue(value, step), getNormalizedOffset(y, height)]);
	};

	const handleDrag = () => {
		const [x, y] = getEventCoords(width, height);
		const value = getValueFromPos(points[1][0], width, min, max);

		event.subject[0] = x;
		event.subject[1] = y;

		onDrag([getSteppedValue(value, step), getNormalizedOffset(y, height)]);
		update();
	};

	const handleDragEnd = () => {
		const [, y] = getEventCoords(width, height);
		const value = getValueFromPos(points[1][0], width, min, max);

		onDragEnd([getSteppedValue(value, step), getNormalizedOffset(y, height)]);

		points[1][1] = height / 2;
		update();
	};

	const draw = () => {
		const svg = select(`#${id}-container`)
			.attr("viewBox", `0, 0, ${width}, ${height}`)
			.call(
				drag()
					.subject(getDragTarget)
					.on("start", handleDragStart)
					.on("drag", handleDrag)
					.on("end", handleDragEnd) as any
			);

		svg
			.append("path")
			.datum(points)
			.attr("class", "rubber-slider-track")
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 3)
			.call(update);
	};

	const update = () => {
		onChange(getSteppedValue(getValueFromPos(points[1][0], width, min, max), step));

		// don't apply svg transitions during testing
		// https://github.com/d3/d3/issues/1545
		if (process.env.NODE_ENV === "testing") return;

		const svg = select(`#${id}-container`);

		svg
			.select("path")
			.transition()
			.duration(easeDuration)
			.ease(easeFunction)
			.attr("d", line().curve(curveCatmullRom) as any);

		const circle = svg.selectAll("g").data([points[1]], (d) => d as string);

		circle
			.enter()
			.append("g")
			.call((g) => {
				g.append("circle")
					.attr("r", 20)
					.attr("stroke-width", 3)
					.attr("fill", "none")
					.attr("class", "rubber-slider-handle");
			})
			.merge(circle as any)
			.transition()
			.duration(easeDuration)
			.ease(easeFunction)
			.attr("transform", (d) => `translate(${d})`);

		circle.exit().remove();
	};

	const handleChange = (value: number) => {
		onChange(value);

		const svg = select(`#${id}-container`);
		const circle = svg.selectAll("g").data([points[1]], (d) => d as string);

		circle
			.enter()
			.append("g")
			.call((g) => {
				g.append("circle")
					.attr("r", 20)
					.attr("stroke-width", 3)
					.attr("fill", "none")
					.attr("class", "rubber-slider-handle");
			})
			.merge(circle as any)
			.attr("transform", (d) => `translate(${d})`);

		circle.exit().remove();
	};

	useEffect(() => {
		draw();
		update();
	}, []);

	return (
		<SliderInput
			name={name}
			value={value}
			onChange={handleChange}
			min={min}
			max={max}
			step={step}
			className={`rubber-slider-input ${className}`}
			style={{ ...style, width }}
		>
			<SliderTrack className="rubber-slider-pseudo-track">
				<SliderHandle className="rubber-slider-pseudo-handle" />
				<svg id={`${id}-container`} className="rubber-slider" aria-hidden />
			</SliderTrack>
		</SliderInput>
	);
};
