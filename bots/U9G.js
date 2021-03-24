const viewer = require('prismarine-viewer').mineflayer
const mineflayer = require('mineflayer')
const { pathfinder, goals, Movements } = require('mineflayer-pathfinder')
const { once } = require('events')
const vec3 = require('vec3').Vec3
/**
 * @param {mineflayer.Bot} bot 
 */
module.exports = async (bot) => {
  bot.chat('/op scane13rep')
  const sleep = ms => new Promise((resolve, reject) => setTimeout(resolve, ms))
  const goto = goal => {
    bot.pathfinder.setGoal(goal)
    return once(bot, 'goal_reached')
  }

  const mcData = require('minecraft-data')(bot.version)
  const myMovements = new Movements(bot, mcData)

  bot.loadPlugin(pathfinder)

  myMovements.scafoldingBlocks.push(mcData.itemsByName.tnt.id, mcData.itemsByName.sandstone.id)
  bot.pathfinder.setMovements(myMovements)

  viewer(bot, { firstPerson: true, port: 3000 })
  //temple
  await goto(new goals.GoalBlock(-324.5, 65, -133.5))
  //floor of top of temple
  const blockToBreak1 = bot.blockAt(bot.entity.position.subtract(new vec3(0, 1, 0)))
  await bot.dig(blockToBreak1, true)
  //fall
  await once(bot, 'health')

  //break block below pressure plate
  const blockToBreak2 = bot.blockAt(bot.entity.position.subtract(new vec3(1, 1, 0)))
  await bot.dig(blockToBreak2, true)
  
  console.log('its over')
}
// /tp -324 65 -133