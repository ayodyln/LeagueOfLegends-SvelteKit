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
