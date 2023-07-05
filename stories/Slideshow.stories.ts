import engine from './engine/liquidEngine';
import reduceToObject from './utils/reduceToObject';
import extractArgTypes from './utils/extractArgTypes';
import renderLiquid, { Args } from './utils/renderLiquid';
import convertControlType from './utils/typeConversion';
import { StoryObj } from '@storybook/web-components';
import { dataHolder } from './utils/dataHolder';

const liquidTemplate = `
{% render 'image-banner', name: name, section: section %}
`;
const template = engine.parse(liquidTemplate);
engine.renderSync(template);

let schema;

if (dataHolder[0]) {
	schema = JSON.parse(dataHolder[0].str);
}

if (schema) {
	let blocks = [ ...schema.blocks ];
	for (const block of blocks) {
		if (block.settings) {
			block.settings = reduceToObject(block.settings);
		}
	}

	let controls = JSON.parse(JSON.stringify(schema.settings));

	for (const control of controls) {
		control.type = convertControlType(control.type);
		delete control.default;
		delete control.label;
	}

	delete schema.presets;

	schema = {
		section: {
			id: schema.class,
			...schema,
			settings: reduceToObject(schema.settings),
			controls,
			blocks: [ ...blocks ]
		}
	};
}
const { flatContext, argTypes } = extractArgTypes(schema);

export default {
	title: 'Sections/Hero New',
	tags: [ 'autodocs' ],
	render: (args: Args) => renderLiquid(engine, template, args),
	argTypes: argTypes
};

export const HeroDefault: StoryObj = {
	args: {
		...flatContext
	}
};

export const ImageBanner: StoryObj = {
	args: {
		...flatContext,
		'section.blocks': [
			{
				type: 'heading',
				settings: {
					heading: 'Image banner',
					heading_size: 'h0'
				}
			},
			{
				type: 'text',
				settings: {
					text: 'Give customers details about the banner image(s) or content on the template.',
					text_style: 'body'
				}
			},
			{
				type: 'buttons',
				settings: {
					button_label_1: 'Shop all',
					button_link_1: 'shopify://collections/all',
					button_style_secondary_1: true,
					button_label_2: '',
					button_link_2: '',
					button_style_secondary_2: false
				}
			}
		]
	}
};
