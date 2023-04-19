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

