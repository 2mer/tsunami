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

## Core concepts

tsunami exposes the following entities

-   `Formation`
-   `FormationItem`
-   `FormationProbability`

### Formation

A collection of `FormationItem`s

handles: - storage, structure, and acquisition of `FormationItem`s

### FormationItem

A entry in the `Formation`, contains all of the probabilities of that 'slot' in the formation

handles: - item lifecycle - calculation of probabilities - bindings to rendering library

### FormationProbability

A possible solution to the `FormationItem` slot
handles: - validity of the solution - item/rendition data

the `Formation` contains many slots - `FormationItem` which have many possible solutions - `FormationProbability`

## Usage

Feel free to take a look at this project as an implementation recipe

[Wavebox - wave function collapse sandbox](https://github.com/LeRedditBro/wavebox)

you can use one of the supplied formation out of the box
or extend the base to your liking

**Creating formations:**

```ts
const mat = new Matrix2D({
	width: 200,
	height: 200,
	probabilities: [...],
	createTile: (position) => ...,
});
```

**Creating custom formations:**

incase you need a formation more attuned to a different data structure, you can look at the code of `Matrix2D`, and reference it as a recipe for your data structure, extension is not difficult, as `Matrix2D` is itself an extension of the base `Formation` class

**Creating formation items:**

example using PIXI.js

```ts
import { Tile, Matrix2D } from '@sgty/tsunami';
import { Container } from 'pixi.js';


class MyTile extends Tile {
	container;

	constructor(position, container) {
		super(position);

		this.container = container;
	}

	collapse(ctx) {
		super.collapse(ctx);

		if (this.collapsed) {
			this.container.addChild(this.collapsed.graphics)
		}
	}
}


const container = new Container();

const mat = new Matrix2D({
	...
	createTile: (position) => new MyTile(position, container),
});
```

**Creating tile probabilities:**

```ts
import { TileProbability } from '@sgty/tsunami';
import { Texture } from 'pixi.js';

class PixiTileProbability extends TileProbability {
	graphics = undefined;
	tags = [];
}

class RedTile extends PixiTileProbability {
	constructor(opts) {
		super(opts);

		this.graphics = new Sprite(Texture.WHITE);
		this.graphics.tint = 0xff0000;
		this.tags = ['red'];
	}
}

class BlueTile extends PixiTileProbability {
	constructor(opts) {
		super(opts);

		this.graphics = new Sprite(Texture.WHITE);
		this.graphics.tint = 0x0000ff;
		this.tags = ['blue'];
	}

	isProbable(ctx) {
		const { item: tile, formation: matrix } = ctx;
		const { position } = tile;

		const below = matrix.get(position.add(new Point(0, -1)));

		if (!below) return true;
		if (!below.collapsed) return true;
		if (!below.probabilities.length) return true;

		return !below.collapsed.tags.includes('red');
	}
}
```

define probabilities of formation (Matrix2D impl):

```ts
const mat = new Matrix2D({
	...
	probabilities: [
		new RedTile();
		new BlueTile();
	],
});
```

**Collapsing:**
now after we have set everything up we can start collapsing

```ts
const hasRemainingItemsToCollapse = mat.collapse();

// or

mat.collapseAll();
const stop = mat.collapseAll({
	step = 10, // amt to step per iter
	timeout = 0, // ms
});

stop();
```
