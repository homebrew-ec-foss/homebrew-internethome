---
title: BotCamp | The Telegram Bot Workshop
date: "2023-01-24"
tags: [python, telegram, bot]
description: Follow along article to BotCamp
permalink: posts/{{ title | slug }}/index.html
author_name: Anurag Rao
author_link: https://github.com/anuragrao04
---
# Introduction
I'm sure you'd have talked to a bot at least once. Be it on discord, telegram, to a bank, or any other business for that matter. You'd be learning how to build these bots from this workshop

# Prerequisites
1. A Python 3 installation
2. An Internet Connection
3. A Telegram account and the Telegram app on laptop and/or phone.

# Installation
We'd be building this bot with python. We need to `pip install` a module to work with the `Telegram API` 
Just run this on a terminal/ command prompt:
```shell
python -m pip install python-telegram-bot
```
Make sure you are on the latest version of the library which is `20.0`. You can check the version by executing:
```shell
python -m pip show python-telegram-bot
```
If the version is `13.5`, update it to `20.0` with the command:
```shell
python -m pip install python-telegram-bot --upgrade
```
The latest version was released very recently (about 2 weeks ago) and brings with it breaking changes. This just means that code written for version `13.5` might not work for version `20.0`. This workshop follows the syntax needed for version `20.0` - the latest version.

If you have trouble running this or if you are getting any errors, feel free to contact our mentors :) although a good programmer always googles first.

# What Are APIs
An API, or Application Programming Interface, is like a waiter in a restaurant. Just as a waiter takes your order and brings you food from the kitchen, an API allows one software program to "talk to" another software program and retrieve information from it.

