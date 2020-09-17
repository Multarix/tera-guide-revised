# **Tera Guide**
A more organized version of the tera-guide by [HSDN](https://github.com/HSDN)<br>
<br>
This module requires the library module found <u>**[HERE](https://github.com/tera-toolbox-mods/library)**</u><br>
Extract to "mods" folder in tera-toolbox<br>
<u>**MAKE SURE IT'S NAMED "library" NOT "library-master"**</u>

### **Why use this one and not the one by HSDN?**
This has a few changes from the original and in my opinion, much cleaner code.<br>
There are also several features that I found to be unneeded that I have removed such as:
- No multi-language translations
- No GUI
- No built-in debugging (This will be a separate module)
- No different colored on-screen notices
- No sending messages to party members (Why would you even want this lol?)
- A few other things here and there

### **Chat commands**
Toolbox(/8) | Command description
--- | ---
**guide** | Displays the current settings
**guide toggle** | Enables/ disables the guide
**guide tts** | Enables/ disables text-to-speech
**guide notice** | Enables/ disables sending the message to party/ raid notice chat
**guide verbose \<id\>** | Enables or disables a specific dungeon guide.<br>*The ID for the dungeons are listed below*<br><br>**example:** *guide verbose 9739*
**guide objects \<id\>** | Enables or disables the spawning of objects for a specific dungeon guide.<br>*The ID for the dungeons are listed below*<br><br>**example:** *guide objects 9739*
**guide test \<key\>** | Allows you to test a key of a guide, you need to be inside the dungeon for the key to work.<br><br>**example:** *guide test s-739-2000-113-0*

### **Currently Supported Dungeons**

ID | Dungeon name
--- | ---
3023 | Akalath Quarantine
3102 | Draakon Arena
3202 | Draakon Arena (Hard)
3201 | Gossamer Vault (Hard)
9053 | Kezzel's Gorge
9735 | RK-9 Kennel
9739 | Red Refuge

#### **Upcoming Supported Dungeons**

ID | Dungeon name
--- | ---
9920 | Antaroth's Abyss (Hard)
9044 | Bahaar's Sanctum
3026 | Corrupted Skynest
3126 | Corrupted Skynest (Hard)
3027 | Forbidden Arena [Hagufna]
3103 | Forbidden Arena [Undying Warlord]
3203 | Forbidden Arena [Nightmare Undying Warlord]
9982 | Grotto of Lost Souls (Hard)
3034 | RK-9 Kennel (Hard)
3020 | Sea of Honor
9781 | Velik's Sanctuary

### **Translations**
So given that I don't have any plans to add any multi-language translations into a single guide, feel free to make a fork of this guide and translate into your own language. Let me know and I'll add a link to your guide down here.

## **Q&A**
**Q: Will this version make me lag like HSDN's version does?**<br>
A: No idea, I don't get any lag with HSDN's guide, perhaps it's just that your computer is garbage and you should upgrade it? This really isn't my concern nor my problem. I've taken steps to ensure there should be nothing that causes any lag, as has HSDN with his version. Stop using a potato as a PC.<br>
<br>
**Q: Can you add x feature, I think it would be good!**<br>
A: Short answer: No.<br>
Long answer, still probably no, I have no reason to add things that probably won't see much use if at all. If you think it's super duper amazing and everyone is totally going to use it, [open a ticket](https://github.com/Multarix/tera-guide-custom/issues) and ask. If the answer is still no, there is nothing stopping you from making a fork and adding it yourself.<br>
<br>
**Q: I've looked at some of the code, it looks like you stole some of it from HSDN!**<br>
A: First off, HSDN's guide uses an [MIT License](https://en.wikipedia.org/wiki/MIT_License), which means I'm free to use the code as I wish. Secondary, yes I have used some of HSDN's code, and of course given the nature of making a module that does roughly the same thing, it's fairly likely that there will be code similarities.<br>
<br>
