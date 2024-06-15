const axios = require("axios");


const mqtt = require("mqtt");
// var FCM = new fcm(certPath);


var slots_open_tag = false;
var currentindex = 0;
const required_date = "30 Aug 2024";



const brokerUrl = "mqtt://broker.emqx.io";

const topic = "/9666222330";

const debugtopic = "/9666222330_debug";

const apikeys = [
  "DNZU3J",
  "F2X87H",
  "9X3LSF",
  "FTAVKF",
  "V9VWWD",
  "UNKDBU",
  "LIYYDW",
  "44A4FX",
  "EP9JBT",
  "JMMXO4",

  "GJJSBZ",
  "DLZ7WL",
  "QYSZWY",
  "RRHFNW",
  "ACHTBL",
  "VFFV2K",
  "YK4CG8",
  "86YZ4R",
  "S1IPBI",
  "BJ1VA4",

  "AIKGLJ",
  "VDJCRX",
  "Y6OU1M",
  "F2MSYO",
  "BP9XFQ",
  "5EMKRO",
  "HIM4E5",
  "I7UOTJ",
  "YAYR4C",
  "91X173",

  "6WVT2L",
  "G7YSW7",
  "X1G19T",
  "V6JQ6S",
  "YE2BOE",
  "A6BT2E",
  "YVXHMM",
  "XTDEHV",
  "JQJ6LF",
  "XFF43F",

  "Z6HUJD",
  "OSF87X",
  "5SKC8D",
  "ZLAMQW",
  "V7Y1D8",
  "MZYFH8",
  "FOI4DU",
  "2URY1W",
  "AXSMBN",
  "NL6U82",

  "8CXWJN",
  "M59D92",
  "TXZF4Z",
  "YBYQ9S",
  "TWIMYX",
  "NBDFDJ",
  "AHQLSM",
  "SV2FJS",
  "KR2HN4",
  "9X8KCN",

  "XLH7LR",
  "7TZLVJ",
  "QX8E9B",
  "J8THEX",
  "J3WTT4",
  "SFL1RL",
  "4T9CY3",
  "N4PYWC",
  "LCMPNS",
  "3XV2SU",
];

const options = {
  clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8), // Generate a random client ID
  clean: true, // Clean session on connect
};

const client = mqtt.connect(brokerUrl, options);

client.on("connect", function () {
  console.log("Connected to EMQX broker");

  // Publish a message to topic /9666222330

  setInterval(() => {


    currentindex=currentindex+1;

    try {
      const axios = require("axios");

      const url = "https://app-uat.checkvisaslots.com/slots/v3";
      const headers = {
        "x-api-key": apikeys[currentindex],
        "x-mobile-os": "android",
        "User-Agent": "Dart/3.2 (dart:io)",
      };

      axios
        .get(url, { headers })
        .then((response) => {
          if (response.data["slotDetails"])
            // console.log(response.data["slotDetails"]);

          var slotDetails = response.data["slotDetails"];

          var slotsavv = false;

          slotDetails.forEach(function (location) {
            if (location.slots > 0 && location.start_date) {
              // Assuming start_date is in 'DD MMM YYYY' format (e.g., '20 Jun 2024')
              var startDate = new Date(location.start_date);
              var requiredDate = new Date(required_date);

              if (startDate < requiredDate) {
                slotsavv = true;
              }
            }
          });

          client.publish(
            topic,
            JSON.stringify({
              slots: slotsavv,
            }),
            function (err) {
              if (err) {
                // console.error("Error publishing message:", err);
              } else {
                // console.log("Message published successfully");
              }
            }
          );

          client.publish(
            debugtopic,
            JSON.stringify({
              data: slotDetails,
              index:currentindex
            }),
            function (err) {
              if (err) {
                console.error("Error publishing message:", err);
              } else {
                console.log("Message published successfully");
              }
            }
          );
        })
        .catch((error) => {
          client.publish(
            topic,
            JSON.stringify({
              err: true,
            }),
            function (err) {
              if (err) {
                console.error("Error publishing message:", err);
              } else {
                console.log("Message published successfully");
              }
            }
          );

          client.publish(
            debugtopic,
            JSON.stringify({
              err: error,
              index:currentindex
            }),
            function (err) {
              if (err) {
                console.error("Error publishing message:", err);
              } else {
                console.log("Message published successfully");
              }
            }
          );

          console.error("Error making the request:", error);
        });
    } catch (d) {}




    if(currentindex==70){


      currentindex=0;



    }
    else{

    }
  }, 20000);
});

client.on("error", function (err) {
  console.error("Error connecting to EMQX broker:", err);
});

// https://drive.google.com/drive/folders/1DL9kN1ZpEKJxlCMe1DxrtnSDphew1qPu

// react js

// const fetch = require('node-fetch');
