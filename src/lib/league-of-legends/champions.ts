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
			'http://ddragon.leagueoflegends.com/cdn/13.8.1/data/en_US/profileicon.json'
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
	switch (type) {
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
}

// ;[
// 	'Boots',
// 	'ManaRegen',
// 	'HealthRegen',
// 	'Health',
// 	'CriticalStrike',
// 	'SpellDamage',
// 	'Mana',
// 	'Armor',
// 	'SpellBlock',
// 	'LifeSteal',
// 	'SpellVamp',
// 	'Jungle',
// 	'Damage',
// 	'Lane',
// 	'AttackSpeed',
// 	'OnHit',
// 	'Trinket',
// 	'Active',
// 	'Consumable',
// 	'Stealth',
// 	'Vision',
// 	'CooldownReduction',
// 	'NonbootsMovement',
// 	'AbilityHaste',
// 	'Tenacity',
// 	'MagicPenetration',
// 	'ArmorPenetration',
// 	'Aura',
// 	'Slow',
// 	'GoldPer',
// 	'MagicResist'
// ]
