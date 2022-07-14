# tsunami

![tsunami logo](https://github.com/LeRedditBro/tsunami/blob/main/images/tsunami.svg)

<p>
<img src="https://img.shields.io/bundlephobia/min/@sgty/tsunami"/>
</p>

An un-opinionated extensible javascript wave function collapse headless logic library

currently supports only 2D matrices, but feel free to look at the source code and use the 2D folder as a recipe, the base Formation classes are written as generically as possible while encapsulating the core logic required for collapsing

## Installation

**npm:**

```bash
npm install @sgty/tsunami
```

**yarn:**

```bash
yarn add @sgty/tsunami
```

**pnpm:**

```bash
pnpm add @sgty/tsunami
```

## Usage

you can use one of the supplied formation out of the box
or extend the base to your liking

```ts
import { Matrix2D, TilePossibility, Tile, Directions2D } from '@sgty/tsunami';

class MyTile extends TilePossibility {
	tags: any[] = [];
	color: number = 0xffffff;
	texture: string | undefined = undefined;
	rotation: number = 0;
}

export const DIRECTIONS = new Directions2D();

const possibilities = [
	// T shaped tile
	...[0, 1, 2, 3]
		.map((rot) => DIRECTIONS.rotate(rot))
		.map(
			(relativeDirections, index) =>
				new (class extends MyTile {
					texture = 't.png';
					tags = [
						relativeDirections.LEFT,
						relativeDirections.DOWN,
						relativeDirections.RIGHT,
					];
					rotation = index * 90;

					isProbable({ formation: matrix, item: tile }) {
						return (
							matrix.get(
								tile.position.add(relativeDirections.DOWN)
							).tags.includes[relativeDirections.UP] &&
							matrix.get(
								tile.position.add(relativeDirections.LEFT)
							).tags.includes[relativeDirections.RIGHT] &&
							matrix.get(
								tile.position.add(relativeDirections.RIGHT)
							).tags.includes[relativeDirections.LEFT] &&
							!matrix.get(
								tile.position.add(relativeDirections.UP)
							).tags.includes[relativeDirections.DOWN]
						);
					}
				})()
		),
];

const mat = new Matrix2D({
	width: 200,
	height: 200,
	possibilities,

	// here you can replace Tile with a custom class to handle binding to render objects
	createItem: (position) => new Tile(position),
});

// collapse one
mat.collapse();

mat.collapseAll();

mat.expand({ top: 100, left: 20, bottom: 10 });

mat.collapseAll();
```
