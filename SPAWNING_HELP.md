### Spawn Types and how they work
So when making a guide, and looking at others for how they work, you have probably noticed objects with a type called "spawn" with a function and arguments.
Yeah, those can be a bit confusing.<br>
<br>
Below are a list of the types of spawning you can do, their types and how their args array works. <br>
I'd recommend you play around with these yourself for a better understanding as they may be a bit confusing.

## **Circle**
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
	args: [false, 553, 0, 0, 10, 200, 5700]
}
```

## **Semi-Circle**
**Type:** "spawn"<br>
**Function:** "semi"

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
{
	type: "spawn",
	function: "semi",
	args: [false, 553, 0, 0, 10, 200, 5700]
}
```

## **Marker**
**Type:** "spawn"<br>
**Function:** "semi"

Position | Type | Name | Description
--- | --- | --- | ---
1st | **Boolean** | Target | I don't know, just leave it as false ¯\\\_(ツ)\_/¯
2nd | **Number** | Offset Angle | Between -180 and 180 are where you should keep this. With 0 being the front of the boss and both 180s being directly behind it.
3rd | **Number** | Offset Distance | Positive Numbers are forwards, negatives are backwards
4th | **Number** | Duration | How long in milliseconds until the item is despawned.
5th | **Boolean** | Highlight | Whether or not the marker will have a beacon beam
6th | **Array** | Label | First Item in the array is the Title, 2nd Item appears on the sign.<br>Setting this as null will default to both being "Safe Zone"

**Example:**
```js
{
	type: "spawn",
	function: "marker",
	args: [ false, 0, 90, 200, true, ["Hello", "Player"]]
}
```

## **Point**
**Type:** "spawn"<br>
**Function:** "point"

Position | Type | Name | Description
--- | --- | --- | ---
1st | **Number** | Item ID | The ID of the thing you're going to spawn, honestly 553 is probably the best thing you can use.
2nd | **Number** | Offset Angle | Between -180 and 180 are where you should keep this. With 0 being the front of the boss and both 180s being directly behind it.
3rd | **Number** | Offset Distance | Positive Numbers are forwards, negatives are backwards
4th | **Number** | Duration | How long in milliseconds until the item is despawned.


**Example:**
```js
{
	type: "spawn",
	function: "point",
	args: [ 553, 0, 200, 8000 ]
}
```

## **Vector**
**Type:** "spawn"<br>
**Function:** "vector"

Position | Type | Name | Description
--- | --- | --- | ---
2nd | **Number** | Item ID | The ID of the thing you're going to spawn, honestly 553 is probably the best thing you can use.
3rd | **Number** | Offset Angle | Between -180 and 180 are where you should keep this. With 0 being the front of the boss and both 180s being directly behind it.
4th | **Number** | Offset Distance | Positive Numbers are forwards, negatives are backwards
5th | **Number** | Direction | The direction that the vector will go in (start point is based on the Offset Angle and Offset Distance)
6th | **Number** | Length | The length of the vector (start point is based on the Offset Angle and Offset Distance)
7th | **Number** | Duration | How long in milliseconds until the items are despawned.

**Example:**
```js
{
	type: "spawn",
	function: "vector",
	args: [553, 90, 200, -90, 200, 3000]
}
```
