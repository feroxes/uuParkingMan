//@@viewOn:imports
const Constants = require("../abl/constants.js");
const { Telegraf } = require("telegraf");
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:components
class Notifier {
  async sendMessageToChanel(dtoIn) {
    const { message, error, uuAppErrorMap, parse_mode = "HTML" } = dtoIn;
    // HDS 1
    const bot = new Telegraf(Constants.Telegram.botToken);

    try {
      await bot.telegram.sendMessage(Constants.Telegram.chanelChatId, message, { parse_mode });
    } catch (e) {
      throw new error.FailedToSentMessage({ uuAppErrorMap }, e);
    }

    return { uuAppErrorMap };
  }
}
//@@viewOff:components

//@@viewOn:exports
module.exports = new Notifier();
//@@viewOff:exports
