const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = { //Launches application
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome to AideSquared. Please answer the following questions as prompted to assess patient risk. What is the systolic blood pressure?';
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
    if(isNumber(num) && (num > 70 && num < 200)){ //out of realistic range, invalid
      attributes.stage++;
      attributes.bloodPressureSys = num;
      speakOutput = "Next question: What is the patient's diastolic blood pressure?"; 
    }else{
      speakOutput = "Please say a valid integer for systolic blood pressure.";
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
    if(isNumber(num) && (num > 40 && num < 130)){ //out of realistic range, invalid
      attributes.stage++;
      attributes.bloodPressureDia = num;
      speakOutput = "Next question: What is the patient's blood oxygen level?";
    }else{
      speakOutput = "Please say a valid integer for diastolic blood pressure.";
    }

    return response.speak(speakOutput)
                  .reprompt(speakOutput)
                  .getResponse();
  }
}

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
    if(isNumber(num) && (num >= 0 && num <= 100) ){ //out of realistic range, invalid
      attributes.stage++;
      attributes.oxygenLevel = num;
      speakOutput = "Next question: What is the patient's heart rate?";
    }else{
      speakOutput = "Please say an integer between 0 and 100 for blood oxygen percentage";
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
      if(isNumber(num) && (num >= 40 && num <= 160)){ //out of realistic range, invalid
        attributes.stage++;
        attributes.heartRate = num;
        speakOutput = "Next question: What is the patient's general pain level on a scale of 0 to 10? 0 is equivalent to no pain, while 10 is equivalent to severe pain.";
      }else{
        speakOutput = "Please say a valid integer for heart rate.";
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
    if(isNumber(num) && (num >= 0 && num <= 10) ){ //out of realistic range, invalid
      attributes.stage++;
      attributes.comfortLevel = num;
      speakOutput = "Next question: What is the patient's nausea level on a scale of 0 to 10? 0 is equivalent to no nausea, while 10 is equivalent to severe vomitting";
    }else{
      speakOutput = "Please say an integer from 0 to 10 corresponding general pain level.";
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
    if(isNumber(num) && (num >= 0 && num <= 10) ){ //out of realistic range, invalid
      attributes.stage++;
      attributes.nausea = num;
      speakOutput = "Next question: What is the patient's level of pain associated with breathing on a scale of 0-10? 0 is equivalent to no pain, while 10 is equivalent to severe pain while breathing";
    }else{
      speakOutput = "Please say an integer from 0 to 10 corresponding to nausea.";
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
    if(isNumber(num) && (num >= 1 && num <= 10)){ //out of realistic range, invalid
      attributes.stage++;
      attributes.breathing = num;
      speakOutput = "Final question: How heavily is the patient experiencing vaginal bleeding? 0 is equivalent to no bleeding, while 10 is equivalent to heavy bleeding.";
    }else{
      speakOutput = "Please say an integer between 0 to 10 associated with pain while breathing.";
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
    if(isNumber(num) && (num >= 1 && num <= 10)){ //out of realistic range, invalid
      attributes.stage++;
      attributes.bleeding = num;
    }else{
      speakOutput = "Please say an integer between 0 and 10 associated with vaginal bleeding";
      return response.speak(speakOutput)
                    .reprompt(speakOutput)
                    .getResponse();
    }

    //************CALCULATIONS*****************/

    //calculation stage- check for null
    let shouldSkip = false;
    let arr = Object.keys(attributes);
    for(let i = 0; i < arr; i++){
      if(attributes.arr[i] == null){
        shouldSkip = true;
        speakOutput = "User did not give all proper metrics. Please restart and try again";
      }
    }

    int acc = 0; //accumulator for figuring out if nurse should be contacted

    //Calculation for Systolic Blood Pressure:
    int x = attributes.bloodPressureSys;
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
    x = attributes.bloodPressureDia;
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

    //OUTCOMES
    if(acc<2) speakOutput = "The patient is of low concern. Immediate attention is not required."; 
    else if(acc == 2) speakOutput = "The patient is of medium concern. Text nurse with symptoms and monitor closely."; //Future version would notify the nurse through WhatsApp to come to the patient when available
    else speakOutput = "The patient is of high concern. Call nurse immediately for assistance."; //Future version would automatically call nurse with WhatsApp

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
