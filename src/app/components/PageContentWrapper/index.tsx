"use client";

import React, { useCallback, useState } from "react";

/**
 * NextUI Components
 */
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Slider } from "@heroui/slider";

/**
 * Entities
 */
import { CallServiceMessage, Climate } from "@app/haProvider/entities";

/**
 * Component
 */
const PageContentWrapper = ({ components }) => {
	return (
		<div className="page-content-wrapper">
			{components.map((component, index) => (
				<div className="bg-gray-300 rounded-xl" key={index}>{component}</div>
			))}
		</div>
	);
};

export default PageContentWrapper;
