import { json, error } from '@sveltejs/kit'
// https://developer.riotgames.com/docs/lol

export const GET = async () => {
	const res = await getLeagueData()

	return json(res)
}

const getLeagueData = async () => {
	let champions, items, summoners

	// Get Champions
	try {
		const champs = await fetch(
			'http://ddragon.leagueoflegends.com/cdn/13.7.1/data/en_US/champion.json'
		)
		champions = await champs.json()
	} catch (err) {
		throw error(502, 'No Champions Found')
	}

	// Get Items
	try {
		const itemRequest = await fetch(
			'http://ddragon.leagueoflegends.com/cdn/13.7.1/data/en_US/item.json'
		)
		items = await itemRequest.json()
	} catch (err) {
		throw error(502, 'No Items Found')
	}

	// Get Summoners
	try {
		const summonerSpells = await fetch(
			'http://ddragon.leagueoflegends.com/cdn/13.7.1/data/en_US/summoner.json'
		)
		summoners = await summonerSpells.json()
	} catch (err) {
		throw error(502, 'No Summer Spells Found')
	}

	return { champions, items, summoners }
}
