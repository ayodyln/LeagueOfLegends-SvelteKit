import { random } from 'underscore'

export const recentChampions = async (championData: any) => {
	championData.data = Array.from(Object.values(championData.data))
	championData.recents = championData.data.filter((champ: { id: string }) => {
		if (
			champ.id === 'Milio' ||
			champ.id === `KSante` ||
			champ.id === 'Nilah' ||
			champ.id === 'Belveth' ||
			champ.id === 'Zeri' ||
			champ.id === 'Vex'
		)
			return champ
	})

	return championData
}

// Fetch Champions
export const leagueChampions = async () => {
	try {
		const leagueData = await fetch('api/riot')
		return await leagueData.json()
	} catch (error) {
		console.log(error)
		return []
	}
}

export const getRandomIconImage = async () => {
	try {
		const randomIcon = await fetch(
			'https://ddragon.leagueoflegends.com/cdn/13.8.1/data/en_US/profileicon.json'
		)
		const icons = await randomIcon.json()
		const iconArray = Object.values(icons.data)
		const chosenIndex = random(0, iconArray.length)
		return iconArray[chosenIndex]
	} catch (error) {
		console.log(error)
	}
}

export const colorBadgeHandler = (tag: string) => {
	switch (tag) {
		case 'Fighter':
			return 'badge-error'
		case 'Tank':
			return 'badge-info'
		case 'Mage':
			return 'badge-primary'
		case 'Assassin':
			return 'badge-warning'
		case 'Marksman':
			return 'badge-secondary'
		case 'Support':
			return 'badge-success'
		default:
			return ''
	}
}

export const recommendedItems = (type: any) => {
	const suggestedTags = [
		...new Set(
			type
				.map((tag: string) => {
					switch (tag) {
						case 'Fighter':
							return [
								'Boots',
								'Armor',
								'LifeSteal',
								'SpellVamp',
								'Jungle',
								'Damage',
								'AttackSpeed',
								'OnHit',
								'Trinket',
								'Vision',
								'Tenacity',
								'Lane',
								'Consumable'
							]

						case 'Tank':
							return [
								'Boots',
								'ManaRegen',
								'HealthRegen',
								'Health',
								'Mana',
								'Armor',
								'SpellBlock',
								'Jungle',
								'Lane',
								'Trinket',
								'Vision',
								'AbilityHaste',
								'Tenacity',
								'MagicResist',
								'Consumable'
							]

						case 'Mage':
							return [
								'Boots',
								'ManaRegen',
								'SpellDamage',
								'SpellBlock',
								'Damage',
								'AbilityHaste',
								'Lane',
								'Trinket',
								'Vision',
								'Consumable',
								'Aura',
								'Slow',
								'MagicPenetration',
								'SpellVamp'
							]

						case 'Assassin':
							return [
								'Boots',
								'CriticalStrike',
								'Armor',
								'Mana',
								'SpellBlock',
								'SpelLVamp',
								'Jungle',
								'AbilityHaste',
								'CooldownReduction',
								'OnHit',
								'MagicResist',
								'ArmorPenetration',
								'MagicPenetration'
							]

						case 'Marksman':
							return [
								'Boots',
								'ManaRegen',
								'CriticalStrike',
								'Mana',
								'LifeSteal',
								'Damage',
								'Lane',
								'AttackSpeed',
								'OnHit',
								'Trinket',
								'Consumable',
								'Vision',
								'ArmorPenetration'
							]

						case 'Support':
							return [
								'Boots',
								'ManaRegen',
								'HealthRegen',
								'Health',
								'Mana',
								'Armor',
								'SpellBlock',
								'Lane',
								'Trinket',
								'Vision',
								'AbilityHaste',
								'GoldPer',
								'Slow',
								'Aura',
								'MagicResist'
							]

						default:
							return []
					}
				})
				.flat()
		)
	]

	return suggestedTags
}

export const mythicItems = [
	`Crown of the Shattered Queen`,
	`Divine Sunderer`,
	`Duskblade of Draktharr`,
	`Eclipse`,
	`Evenshroud`,
	`Everfrost`,
	`Galeforce`,
	`Goredrinker`,
	`Heartsteel`,
	`Hextech Rocketbelt`,
	`Iceborn Gauntlet`,
	`Immortal Shieldbow`,
	`Imperial Mandate`,
	`Jak'Sho, The Protean`,
	`Kraken Slayer`,
	`Liandry's Anguish`,
	`Locket of the Iron Solari`,
	`Luden's Tempest`,
	`Moonstone Renewer`,
	`Night Harvester`,
	`Prowler's Claw`,
	`Radiant Virtue`,
	`Riftmaker`,
	`Rod of Ages`,
	`Shurelya's Battlesong`,
	`Stridebreaker`,
	`Trinity Force`
]

export const legendaryItems = [
	'Abyssal Mask',
	"Anathema's Chains",
	"Archangel's Staff",
	'Ardent Censer',
	'Axiom Arc',
	"Banshee's Veil",
	'Black Cleaver',
	'Black Mist Scythe',
	'Blade of the Ruined King',
	'Bloodthirster',
	'Bulwark of the Mountain',
	'Chempunk Chainsword',
	'Chemtech Putrifier',
	'Cosmic Drive',
	"Dead Man's Plate",
	"Death's Dance",
	'Demonic Embrace',
	'Edge of Night',
	'Essence Reaver',
	'Fimbulwinter',
	'Force of Nature',
	'Frozen Heart',
	'Gargoyle Stoneplate',
	'Guardian Angel',
	"Guinsoo's Rageblade",
	'Horizon Focus',
	'Hullbreaker',
	'Infinity Edge',
	"Knight's Vow",
	'Lich Bane',
	"Lord Dominik's Regards",
	'Manamune',
	'Maw of Malmortius',
	"Mejai's Soulstealer",
	'Mercurial Scimitar',
	"Mikael's Blessing",
	'Morellonomicon',
	'Mortal Reminder',
	'Muramana',
	"Nashor's Tooth",
	'Navori Quickblades',
	'Pauldrons of Whiterock',
	'Phantom Dancer',
	"Rabadon's Deathcap",
	"Randuin's Omen",
	'Rapid Firecannon',
	'Ravenous Hydra',
	'Redemption',
	"Runaan's Hurricane",
	"Rylai's Crystal Scepter",
	"Seraph's Embrace",
	"Serpent's Fang",
	"Serylda's Grudge",
	'Shadowflame',
	'Shard of True Ice',
	'Silvermere Dawn',
	'Spear of Shojin',
	'Spirit Visage',
	'Staff of Flowing Water',
	"Sterak's Gage",
	'Stormrazor',
	'Sunfire Aegis',
	'The Collector',
	'Thornmail',
	'Titanic Hydra',
	'Turbo Chemtank',
	'Umbral Glaive',
	'Vigilant Wardstone',
	'Void Staff',
	"Warmog's Armor",
	"Winter's Approach",
	"Wit's End",
	"Youmuu's Ghostblade",
	"Zeke's Convergence",
	"Zhonya's Hourglass"
]
