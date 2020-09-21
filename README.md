# **Tera Guide**
A more organized/ cleaner version of the [tera-guide by HSDN](https://github.com/hsdn/tera-guide)<br>
It has been mostly re-written and should be more efficient and the code should be much more readable<br>
<br>
This module requires the library module found <u>**[HERE](https://github.com/tera-toolbox-mods/library)**</u><br>
Extract to "mods" folder in tera-toolbox<br>
<u>**MAKE SURE IT'S NAMED "library" NOT "library-master"**</u>

## **This module is a work in progress**
Things may be broken, things may not work correctly or they may work flawlessly... If you wish to help development, open a new issue with any errors/ bugs you encounter.

### **Why use this one and not the one by HSDN?**
This has a few changes from the original and in my opinion, much cleaner code.<br>
There are also several features that I found to be unneeded that I have removed such as:
- No GUI
- No multi-language translations
- No multi-colored on-screen notices
- No sending messages to party members (Why would you even want this lol?)
- A few other things here and there

## **Chat commands**

<table>
	<tr>
		<th>Toolbox(/8)</th>
		<th>Command description</th>
	</tr>
	<tr>
		<td><b>guide</b></td>
		<td>Displays the current settings</td>
	</tr>
	<tr>
		<td><b>guide help</b></td>
		<td>Displays a list of all the chat commands</td>
	</tr>
	<tr>
		<td><b>guide toggle</b></td>
		<td>Enables/ disables the guide</td>
	</tr>
	<tr>
		<td><b>guide notice</b></td>
		<td>Enables/ disables sending the message to party/ raid notice chat</td>
	</tr>
	<tr>
		<td><b>guide tts</b></td>
		<td>Enables/ disables text-to-speech</td>
	</tr>
	<tr>
		<td><b>guide debug [arg]</b></td>
		<td>
			Allows you to turn on the debugging of keys being sent.<br>
			Available arguments are:
			<table>
				<tr>
					<th>Argument</th>
					<th>Description</th>
				</tr>
				<tr>
					<td>abnormal</td>
					<td>Enables debugging of buffs & debuff events</td>
				</tr>
				<tr>
					<td>skill</td>
					<td>Enables debugging of mob skill events</td>
				</tr>
				<tr>
					<td>hp</td>
					<td>Enables debugging of mob hp events</td>
				</tr>
				<tr>
					<td>dm</td>
					<td>Enables debugging of dungeon message events</td>
				</tr>
				<tr>
					<td>qb</td>
					<td>Enables debugging of quest balloon events</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td><b>guide verbose [id]</b></td>
		<td>Enables or disables a specific dungeon guide.<br>
		<i>The ID for the dungeons are listed below</i><br>
		<br>
		<b>example:</b> <i>guide verbose 9739</i></td>
	</tr>
	<tr>
		<td><b>guide objects [id]</b></td>
		<td>Enables or disables the spawning of objects for a specific dungeon guide.<br>
		<i>The ID for the dungeons are listed below</i><br>
		<br>
		<b>example:</b> <i>guide objects 9739</i></td>
	</tr>
	<tr>
		<td><b>guide test [key]</b></td>
		<td>Allows you to test a key of a guide, you need to be inside the dungeon for the key to work.<br>
		<br>
		<b>example:</b> <i>guide test s-739-2000-113-0</i></td>
	</tr>
</table>

## **Currently Supported Dungeons**

ID | Dungeon name
--- | ---
3023 | Akalath Quarantine
9720 | Antaroth's Abyss
9920 | Antaroth's Abyss (Hard)
9044 | Bahaar's Sanctum
3102 | Draakon Arena
3202 | Draakon Arena (Hard)
3027 | Forbidden Arena [Hagufna]
3103 | Forbidden Arena [Undying Warlord]
3203 | Forbidden Arena [Nightmare Undying Warlord]
3201 | Gossamer Vault (Hard)
9982 | Grotto of Lost Souls (Hard)
9053 | Kezzel's Gorge
9735 | RK-9 Kennel
9739 | Red Refuge
9781 | Velik's Sanctuary

#### **Upcoming Dungeons Support**

ID | Dungeon name
--- | ---
3026 | Corrupted Skynest
3126 | Corrupted Skynest (Hard)
3034 | RK-9 Kennel (Hard)
3020 | Sea of Honor


## **Translations**
So given that I don't have any plans to add any multi-language translations into a single guide, feel free to make a fork of this guide and translate into your own language. Let me know and I'll add a link to your guide down here.

## **Q&A**
#### **Will this version make me lag like HSDN's version does?**<br>
No idea, I don't get any lag with HSDN's guide.<br>
Perhaps it's just that your computer is garbage and you should upgrade it?<br>
Maybe it's just toolbox itself has potato code for handling events and hooks?<br>
<br>
As for logical reasons as to why you might have lag, unlike many other mods, events and hooks are triggered a large amount of times, I've done my best to stop processing invalid events as early as possible, so it should be somewhat lower than it could be.
Furthermore, the hooks should unhook themselves upon loading into a non-dungeon area, preventing them from triggering at all*.<br>
<br>
It's likely the real source of any lag comes from how Toolbox handles events and hooks to begin with.<br>
I haven't bothered to look at toolboxes code, but then again the dev of toolbox doesn't bother to look at other peoples code and tell them how to fix it, rather just says it's shit code and they're too busy. You can always ask them to try and improve its performance, but they'll probably just tell you to remove this module ¯\\\_(ツ)\_/¯<br>

<i>\*Given the complete lack of documentation available for toolbox module development, if it doesn't work, blame toolbox's lack of documentation</i>
#### **Can you add x feature, I think it would be good!**<br>
Short answer: No.<br>
Long answer, still probably no, I have no reason to add things that probably won't see much use if at all. If you think it's super duper amazing and everyone is totally going to use it, [open a ticket](https://github.com/Multarix/tera-guide-custom/issues) and ask. If the answer is still no, there is nothing stopping you from making a fork and adding it yourself.<br>
#### **I've looked at some of the code, it looks like you stole some of it from HSDN!**<br>
First off, HSDN's guide uses an [MIT License](https://en.wikipedia.org/wiki/MIT_License), which means I'm free to use the code as I wish. Secondary, yes I have used some of HSDN's code, and of course given the nature of making a module that does roughly the same thing, it's fairly likely that there will be code similarities.<br>