For example, imagine you want to get the weather forecast for the week ahead. You open a weather app on your phone and it shows you the forecast. The app didn't come up with the forecast on its own - it used an API to request the forecast from a weather service. The API acts as a middleman, making it easy for the app to get the information it needs.
![telegram api image](https://i.imgur.com/kaTDjeT.png)

# API Keys and Tokens
An API key and an API token are like keys or passwords that you use to access a building or a website. Just as you need a key to open the door to your house or a password to log into your email account, you need an API key or token to access a software program or service through an API.

An API key is a long string of letters and numbers that is unique to your account. It acts like a unique identifier that tells the software program or service that you are authorized to access its resources. It is like a key to a house that only you can use to access it.

# The Telegram APIs
Telegram provides various APIs to work with Telegram functions line authorization, updates, channel statistics, etc., We would be using the `Telegram Bot API` to make our Bot. A Telegram Bot can replace entire websites, receive payments, host games, and a lot of other stuff.
![durger king bot](https://i.imgur.com/7mQvPMY.png)

> Try [@DurgerKingBot](https://t.me/durgerkingbot)

`python-telegram-bot` is a library in python that is a wrapper for the Telegram Bot APIs. It allows you to use the Telegram Bot APIs in python. 

#### **Documentation Links:**
1. [python-telegram-bot](https://docs.python-telegram-bot.org/en/stable/)
2. [Telegram Bot API](https://core.telegram.org/bots/api)

# How do you make your bot - BotFather?
`BotFather` is a telegram bot that you can find on telegram. It's the official Bot of Telegram to make and edit your bots. To get started, just search for BotFather on telegram. Once you find it, make sure that there is a verified tick next to the username. 

Telegram commands are always prefixed with a `/`. To make a new bot, send `/newbot` to BotFather. Follow the onscreen instructions. It is difficult to find a username that is not already taken so keep trying :) 

Once you're done with the process, you must receive an API key in a message that looks like this:
![bot father API text](https://i.imgur.com/f2kthzt.png)
> Note that the API Key here has been covered on purpose. An API key is supposed to be private - like a password. Do not share any kind of API keys with anybody you do not trust. 

Make a note of this API key as it will be used in our program.

# The first program | The CommandHandler
The first program would look something like this:

```python
from telegram import Update
from telegram.ext import (
Application,
CallbackContext,
CommandHandler,
MessageHandler,
filters
)

application = Application.builder().token("YOUR API TOKEN HERE").build()
print("Successfully connected to Telegram API")
async def start(update: Update, context: CallbackContext):
    await update.message.reply_text("Hello! I am a bot that is going to mimic you :)")

application.add_handler(CommandHandler('start', start))

application.run_polling()
```

### Explanation:

1.  `from telegram import Update` imports the Update class from the telegram module. The Update class contains information about an update received from Telegram, such as a new message or a callback query.

2.  `from telegram.ext import (Application, CallbackContext, CommandHandler, MessageHandler, filters)` imports the respective classes from the telegram.ext module.

3.  `application = Application.builder().token("<YOUR API KEY HERE>").build()` creates an instance of the Application class, using the provided token to authenticate with the Telegram API. *Make sure to substitute your API Key in this statement.*

4.  `async def start(update: Update, context: CallbackContext):` defines an asynchronous function called "start" that takes in two arguments: an instance of the Update class, and an instance of the CallbackContext class. The `Update` object contains information about the incoming update from Telegram, such as the message text and the user who sent it. The `CallbackContext` object is used to pass additional information to the callback function that handles the update. It contains information about the current state of the bot, such as the current user's chat id and the message id. The `CallbackContext` object can also be used to access the `bot` instance, which allows the function to perform actions such as sending messages or handling inline queries.

5.  `await update.message.reply_text("Hello! I am a bot that is going to mimic you :)")` this line will send a message 'Hello! I am a bot that is going to mimic you :)' as a reply to the message that triggered the start function

6.  `application.add_handler(CommandHandler('start', start))` this line adds a command handler to the application instance that listens to the command `start` and when this command is sent, it will call the start function

7.  `application.run_polling()` this line will make the application start polling for updates from Telegram.




In this program, we define a simple Telegram Bot that listens for the `/start` command. When this command is received, the `start()` function is fired which will send a message 'Hello! I am a bot that is going to mimic you :)'

> Note that the API token provided in this code is not a valid token. You have to replace `<YOUR API TOKEN HERE>` with the string API Token you received from BotFather at the time of creating your bot.

Now run this program. You will see no output and that is a good sign. You can add a print statement after the application initialization statement just to say that the bot has been initialized successfully. 

To test out your bot, go on to telegram and look for the username of your bot. Once you find it, hit the `start` button at the bottom of your chat. This is a default button provided by telegram and it just sends a `/start` command. Your bot should reply to this command as programmed. If it doesn't, check if there is any runtime error in your code and if your internet is stable. Do not connect to the college WiFi when running the bot as college WiFi does not allow the telegram bot server(aka your program) to connect to the Telegram API

# The MessageHandler
Now we program the mimicking part of our bot. For this, we will need a class provided by the Telegram API called the `MessageHandler`. As the name suggests, it is a handler that handles incoming messages. This class takes in 2 compulsory arguments: a `filter` and the callback function.

Add the following code to your program:
```python
async def mimic(update: Update, context: CallbackContext):
    incoming_text = update.message.text
    await update.message.reply_text(incoming_text)



application.add_handler(MessageHandler(filters=filters.TEXT, callback=mimic))
```
### Explanation for the new lines added:

1.  `async def mimic(update: Update, context: CallbackContext):` defines an asynchronous function called "mimic" that takes in two arguments: an instance of the Update class, and an instance of the CallbackContext class.

2.  `incoming_text = update.message.text` assigns the text of the incoming message to a variable called "incoming_text"

3.  `await update.message.reply_text(incoming_text)` sends the text of the incoming message as a reply to the message that triggered the mimic function

4.  `application.add_handler(MessageHandler(filters=filters.TEXT, callback=mimic))` adds a message handler to the application instance that listens to incoming `text messages only` and when a text message is received, it will call the mimic function.

The function must be defined before adding it to the handler as a callback. This is due to the obvious reasons for a function being defined before it's called or referred to.

# Final Code and Conclusions
Your final code must look like this: 
```python
from telegram import Update
from telegram.ext import (
Application,
CallbackContext,
CommandHandler,
MessageHandler,
filters
)

application = Application.builder().token("YOUR API TOKEN HERE").build()
print("Successfully connected to Telegram API")
async def start(update: Update, context: CallbackContext):
    await update.message.reply_text("Hello! I am a bot that is going to mimic you :)")


async def mimic(update: Update, context: CallbackContext):
    incoming_text = update.message.text
    await update.message.reply_text(incoming_text)


application.add_handler(CommandHandler('start', start))
application.add_handler(MessageHandler(filters=filters.TEXT, callback=mimic))

application.run_polling()
```
> Make sure to replace `<YOUR API TOKEN HERE>` with your specific API Token.

You can explore more of what is possible with the Telegram Bots with examples found [here](https://github.com/python-telegram-bot/python-telegram-bot/tree/master/examples)

I hope you had a good, non-chaotic, and worthwhile time going through this workshop. See ya at the next one!


# Edit: Extra Things Done In The Workshop
We used a MessageHandler to take in a variable - The User's Name. So every message that was sent was assumed to be the name. Ideally, this is not right and you'd rather implement this using the ConversationHandler - which was beyond the scope of the workshop, But I will include the code for it for the passionate ones among you :) 
The code that we wrote during the workshop was like so:

```python
from telegram import Update
from telegram.ext import (
Application,
CallbackContext,
CommandHandler,
MessageHandler,
filters
)

application = Application.builder().token("YOUR API KEY HERE").build()
print("Successfully connected to Telegram API")
async def start(update: Update, context: CallbackContext):
    await update.message.reply_text("Hello! I am a bot that is going to mimic you :)")


async def takeName(update: Update, context: CallbackContext):
    incoming_text = update.message.text
    context.user_data["name"] = incoming_text
    await update.message.reply_text("Your name stored is "+incoming_text)

async def tellMyName(update: Update, context: CallbackContext):
    name = context.user_data["name"]
    await update.message.reply_text(name)



application.add_handler(CommandHandler('start', start))
application.add_handler(MessageHandler(filters=filters.TEXT & ~filters.COMMAND, callback=takeName))
application.add_handler(CommandHandler('tellMyName', tellMyName))
application.run_polling()
```
Explanation:

1. `async def takeName(update: Update, context: CallbackContext)`: This line defines a new asynchronous function named takeName which takes in two arguments update and context.
2. `incoming_text = update.message.text`: This line assigns the text of the incoming message to the variable incoming_text.
3. `context.user_data["name"] = incoming_text`: This line stores the value of incoming_text in the name key of the user_data dictionary in the context object. This allows the data to persist across different function calls.
4. `await update.message.reply_text("Your name stored is "+incoming_text)`: This line sends a message to the user with the text "Your name stored is " followed by the value of the incoming_text variable, which is the name the user provided.
In the other function of tellMyName:
5. `name = context.user_data["name"]`: This line retrieves the value stored in the name key of the user_data dictionary in the context object.
6. `await update.message.reply_text(name)`: This line sends a message to the user with the text of the value of the name variable, which is the name the user provided in the takeName function.
7. Finally, we add these two function to the `application` object as command and message handlers. For the filters, we added a new filter that was `~filters.COMMAND`. This adds a filter that does not allow commands to go through.

Now for the same functionality but using a `ConversationHandler`:
```python
from telegram import Update
from telegram.ext import (
Application,
CallbackContext,
CommandHandler,
MessageHandler,
ConversationHandler,
filters
)

application = Application.builder().token("5882499182:AAGjtXn2gQiJ_o0_BwEgSe1n1f6Ybvm9SJI").build()
print("Successfully connected to Telegram API")
async def start(update: Update, context: CallbackContext):
    await update.message.reply_text("Hello! I am a bot that is going to mimic you :)")


async def tellMyName(update: Update, context: CallbackContext):
    name = context.user_data.get("name", "not given")
    await update.message.reply_text(name)

nameState = 0


async def askName(update: Update, context: CallbackContext):
    await update.message.reply_text("Tell me your name")
    return nameState

async def storeName(update: Update, context: CallbackContext):
    incoming_text = update.message.text
    context.user_data["name"] = incoming_text
    await update.message.reply_text(f"Your name {incoming_text} has been stored")
    return ConversationHandler.END

async def cancel(update: Update, context: CallbackContext):
    await update.message.reply_text("Okay! Cancelled")
    return ConversationHandler.END
    



conv_handler = ConversationHandler(
    entry_points=[CommandHandler("askName", askName)],
    states={
        nameState: [MessageHandler(filters.TEXT and ~filters.COMMAND, storeName)]
    },
    fallbacks=[CommandHandler("cancel", cancel)]
)

application.add_handler(conv_handler)
application.add_handler(CommandHandler('start', start))
application.add_handler(CommandHandler('tellMyName', tellMyName))
application.run_polling()
```
Here's how that works:
![program output](https://i.imgur.com/ez2EKCX.png)

Now for the explanation of how this program works, I'd suggest you to go through the documentation for python-telegram-bot. A huge part of being a programmer is reading and making good documentation. [here](https://docs.python-telegram-bot.org/en/stable/telegram.ext.conversationhandler.html) is the documentation for the `ConversationHandler` on python-telegram-bot.

Thanks for reading through :)