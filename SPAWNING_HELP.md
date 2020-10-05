### Spawn Types and how they work
So when making a guide, and looking at others for how they work, you have probably noticed objects with a type called "spawn" with a function and arguments.
Yeah, those can be a bit confusing.<br>
<br>
Below are a list of the types of spawning you can do, their types and how their args array works.

## Circle
**Type:** "spawn"<br>
**Function:** "circle"

Position | Type | Name | Description
--- | --- | --- | ---
1st | **Boolean** | Target | I don't know, just leave it as false ¯\\\_(ツ)\_/¯
2nd | **Number** | Item ID | The ID of the thing you're going to spawn, honestly 553 is probably the best thing you can use.
3rd | **Number** | Offset Angle | Between -180 and 180 are where you should keep this. With 0 being the front of the boss and both 180s being directly behind it.
4th | **Number** | Offset Distance | Positive Numbers are forwards, negatives are backwards
5th | **Number** | Interval | The distance between the items that will be spawned. The lower this is, the more items that will be spawned. Just leave it at 10, 10 is good.
6th | **Number** | Radius | The size of the circle, no clue what happens if you put negative number in here, why don't you find out?
7th | **Number** | Duration | How long in milliseconds until the items are despawned.

**Example:**
```js
{ type: "spawn",
	function: "circle",
	args: [
		false, 	// Target
		553, 	  // Item ID
		0, 		// Offset Angle
		0, 		// Offset Distance
		10,		// Interval
		200,	   // Radius
		5700	   // The Duration
	]
}
```

## Semi-Circle
**Type:** "Spawn"<br>
**Function:** "semi"

Position | Type | Name | Description
--- | --- | --- | ---
1st | **Boolean** | Target | I don't know, just leave it as false ¯\\\_(ツ)\_/¯
2nd | **Number** | Item ID | The ID of the thing you're going to spawn, honestly 553 is probably the best thing you can use.
3rd | **Number** | Offset Angle | Between -180 and 180 are where you should keep this. With 0 being the front of the boss and both 180s being directly behind it.
4th | **Number** | Offset Distance | Positive Numbers are forwards, negatives are backwards
5th | **Number** | Interval | The distance between the items that will be spawned. The lower this is, the more items that will be spawned. Just leave it at 10, 10 is good.
7th | **Number** | Duration | How long in milliseconds until the items are despawned.

## Marker


## Point


## Vector


## Object


## Item
