// Gossamer Vault
//
// made by michengs
// Updated to revised version

module.exports = (mod, extras) => {
	return {
		// 1 BOSS
		// "s-3101-1000-121-0": [{ type: "text", position:"tank", message: "Right",  }],
		// "s-3101-1000-122-0": [{ type: "text", position:"tank", message: "Left",  }],
		"s-3101-1000-124-0": [{ type: "text", position: "tank", message: "Stun Attack" }],
		"s-3101-1000-127-0": [{ type: "text", position: "dps", message: "Back" },
			{ type: "text", position: "healer", message: "Back" }],
		// "s-3101-1000-128-0": [{ type: "text", position:"tank", message: "Triple Attack",  }],
		"s-3101-1000-131-0": [{ type: "text", position: "dps", message: "Ranged DPS attention" },
			{ type: "text", position: "healer", message: "Ranged DPS Attention" }],
		// "s-3101-1000-132-0": [{ type: "text", message: "Left + Right→",  }],
		"s-3101-1000-133-0": [{ type: "text", message: "Jump (Fast)" }],
		"s-3101-1000-138-0": [{ type: "text", message: "Jump P (Fast)" }],
		"s-3101-1000-139-0": [{ type: "text", message: "Back + Front (Fast)" }],
		// "s-3101-1000-141-0": [{ type: "text", position:"tank",  }],
		// "s-3101-1000-142-0": [{ type: "text", position:"tank",  }],
		"s-3101-1000-148-0": [{ type: "text", message: "Right Hand (Flying)" }],
		"s-3101-1000-149-0": [{ type: "text", message: "Left Hand (Flying)" }],
		"s-3101-1000-305-0": [{ type: "text", message: "Pizza" }],
		"s-3101-1000-313-0": [{ type: "text", message: "Circles (Slow)" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 75, 10, 300, 6000] }],
		// 2 BOSS
		// "s-3101-2000-101-0": [{ type: "text", position:"tank", message: "right left",  }],
		// "s-3101-2000-102-0": [{ type: "text", position:"tank", message: "left right",  }],
		// "s-3101-2000-103-0": [{ type: "text", position:"tank", message: "spin",  }],
		// "s-3101-2000-104-0": [{ type: "text", position:"tank", message: "right",  }],
		// "s-3101-2000-105-0": [{ type: "text", position:"tank", message: "front",  }],
		// "s-3101-2000-107-0": [{ type: "text", position:"tank", message: "left",  }],
		"s-3101-2000-108-0": [{ type: "text", message: "Back Attack!" }],
		// "s-3101-2000-109-0": [{ type: "text", position:"tank", message: "quaternion Attack",  }],
		// "s-3101-2000-110-0": [{ type: "text",  }],
		// "s-3101-2000-114-0": [{ type: "text",  }],
		// "s-3101-2000-116-0": [{ type: "text", message: "back",  }],
		"s-3101-2000-150-0": [{ type: "text", message: "Phantom" }],
		// "s-3101-2000-201-0": [{ type: "text", message: "back 8m",  }],
		// "s-3101-2000-202-0": [{ type: "text", message: "front 8m",  }],
		// "s-3101-2000-211-0": [{ type: "text", message: "front",  }],
		// "s-3101-2000-226-0": [{ type: "text",  }],
		"s-3101-2000-228-0": [{ type: "text", message: "Team Up" }],
		"s-3101-2000-230-0": [{ type: "text", message: "AOE" }],

		"s-3101-2000-231-0": [{ type: "text", message: "Out Safe" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 300, 3000] }],
		"s-3101-2000-232-0": [{ type: "text", message: "In Safe" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 300, 3000] },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 3, 875, 3000] }],
		"s-3101-2000-234-0": [{ type: "text", message: "Debuffs" }],
		"s-3101-2000-235-0": [{ type: "text", message: "Debuffs" }]
	};
};
