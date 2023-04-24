<script lang="ts">
	import { onMount } from 'svelte'

	import Stats from './Stats.svelte'

	export let selectedChampion: any, colorBadgeHandler: any

	onMount(() => {
		console.log(selectedChampion)
	})
</script>

<section id="champArt" class="">
	<div class="carousel h-[410px]">
		{#each selectedChampion.skins as skin, i}
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<div class="carousel-item h-auto w-full relative">
				<img
					id={`item${i}`}
					loading="lazy"
					class="w-full"
					src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${selectedChampion.id}_${skin.num}.jpg`}
					alt={skin.name} />
				{#if i !== 0}
					<span class="absolute z-1 bottom-0 left-0 bg-neutral bg-opacity-50 w-full p-2 font-bold"
						>{skin.name}</span>
				{/if}
			</div>
		{/each}
	</div>
	<div class="flex justify-center w-full py-1 gap-2">
		{#each selectedChampion.skins as skin, i}
			<a href="#item{i}" class="btn btn-xs btn-ghost">{i + 1}</a>
		{/each}
	</div>
</section>

<section class="p-2">
	<div class="flex justify-between items-center">
		<span>
			<h1 class="text-3xl font-bold">{selectedChampion.name}</h1>
			<h3 class="text-xs font-extralight capitalize">{selectedChampion.title}</h3>
		</span>

		<span class="flex gap-3">
			{#each selectedChampion.tags as tag}
				<div class="badge badge-outline badge-lg {colorBadgeHandler(tag)}">{tag}</div>
			{/each}
		</span>
	</div>

	<div class="divider m-0" />

	<div class="flex flex-col gap-4">
		<section id="baseStats" class="flex w-full justify-between">
			<Stats {selectedChampion} />
		</section>

		<section id="abilities" class="flex flex-wrap w-full gap-2">
			<h2 class="text-lg font-bold">Abilities</h2>
			<div class="w-full h-24 bg-neutral-focus rounded-lg flex">
				<div class="h-full rounded overflow-hidden">
					<img
						src="http://ddragon.leagueoflegends.com/cdn/13.8.1/img/passive/{selectedChampion.passive
							.image.full}"
						alt="Tailwind-CSS-Avatar-component"
						class="h-full" />
				</div>

				<div class="p-2 w-3/4">
					<p>Passive - {selectedChampion.passive.name}</p>

					<p class="text-xs">{selectedChampion.passive.description}</p>
				</div>
			</div>
			{#each selectedChampion.spells as spell}
				<div class="w-full h-24 bg-neutral-focus rounded-lg flex">
					<div class="h-full rounded overflow-hidden">
						<img
							src="http://ddragon.leagueoflegends.com/cdn/13.8.1/img/spell/{spell.image.full}"
							alt="Tailwind-CSS-Avatar-component"
							class="h-full" />
					</div>

					<div class="p-2 w-3/4">
						<p class="capitalize">{spell.id.slice(-1)} - {spell.name}</p>

						<p class="text-xs">{spell.description}</p>
					</div>
				</div>
			{/each}
		</section>

		<div id="lore" class="h-auto italic">
			<div class="divider h-0" />
			{selectedChampion.lore}
			<div class="divider h-0" />
		</div>

		<section id="tips" class="flex gap-2">
			<div id="ally" class="flex flex-col gap-2 w-1/2">
				<h2 class="text-success">Ally Tips</h2>
				{#each selectedChampion.allytips as tip}
					<span class="bg-base-100 rounded-lg p-4 border border-success">{tip}</span>
				{/each}
			</div>
			<div class="divider divider-horizontal m-0 w-1" />
			<div id="enemy" class="flex flex-col gap-2 w-1/2">
				<h2 class="text-error">Enemy Tips</h2>
				{#each selectedChampion.enemytips as tip}
					<span class="bg-base-100 rounded-lg p-4 border border-error">{tip}</span>
				{/each}
			</div>
		</section>
	</div>
</section>

<!-- {
    "spells": [
        {
            "id": "AatroxQ",
            "name": "The Darkin Blade",
            "description": "Aatrox slams his greatsword down, dealing physical damage. He can swing three times, each with a different area of effect.",
            "tooltip": "Aatrox slams his greatsword, dealing <physicalDamage>{{ qdamage }} physical damage</physicalDamage>. If they are hit on the edge, they are briefly <status>Knocked Up</status> and they take <physicalDamage>{{ qedgedamage }}</physicalDamage> instead. This Ability can be <recast>Recast</recast> twice, each one changing shape and dealing 25% more damage than the previous one.{{ spellmodifierdescriptionappend }}",
            "leveltip": {
                "label": [
                    "Cooldown",
                    "Damage",
                    "Total AD Ratio"
                ],
                "effect": [
                    "{{ cooldown }} -> {{ cooldownNL }}",
                    "{{ qbasedamage }} -> {{ qbasedamageNL }}",
                    "{{ qtotaladratio*100.000000 }}% -> {{ qtotaladrationl*100.000000 }}%"
                ]
            },
            "maxrank": 5,
            "cooldown": [
                14,
                12,
                10,
                8,
                6
            ],
            "cooldownBurn": "14/12/10/8/6",
            "cost": [
                0,
                0,
                0,
                0,
                0
            ],
            "costBurn": "0",
            "datavalues": {},
            "effect": [
                null,
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ]
            ],
            "effectBurn": [
                null,
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0"
            ],
            "vars": [],
            "costType": "No Cost",
            "maxammo": "-1",
            "range": [
                25000,
                25000,
                25000,
                25000,
                25000
            ],
            "rangeBurn": "25000",
            "image": {
                "full": "AatroxQ.png",
                "sprite": "spell0.png",
                "group": "spell",
                "x": 288,
                "y": 48,
                "w": 48,
                "h": 48
            },
            "resource": "No Cost"
        },
        {
            "id": "AatroxW",
            "name": "Infernal Chains",
            "description": "Aatrox smashes the ground, dealing damage to the first enemy hit. Champions and large monsters have to leave the impact area quickly or they will be dragged to the center and take the damage again.",
            "tooltip": "Aatrox fires a chain, <status>Slowing</status> the first enemy hit by {{ wslowpercentage*-100 }}% for {{ wslowduration }} seconds and dealing <physicalDamage>{{ wdamage }} physical damage</physicalDamage>. Champions and large jungle monsters have {{ wslowduration }} seconds to leave the impact area or be <status>Pulled</status> back to the center and damaged again for the same amount.{{ spellmodifierdescriptionappend }}",
            "leveltip": {
                "label": [
                    "Cooldown",
                    "Damage",
                    "Slow"
                ],
                "effect": [
                    "{{ cooldown }} -> {{ cooldownNL }}",
                    "{{ wbasedamage }} -> {{ wbasedamageNL }}",
                    "{{ wslowpercentage*-100.000000 }}% -> {{ wslowpercentagenl*-100.000000 }}%"
                ]
            },
            "maxrank": 5,
            "cooldown": [
                20,
                18,
                16,
                14,
                12
            ],
            "cooldownBurn": "20/18/16/14/12",
            "cost": [
                0,
                0,
                0,
                0,
                0
            ],
            "costBurn": "0",
            "datavalues": {},
            "effect": [
                null,
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ]
            ],
            "effectBurn": [
                null,
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0"
            ],
            "vars": [],
            "costType": "No Cost",
            "maxammo": "-1",
            "range": [
                825,
                825,
                825,
                825,
                825
            ],
            "rangeBurn": "825",
            "image": {
                "full": "AatroxW.png",
                "sprite": "spell0.png",
                "group": "spell",
                "x": 336,
                "y": 48,
                "w": 48,
                "h": 48
            },
            "resource": "No Cost"
        },
        {
            "id": "AatroxE",
            "name": "Umbral Dash",
            "description": "Passively, Aatrox heals when damaging enemy champions. On activation, he dashes in a direction.",
            "tooltip": "<spellPassive>Passive:</spellPassive> Aatrox gains <lifeSteal>{{ espellvamp }}% Omnivamp</lifeSteal> against champions, increased to <lifeSteal>{{ espellvampempowered }}% Omnivamp</lifeSteal> during <keywordMajor>World Ender</keywordMajor>.<br /><br /><spellActive>Active:</spellActive> Aatrox dashes. He can use this Ability while winding up his other Abilities.{{ spellmodifierdescriptionappend }}",
            "leveltip": {
                "label": [
                    "Cooldown",
                    "Healing %",
                    "Healing % during World Ender"
                ],
                "effect": [
                    "{{ cooldown }} -> {{ cooldownNL }}",
                    "{{ espellvamp }}% -> {{ espellvampNL }}%",
                    "{{ espellvampempowered }}% -> {{ espellvampempoweredNL }}%"
                ]
            },
            "maxrank": 5,
            "cooldown": [
                9,
                8,
                7,
                6,
                5
            ],
            "cooldownBurn": "9/8/7/6/5",
            "cost": [
                0,
                0,
                0,
                0,
                0
            ],
            "costBurn": "0",
            "datavalues": {},
            "effect": [
                null,
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ]
            ],
            "effectBurn": [
                null,
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0"
            ],
            "vars": [],
            "costType": "No Cost",
            "maxammo": "1",
            "range": [
                25000,
                25000,
                25000,
                25000,
                25000
            ],
            "rangeBurn": "25000",
            "image": {
                "full": "AatroxE.png",
                "sprite": "spell0.png",
                "group": "spell",
                "x": 384,
                "y": 48,
                "w": 48,
                "h": 48
            },
            "resource": "No Cost"
        },
        {
            "id": "AatroxR",
            "name": "World Ender",
            "description": "Aatrox unleashes his demonic form, fearing nearby enemy minions and gaining attack damage, increased healing, and Move Speed. If he gets a takedown, this effect is extended.",
            "tooltip": "Aatrox reveals his true demonic form, <status>Fearing</status> nearby minions for {{ rminionfearduration }} seconds and gaining <speed>{{ rmovementspeedbonus*100 }}% Move Speed</speed> decaying over {{ rduration }} seconds. He also gains <scaleAD>{{ rtotaladamp*100 }}% Attack Damage</scaleAD> and increases <healing>self-healing by {{ rhealingamp*100 }}%</healing> for the duration.<br /><br />Champion takedowns extend the duration of this effect by {{ rextension }} seconds and refresh the <speed>Move Speed</speed> effect.{{ spellmodifierdescriptionappend }}",
            "leveltip": {
                "label": [
                    "Total Attack Damage Increase",
                    "Healing Increase",
                    "Move Speed",
                    "Cooldown"
                ],
                "effect": [
                    "{{ rtotaladamp*100.000000 }}% -> {{ rtotaladampnl*100.000000 }}%",
                    "{{ rhealingamp*100.000000 }}% -> {{ rhealingampnl*100.000000 }}%",
                    "{{ rmovementspeedbonus*100.000000 }}% -> {{ rmovementspeedbonusnl*100.000000 }}%",
                    "{{ cooldown }} -> {{ cooldownNL }}"
                ]
            },
            "maxrank": 3,
            "cooldown": [
                120,
                100,
                80
            ],
            "cooldownBurn": "120/100/80",
            "cost": [
                0,
                0,
                0
            ],
            "costBurn": "0",
            "datavalues": {},
            "effect": [
                null,
                [
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0
                ]
            ],
            "effectBurn": [
                null,
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0"
            ],
            "vars": [],
            "costType": "No Cost",
            "maxammo": "-1",
            "range": [
                25000,
                25000,
                25000
            ],
            "rangeBurn": "25000",
            "image": {
                "full": "AatroxR.png",
                "sprite": "spell0.png",
                "group": "spell",
                "x": 432,
                "y": 48,
                "w": 48,
                "h": 48
            },
            "resource": "No Cost"
        }
    ],
    "passive": {
        "name": "Deathbringer Stance",
        "description": "Periodically, Aatrox's next basic attack deals bonus <physicalDamage>physical damage</physicalDamage> and heals him, based on the target's max health. ",
        "image": {
            "full": "Aatrox_Passive.png",
            "sprite": "passive0.png",
            "group": "passive",
            "x": 0,
            "y": 0,
            "w": 48,
            "h": 48
        }
    },
    "recommended": []
} -->
