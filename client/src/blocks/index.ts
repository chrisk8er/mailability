import { Page } from './page';
import { Section } from './section';
import { Column } from './column';
import { Text } from './text';
import { Image } from './image';
import { Button } from './button';
import { Divider } from './divider';
import { Wrapper } from './wrapper';
import { Spacer } from './spacer';
import { IBlock } from '@/typings';
import { BlockType } from '@/constants';

const basicBlocks = {
	Page,
	Section,
	Column,
	Text,
	Image,
	Button,
	Divider,
	Wrapper,
	Spacer,
};

export class BlocksMap {
	static basicBlocksMap = basicBlocks;
	static externalBlocksMap: { [key: string]: IBlock } = {};

	static get getBlocks() {
		return [...Object.values(this.basicBlocksMap), ...Object.values(this.externalBlocksMap)];
	}

	static registerBlocks(blocksMap: { [key: string]: IBlock }) {
		Object.assign(this.externalBlocksMap, blocksMap);
	}

	static findBlockByType(type: string): IBlock {
		return this.getBlocks.find((child) => {
			return child?.type === type;
		});
	}

	static findBlocksByType(types: Array<BlockType>): IBlock[] {
		return types.map((item) => {
			const block = this.getBlocks.find((child) => {
				return child.type === item;
			});
			if (!block) {
				throw new Error(`Cannot find ${item}`);
			}
			return block;
		});
	}

	static getBlock<
		E extends { [key: string]: IBlock },
		B extends typeof BlocksMap.basicBlocksMap,
		A extends B & E,
		T extends keyof A,
	>(name: T): A[T] {
		const key: any = name;
		return this.basicBlocksMap[key] || this.externalBlocksMap[key];
	}
}
