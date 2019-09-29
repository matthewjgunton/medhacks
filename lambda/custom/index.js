const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome, what is the blood pressure?';
        const attributes = handlerInput.attributesManager.getSessionAttributes();

        attributes.stage = 0;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const bloodPressureHandler = {
  canHandle(handlerInput){
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const request = handlerInput.requestEnvelope.request;

    return (request.intent.name === "NumberIntent") &&
          request.type === 'IntentRequest' && attributes.stage == 0;
  },
  handle(handlerInput){
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const response = handlerInput.responseBuilder;

    //initializing attributes vars
    attributes.stage++;
    attributes.bloodPressure = handlerInput.requestEnvelope.request.intent.slots.mui.value;

    let speakOutput = "Got it. What is the patient's oxygen rate.";

    return response.speak(speakOutput)
                  .reprompt(speakOutput)
                  .getResponse();
  }
}

//heart rate
//oxygen level (What's the patient comfort level)

const oxygenLevelHandler = {
  canHandle(handlerInput){
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const request = handlerInput.requestEnvelope.request;

    return (request.intent.name === "NumberIntent" ) &&
          request.type === 'IntentRequest' && attributes.stage == 1;
  },
  handle(handlerInput){
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const response = handlerInput.responseBuilder;

    //initializing attributes vars
    attributes.stage++;
    attributes.oxygenLevel = handlerInput.requestEnvelope.request.intent.slots.mui.value;

    let speakOutput = "Got it. What is the patient's heart rate.";

    return response.speak(speakOutput)
                  .reprompt(speakOutput)
                  .getResponse();
  }
}

const heartRateHandler = {
    canHandle(handlerInput){
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      const request = handlerInput.requestEnvelope.request;

      return (request.intent.name === "NumberIntent") &&
            request.type === 'IntentRequest' && attributes.stage == 2;
    },
    handle(handlerInput){
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      const response = handlerInput.responseBuilder;

      //initializing attributes vars
      attributes.stage++;
      attributes.heartRate = handlerInput.requestEnvelope.request.intent.slots.mui.value;


      let speakOutput = "Got it. How is the patient's comfort level on a scale of 1-10? 1 = very poor, 10 = excellent";

      return response.speak(speakOutput)
                    .reprompt(speakOutput)
                    .getResponse();
    }
}

const comfortLevelHandler = {
  canHandle(handlerInput){
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const request = handlerInput.requestEnvelope.request;

    return (request.intent.name === "NumberIntent" ) &&
          request.type === 'IntentRequest' && attributes.stage == 3;
  },
  handle(handlerInput){
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const response = handlerInput.responseBuilder;

    //initializing attributes vars
    attributes.stage++;
    attributes.comfortLevel = handlerInput.requestEnvelope.request.intent.slots.mui.value;

    let speakOutput = "Got it. What is the patient's level of nausea?";

    return response.speak(speakOutput)
                  .reprompt(speakOutput)
                  .getResponse();
  }
}

const nauseaHandler = {
  canHandle(handlerInput){
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const request = handlerInput.requestEnvelope.request;

    return (request.intent.name === "NumberIntent") &&
          request.type === 'IntentRequest' && attributes.stage == 4;
  },
  handle(handlerInput){
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const response = handlerInput.responseBuilder;

    //initializing attributes vars
    attributes.stage++;
    attributes.nausea = handlerInput.requestEnvelope.request.intent.slots.mui.value;

    let speakOutput = "Got it. What is the patient's breathing like?";

    return response.speak(speakOutput)
                  .reprompt(speakOutput)
                  .getResponse();
  }
}

const breathingHandler = {
  canHandle(handlerInput){
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const request = handlerInput.requestEnvelope.request;

    return (request.intent.name === "NumberIntent") &&
          request.type === 'IntentRequest' && attributes.stage == 5;
  },
  handle(handlerInput){
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const response = handlerInput.responseBuilder;

    //initializing attributes vars
    attributes.stage++;
    attributes.breathing = handlerInput.requestEnvelope.request.intent.slots.mui.value;

    let speakOutput = "Got it. What is the patient's vaginal bleeding like?";

    return response.speak(speakOutput)
                  .reprompt(speakOutput)
                  .getResponse();
  }
}

const bleedingHandler = {
  canHandle(handlerInput){
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const request = handlerInput.requestEnvelope.request;

    return (request.intent.name === "NumberIntent") &&
          request.type === 'IntentRequest' && attributes.stage == 6;
  },
  handle(handlerInput){
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const response = handlerInput.responseBuilder;

    //initializing attributes vars
    attributes.bleeding = handlerInput.requestEnvelope.request.intent.slots.mui.value;

    ////////////
    //calculation stage
    let speakOutput;
    let shouldSkip = false;
    let arr = Object.keys(attributes);
    for(let i = 0; i < arr; i++){
      if(attributes.arr[i] == null){
        shouldSkip = true;
        speakOutput = "User did not give all the proper metrics. Please try again";
      }
    }
    ////////////
    if(!shouldSkip){
        speakOutput = "You're cured!";
    }

    return response.speak(speakOutput)
                  .reprompt(speakOutput)
                  .getResponse();
  }
}



//////////////

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        bloodPressureHandler,
        oxygenLevelHandler,
        heartRateHandler,
        comfortLevelHandler,
        nauseaHandler,
        breathingHandler,
        bleedingHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
        )
    .addErrorHandlers(
        ErrorHandler,
        )
    .lambda();
