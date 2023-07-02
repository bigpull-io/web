export const mockInput = `
# Welaryn - Demonology - 2023-06-26 21:49 - EU/Ragnaros
# SimC Addon 10.1.0-10
# WoW 10.1.0.50000, TOC 100100
# Requires SimulationCraft 1000-01 or newer

warlock="Welaryn"
level=70
race=orc
region=eu
server=ragnaros
role=spell
professions=mining=100/enchanting=100
spec=demonology

talents=BoQA+63P9mnDJYMkogOeTUhr8CIJRSCkmCRaJJhUCAAAAAKRQCJaRSkI5ARaJROABAAAAAAJ

# Saved Loadout: M+
# talents=BoQA+63P9mnDJYMkogOeTUhr8CIJRSCkmCRaJJhUCAAAAAKRQCJaRSkI5ARaJROABAAAAAAJ
# Saved Loadout: Raid ST
# talents=BoQA+63P9mnDJYMkogOeTUhr8CIJRSCkmCRaJJhUCAAAAAKRQCiSkEJSOQkWSSOABAAAAAAJ

# Grimhorns of the Sinister Savant (437)
head=,id=202533,gem_id=192948,bonus_id=6652/9413/9229/7979/9329/1494/8767
# Chain of the Underking (441)
neck=,id=134495,gem_id=192948/192985/192948,bonus_id=6652/9144/9334/3320/8767/9477/8782
# Vibrant Wildercloth Shoulderspikes  (447)
shoulder=,id=193508,bonus_id=8836/8840/8902/9405/9376/8793/9379/8960/9366,crafted_stats=40/36,crafting_quality=5
# Putrid Carapace (441)
back=,id=134408,enchant_id=6604,bonus_id=6652/9223/9220/9144/9334/3320/8767
# Cursed Robes of the Sinister Savant (437)
chest=,id=202536,enchant_id=6625,bonus_id=6652/9231/7979/9329/1488/8767
# Loamm Niffen Tabard (1)
tabard=,id=205286
# Wristwraps of the Sinister Savant (444)
wrist=,id=202529,enchant_id=6586,bonus_id=6652/9381/9415/1501
# Grips of the Sinister Savant (441)
hands=,id=202534,bonus_id=6652/9230/9409/9334/1492/8767
# Lost Hero's Waist Wrap (444)
waist=,id=193816,bonus_id=9381/43/9414/9223/9219/9144/1666/8767
# Leggings of the Sinister Savant (441)
legs=,id=202532,enchant_id=6541,bonus_id=6652/9380/9228/1498
# Vibrant Wildercloth Slippers  (447)
feet=,id=193519,enchant_id=6607,bonus_id=8836/8840/8902/9405/9376/8791/9379/8960/9366,crafted_stats=36/40,crafting_quality=5
# Signet of Titanic Insight  (447)
finger1=,id=192999,enchant_id=6556,gem_id=192948,bonus_id=8836/8840/8902/8780/9405/8793/9376/8174/9366,crafted_stats=49/32,crafting_quality=5
# Ring-Bound Hourglass  (447)
finger2=,id=193000,enchant_id=6556,gem_id=192948,bonus_id=8836/8840/8902/8780/9405/8791/9376/9366,crafted_stats=32/49,crafting_quality=5
# Neltharion's Call to Dominance (441)
trinket1=,id=204202,bonus_id=6652/7979/9334/1482/8767
# Irideus Fragment (441)
trinket2=,id=193743,bonus_id=6652/9144/9334/1663/8767
# Erethos, the Empty Promise (441)
main_hand=,id=202565,enchant_id=6643,bonus_id=41/9409/9334/1489/8767

### Gear from Bags
#
# Scalesworn Cultist's Scorn (415)
# head=,id=200336,gem_id=192961,bonus_id=6652/8828/7977/8973/1489/8767/8780
#
# Magmorax's Fourth Collar (421)
# neck=,id=204397,bonus_id=6652/9414/8784/9323/7979/1472/8767
#
# Choker of Stolen Thunder (437)
# neck=,id=206180,gem_id=192985/192961/192961,bonus_id=6652/9144/9329/1659/8767/9477/8782
#
# Chain of the Underking (437)
# neck=,id=134495,gem_id=192984/192961/192961,bonus_id=6652/9144/9329/3316/8767/9477/8782
#
# Amulet of Tender Breath (428)
# neck=,id=206183,bonus_id=9330/42/9415/8784/9144/1650/8767
#
# Choker of Stolen Thunder (431)
# neck=,id=206180,bonus_id=9331/6652/9415/8784/9144/1653/8767
#
# Elemental Lariat  (421)
# neck=,id=193001,gem_id=192984/192948/192948,bonus_id=8836/8840/8902/8960/8784/8782/9405/8793/8846/9365,crafted_stats=49/36,crafting_quality=5
#
# Ionized Choker (418)
# neck=,id=206181,bonus_id=9322/6652/9415/8783/9144/1640/8767
#
# Amice of the Sinister Savant (428)
# shoulder=,id=202531,bonus_id=6652/9227/7979/9325/1485/8767
#
# Scalesworn Cultist's Effigy (415)
# shoulder=,id=200338,bonus_id=6652/8826/8973/7977/1489/8767
#
# Roggthread Mantle (418)
# shoulder=,id=134177,bonus_id=9322/6652/9223/9218/9144/3297/8767
#
# Molten Magma Mantle (418)
# shoulder=,id=193788,bonus_id=9322/6652/9223/9218/9144/1640/8767
#
# Amice of the Blue  (421)
# shoulder=,id=193526,bonus_id=8836/8840/8902/8960/9405/8846/9365,crafting_quality=5
#
# Parrotfeather Cloak (428)
# back=,id=155884,bonus_id=9330/6652/9223/9220/9144/3298/8767
#
# Goldscar Pelt (415)
# back=,id=133639,enchant_id=6601,bonus_id=7977/6652/8822/8819/9144/8973/3294/8767
#
# Deeprock Cape (415)
# back=,id=204915,bonus_id=6652/9321/1637/8767
#
# Billowing Skydrape (431)
# back=,id=133362,bonus_id=9331/6652/9223/9220/9144/3323/8767
#
# Billowing Cape (424)
# back=,id=133245,bonus_id=9324/6652/9223/9220/9144/3316/8767
#
# Shadow of Perfect Bliss (424)
# back=,id=133247,bonus_id=9324/6652/9223/9220/9144/3316/8767
#
# Mammoth-Trainer's Drape (437)
# back=,id=193787,enchant_id=6604,bonus_id=6652/9223/9220/9144/9329/1659/8767
#
# Blood-Drenched Robes (431)
# chest=,id=206199,bonus_id=9331/6652/9223/9221/9144/1653/8767
#
# Tunic of Smoldering Ire (415)
# chest=,id=137352,bonus_id=9321/42/9223/9221/9144/3294/8767
#
# Scalesworn Cultist's Frock (421)
# chest=,id=200333,enchant_id=6625,bonus_id=6652/9130/7977/8830/1498
#
# Moonless Robe (411)
# chest=,id=204920,bonus_id=6652/9316/1633/8767
#
# Robe of Plunging Depths (418)
# chest=,id=193738,bonus_id=9322/6652/9223/9221/9144/1640/8767
#
# Bracers of Arcane Mystery (415)
# wrist=,id=109864,enchant_id=6586,bonus_id=7977/6652/7936/8822/8819/9144/8973/3300/8767
#
# Lily-Laced Bracelets (421)
# wrist=,id=193724,bonus_id=9323/6652/9413/9223/9220/9144/1643/8767
#
# Wristwraps of Twined Morels (415)
# wrist=,id=159275,bonus_id=9321/6652/9413/9223/9220/9144/3285/8767
#
# Animated Shackles (424)
# wrist=,id=193792,enchant_id=6586,bonus_id=6652/9415/9223/9220/9144/9320/1646/8767
#
# Silk Cuffs of the Skycap'n (428)
# wrist=,id=159227,bonus_id=9330/6652/9413/9223/9220/9144/3298/8767
#
# Scalesworn Cultist's Gloves (421)
# hands=,id=200335,bonus_id=6652/9130/7977/8829/1498
#
# Moonless Gloves (415)
# hands=,id=204922,bonus_id=6652/9321/1637/8767
#
# Warlord's Cindermitts (421)
# hands=,id=193775,bonus_id=9323/6652/9223/9218/9144/1643/8767
#
# Gloves of the Mountain Conquest (444)
# hands=,id=134420,bonus_id=9381/6652/9223/9218/9144/3323/8767
#
# Sky Saddle Cord (421)
# waist=,id=193691,gem_id=192948,bonus_id=9130/7977/41/8822/8818/9144/1643/8767/8780
#
# Sailcloth Waistband (437)
# waist=,id=158346,bonus_id=6652/9415/9223/9219/9144/9329/3307/8767
#
# Moonless Trousers (415)
# legs=,id=204924,bonus_id=41/9321/1637/8767
#
# Coattails of the Rightful Heir (424)
# legs=,id=202585,bonus_id=6652/9222/9221/9324/7979/1472/8767
#
# Scalesworn Cultist's Culottes (415)
# legs=,id=200337,enchant_id=6541,bonus_id=6652/8827/7977/8973/1498/8767
#
# Khajin's Hailstone Footwraps (421)
# feet=,id=193733,bonus_id=9323/6652/9223/9219/9144/1643/8767
#
# Suffused Sandals (424)
# feet=,id=204788,enchant_id=6607,bonus_id=6652/9223/9219/9320/1546/8767
#
# Ravenous Pursuer's Footwraps (428)
# feet=,id=193673,bonus_id=9330/6652/9223/9219/9144/1650/8767
#
# Scalebane Signet (418)
# finger1=,id=193768,bonus_id=9322/6652/9414/9144/1640/8767
#
# Seal of Questionable Loyalties (424)
# finger1=,id=158314,bonus_id=9324/6652/9415/9144/3294/8767
#
# Loop of Vitriolic Intent (424)
# finger1=,id=134530,bonus_id=9324/6652/9415/9144/3303/8767
#
# Loop of Pulsing Veins (418)
# finger1=,id=159463,bonus_id=9322/6652/9414/9144/3288/8767
#
# Skyshard Ring (428)
# finger1=,id=206184,bonus_id=9330/42/9415/9144/1650/8767
#
# Furious Ragefeather (415)
# trinket1=,id=193677,bonus_id=7977/6652/9144/8973/1637/8767
#
# Igneous Flowstone (437)
# trinket1=,id=203996,bonus_id=6652/7979/9329/1488/8767
#
# Voidmender's Shadowgem (421)
# trinket1=,id=110007,bonus_id=9130/7977/6652/9144/3306/8767
#
# Time-Breaching Talon (428)
# trinket1=,id=193791,bonus_id=9330/6652/9144/1650/8767
#
# Infinite Dragonspire (418)
# main_hand=,id=193803,bonus_id=9322/6652/9147/1640/8767
#
# Neltharic Staff (415)
# main_hand=,id=204963,bonus_id=6652/9321/1637/8767
#
# Neltharic Wand (437)
# main_hand=,id=204981,enchant_id=6643,bonus_id=6652/9329/1659/8767
#
# Rod of Crystalline Energies (428)
# main_hand=,id=205973,bonus_id=9330/6652/9147/1650/8767
#
# Spellboon Saber (421)
# main_hand=,id=193710,enchant_id=6643,bonus_id=9130/7977/6652/9147/1643/8767
#
# Searing Tusk Shard (428)
# main_hand=,id=193790,bonus_id=9330/6652/9147/1650/8767
#
# Irontorch Igniter (441)
# off_hand=,id=193783,bonus_id=9380/6652/9144/1663/8767
#
# Rod of Perfect Order (415)
# off_hand=,id=193745,bonus_id=9321/6652/9144/1637/8767
#
# Crackling Codex of the Isles  (421)
# off_hand=,id=194879,bonus_id=8836/8840/8902/9405/8791/8846/9365,crafted_stats=49/36,crafting_quality=5

### Additional Character Info
#
# upgrade_currencies=c:1792:1227/c:2122:83/c:2245:2000/i:204195:56/i:204193:50/i:190453:4/i:204194:21/i:204196:4
#
# slot_high_watermarks=0:437:437/1:441:441/2:447:447/3:437:437/4:444:444/5:441:441/6:447:447/7:444:444/8:444:444/9:447:447/10:441:441/11:441:441/12:441:441/13:437:437/14:0:389/15:0:385/16:441:441

# Checksum: f23558e3
`;
