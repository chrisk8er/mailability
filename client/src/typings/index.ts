import { IPage } from '../blocks/page';
import { BlockType } from '../constants';

export interface IBlock<T extends IBlockData = IBlockData> {
	name: string;
	type: BlockType;
	Panel: () => React.ReactNode;
	createInstance: (payload?: RecursivePartial<T>) => T;
	validParentType: BlockType[];
	transform?: (data: IBlockData, idx?: string) => IBlockData;
}

export interface IBlockData<K extends { [key: string]: any } = any, T extends any = any> {
	type: string;
	data: {
		value: T;
		hidden?: boolean;
		shadow?: boolean;
	};
	attributes: K;
	children: IBlockData[];
}

export interface IEmailTemplate {
	content: IPage;
	title: string;
}

export interface CreateInstance<T extends any = any> {
	(payload?: RecursivePartial<T>): T;
}

export type RecursivePartial<T> = {
	[P in keyof T]?: T[P] extends (infer U)[]
		? RecursivePartial<U>[]
		: T[P] extends object
		? RecursivePartial<T[P]>
		: T[P];
};
