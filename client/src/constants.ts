export type BlockType = BasicType;

export enum BasicType {
	PAGE = 'page',
	SECTION = 'section',
	COLUMN = 'column',
	TEXT = 'text',
	IMAGE = 'image',
	DIVIDER = 'divider',
	SPACER = 'spacer',
	BUTTON = 'button',
	WRAPPER = 'wrapper',
}

export const DRAG_HOVER_CLASSNAME = 'block-dragover';
export const DRAG_TANGENT_CLASSNAME = 'block-tangent';
export const BLOCK_SELECTED_CLASSNAME = 'block-selected';
