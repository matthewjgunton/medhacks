const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome to AideSquared. Please answer the following questions as prompted. What is the systolic blood pressure?';
        const attributes = handlerInput.attributesManager.getSessionAttributes();

        attributes.stage = 0;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const bloodPressureSystolicHandler = {
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
    let num = handlerInput.requestEnvelope.request.intent.slots.mui.value;
    let speakOutput;
    if(isNumber(num) ){
      attributes.stage++;
      attributes.bloodPressure = num;
      speakOutput = "Next question: What is the patient's diastolic blood pressure?";
    }else{
      speakOutput = "Please enter a number for blood pressure";
    }

    return response.speak(speakOutput)
                  .reprompt(speakOutput)
                  .getResponse();
  }
}

const bloodPressureDiastolicHandler = {
  canHandle(handlerInput){
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const request = handlerInput.requestEnvelope.request;

    return (request.intent.name === "NumberIntent") &&
          request.type === 'IntentRequest' && attributes.stage == 1;
  },
  handle(handlerInput){
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const response = handlerInput.responseBuilder;

    //initializing attributes vars
    let num = handlerInput.requestEnvelope.request.intent.slots.mui.value;
    let speakOutput;
    if(isNumber(num)){
      attributes.stage++;
      attributes.bloodPressureTwo = num;
      speakOutput = "Next question: What is the patient's oxygen level?";
    }else{
      speakOutput = "Please enter a number for blood pressure";
    }

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
          request.type === 'IntentRequest' && attributes.stage == 2;
  },
  handle(handlerInput){
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const response = handlerInput.responseBuilder;

    //initializing attributes vars
    let num = handlerInput.requestEnvelope.request.intent.slots.mui.value;
    let speakOutput;
    if(isNumber(num) && (num >= 0 && num <= 100) ){
      attributes.stage++;
      attributes.oxygenLevel = num;
      speakOutput = "Next question: What is the patient's heart rate?";
    }else{
      speakOutput = "Please enter a number from 1 to 100 for oxygen level";
    }

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
            request.type === 'IntentRequest' && attributes.stage == 3;
    },
    handle(handlerInput){
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      const response = handlerInput.responseBuilder;

      let num = handlerInput.requestEnvelope.request.intent.slots.mui.value;
      let speakOutput;
      if(isNumber(num)){
        attributes.stage++;
        attributes.heartRate = num;
        speakOutput = "Next question: What is the patient's pain level on a scale of 0 to 10? 0 equals no pain, 10 equals severe pain";
      }else{
        speakOutput = "Please enter a number for heart rate";
      }

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
          request.type === 'IntentRequest' && attributes.stage == 4;
  },
  handle(handlerInput){
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const response = handlerInput.responseBuilder;

    //initializing attributes vars
    let num = handlerInput.requestEnvelope.request.intent.slots.mui.value;
    let speakOutput;
    if(isNumber(num) && (num >= 1 && num <= 10) ){
      attributes.stage++;
      attributes.comfortLevel = num;
      speakOutput = "Next question: What is the patient's nausea level on a scale of 0 to 10? 0 equals no nausea, 10 equals severe vomitting";
    }else{
      speakOutput = "Please enter a number from 1 to 10 for comfort level";
    }

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
          request.type === 'IntentRequest' && attributes.stage == 5;
  },
  handle(handlerInput){
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const response = handlerInput.responseBuilder;

    //initializing attributes vars
    let num = handlerInput.requestEnvelope.request.intent.slots.mui.value;
    let speakOutput;
    if(isNumber(num) && (num >= 1 && num <= 10) ){
      attributes.stage++;
      attributes.nausea = num;
      speakOutput = "Next question: Is the patient experiencing pain associated with breathing? 0 equals no pain, 10 equals severe pain while breathing";
    }else{
      speakOutput = "Please enter a number from 1 to 10 for nausea";
    }

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
          request.type === 'IntentRequest' && attributes.stage == 6;
  },
  handle(handlerInput){
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const response = handlerInput.responseBuilder;

    //initializing attributes vars
    let num = handlerInput.requestEnvelope.request.intent.slots.mui.value;
    let speakOutput;
    if(isNumber(num) && (num >= 1 && num <= 10)){
      attributes.stage++;
      attributes.breathing = num;
      speakOutput = "Final question: Is the patient experiencing vaginal bleeding? Responses include none, light, medium, or heavy.";
    }else{
      speakOutput = "Please enter a number from 1 to 10 for breathing";
    }

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
          request.type === 'IntentRequest' && attributes.stage == 7;
  },
  handle(handlerInput){
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const response = handlerInput.responseBuilder;

    //initializing attributes vars
    let num = handlerInput.requestEnvelope.request.intent.slots.mui.value;
    let speakOutput;
    if(isNumber(num) && (num >= 1 && num <= 10)){
      attributes.stage++;
      attributes.bleeding = num;
    }else{
      speakOutput = "Please enter a number from 1 to 10 for bleeding";
      return response.speak(speakOutput)
                    .reprompt(speakOutput)
                    .getResponse();
    }

    ////////////
    //calculation stage- check for null
    let shouldSkip = false;
    let arr = Object.keys(attributes);
    for(let i = 0; i < arr; i++){
      if(attributes.arr[i] == null){
        shouldSkip = true;
        speakOutput = "User did not give all the proper metrics. Please try again";
      }
    }
    ////////////
    /*if(!shouldSkip){
        speakOutput = "You're cured!";
    }*/
    int acc = 0; //accumulator for figuring out if nurse should be contacted

    //Calculation for Systolic Blood Pressure:
    int x = attributes.bloodPressure;
    switch(true) {
      case (x < 90):
        acc+=3;
        break;
      case (x >= 90 && x < 140):
        break;
      case (x >= 140 && x < 160):
        acc+=2;
        break;
      case (x >= 160):
        acc+=2;
        break;
    }
    
    //Calculation for Diastolic Blood Pressure:
    x = attributes.bloodPressureTwo;
    switch(true) {
      case (x < 60):
        acc+=3;
        break;
      case (x >= 60 && x < 90):
        break;
      case (x >= 90 && x < 110):
        acc+=2;
        break;
      case(x >= 110):
        acc+=3;
        break;
    }

    //Calculation for Oxygen Saturation
    x = attributes.breathing;
    switch(true) {
      case (x>=95):
        break;
      case (x<95 && x>=90):
        acc+=2;
        break;
      case(x<90):
        acc+=3;
        break;
    }

    //Calculation for Pulse
    x = attributes.heartRate;
    switch(true) {
      case (x<60):
        acc+=3;
        break;
      case(x>=60 && x<100):
        break;
      case(x>100 && x<120):
        acc+=2;
        break;
      case (x>=120):
        acc+=3;
        break;
    }

    //Calculation for Vaginal Bleeding
    x = attributes.bleeding;
    switch(true) {
      case (x<=4):
        break;
      case(x>4 && x<=7):
        acc+=2;
        break;
      case(x>7 && x<=10):
        acc+=3;
        break;
    }
    
    //Calculation for Trouble Breathing
    x = attributes.breathing;
    switch(true) {
      case (x<=4):
        break;
      case(x>4 && x<=7):
        acc+=2;
        break;
      case(x>7 && x<=10):
        acc+=3;
        break;
    }
    
    //Calculation for Nausea
    x = attributes.nausea;
    switch(true) {
      case (x<=4):
        break;
      case(x>4 && x<=7):
        acc+=2;
        break;
      case(x>7 && x<=10):
        acc+=3;
        break;
    }

    //Calculation for General Pain/Well Being
    switch(true) {
      case (x<=4):
        break;
      case(x>4 && x<=7):
        acc+=2;
        break;
      case(x>7 && x<=10):
        acc+=3;
        break;
    }

    if(acc<2) speakOutput = "No concerns."
    else if(acc == 2) speakOutput = "Text nurse.";
    else speakOutput = "Call nurse.";

    return response.speak(speakOutput)
                  .reprompt(speakOutput)
                  .getResponse();
  }
}


function isNumber(potentialNum){

  for(let i = 0; i < potentialNum.length; i++){
    if (!potentialNum[i].match(/[0-9]/)){
      return false;
    }
  }
  return true;

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
        bloodPressureSystolicHandler,
        bloodPressureDiastolicHandler,
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
