"use client";

import React, { useCallback, useState } from "react";

/**
 * NextUI Components
 */
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Slider } from "@heroui/slider";

import AnimatedBeam from "../animata/background/animated-beam";

/**
 * Entities
 */
import { CallServiceMessage, Climate } from "@app/haProvider/entities";
import FluidTabs from "../animata/card/fluid-tabs";

/**
 * Component
 */
const PageContentWrapper = ({ components }) => {
	return (
		<div className="page-content-wrapper">
			<AnimatedBeam>
				<FluidTabs />
				{components.map((component, index) => (
					<React.Fragment key={index}>
						{component}
					</React.Fragment>
				))}
			</AnimatedBeam>
		</div>
	);
};

export default PageContentWrapper;
