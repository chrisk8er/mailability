import _ from 'lodash';

export const isMouseEvent = (event: MouseEvent | TouchEvent): event is MouseEvent =>
	!!(event.type.indexOf('mouse') !== -1);

export const isReactMouseEvent = (
	event: React.TouchEvent | React.MouseEvent,
): event is React.MouseEvent => !!(event.type.indexOf('mouse') !== -1);

export const isElement = (event: HTMLElement | ChildNode): event is HTMLElement =>
	!!(event as HTMLElement).tagName;

export type FilterType<T, K> = {
	[P in keyof T]: T[P] extends K ? P : never;
}[keyof T];
