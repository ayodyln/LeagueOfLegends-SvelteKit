<script lang="ts">
	export let champ: any, buttonHndlr: any

	// Champion Splash Card Button
</script>

<button
	data-id={champ.id}
	on:click={buttonHndlr}
	class="avatar w-[19%] hover:ring hover:ring-2 rounded-xl overflow-hidden">
	<div class="w-full pointer-events-none">
		<img
			src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/${champ.id}.png`}
			alt={champ.name} />
	</div>
</button>

<!-- {
    "version": "13.7.1",
    "id": "Thresh",
    "key": "412",
    "name": "Thresh",
    "title": "the Chain Warden",
    "blurb": "Sadistic and cunning, Thresh is an ambitious and restless spirit of the Shadow Isles. Once the custodian of countless arcane secrets, he was undone by a power greater than life or death, and now sustains himself by tormenting and breaking others with...",
    "info": {
        "attack": 5,
        "defense": 6,
        "magic": 6,
        "difficulty": 7
    },
    "image": {
        "full": "Thresh.png",
        "sprite": "champion4.png",
        "group": "champion",
        "x": 0,
        "y": 48,
        "w": 48,
        "h": 48
    },
    "tags": [
        "Support",
        "Fighter"
    ],
    "partype": "Mana",
    "stats": {
        "hp": 600,
        "hpperlevel": 120,
        "mp": 274,
        "mpperlevel": 44,
        "movespeed": 330,
        "armor": 28,
        "armorperlevel": 0,
        "spellblock": 30,
        "spellblockperlevel": 1.3,
        "attackrange": 450,
        "hpregen": 7,
        "hpregenperlevel": 0.55,
        "mpregen": 6,
        "mpregenperlevel": 0.8,
        "crit": 0,
        "critperlevel": 0,
        "attackdamage": 56,
        "attackdamageperlevel": 2.2,
        "attackspeedperlevel": 3.5,
        "attackspeed": 0.625
    }
} -->
