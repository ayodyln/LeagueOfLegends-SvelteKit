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

