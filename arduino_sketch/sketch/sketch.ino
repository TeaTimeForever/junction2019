#include <ESP8266WiFi.h>          //ESP8266 Core WiFi Library (you most likely already have this in your sketch)

#include <DNSServer.h>            //Local DNS Server used for redirecting all requests to the configuration portal
#include <ESP8266WebServer.h>     //Local WebServer used to serve the configuration portal
//#include <WiFiManager.h>          //https://github.com/tzapu/WiFiManager WiFi Configuration Magic
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <EEPROM.h>
#include "FS.h"

#include "epd.h"

//const char* host = "ink.nux.solutions";
//const uint16_t port = 80;
//const char* host = "192.168.1.112";
//const uint16_t port = 3000;

ESP8266WiFiMulti WiFiMulti;

#define MINBATT 840 // TODO: Not sure yet what voltage does it map to. Will need to investigate
#define BATT_FLAG 0

void setup() {
  Serial.begin(115200);
  
  // WiFiManager wifiManager;
  // wifiManager.autoConnect("eInk");

  pinMode(CS_PIN  , OUTPUT);
  pinMode(RST_PIN , OUTPUT);
  pinMode(DC_PIN  , OUTPUT);
  pinMode(BUSY_PIN,  INPUT);
  SPI.begin();
  EEPROM.begin(4);

  WiFiMulti.addAP("Junction", "SecureIoT");
}

void sendBufferToPD(byte bytes[], unsigned int size) {
  for (int j = 0; j < size; j++) {
    byte b = bytes[j];
    for (int i = 0; i < 2; i++) {
      int sendByte = 0;
      if ((b & 0x03) == 0x03){
        sendByte = 0x40;
      } else if((b & 0x03) == 0x01){
        sendByte = 0x30;
      }
      b = b >> 2;
      if ((b & 0x03) == 0x03){
        sendByte |=  0x04;
      } else if ((b & 0x03) == 0x01){
        sendByte |=  0x03;
      }
      b = b >> 2;
      EPD_SendData((byte)sendByte);
    }
  }
}

void renderBattImage() {
  SPIFFS.begin();
  File file = SPIFFS.open("/low_batt.ink", "r");
  File * stream = &file;
  int len = file.size();
  Serial.print("File size: ");
  Serial.println(len);

  EPD_dispInit();

  byte buffer[128] = { 0 };
  while (len > 0) {
    int c = stream->readBytes((char*)buffer, std::min((size_t)len, sizeof(buffer)));
    sendBufferToPD(buffer, c);
    len -= c;
  }
  file.close();
  SPIFFS.end();
  EPD_disp.show();
}

void loop() {
  // Check the battery
  int val = analogRead(A0);
  Serial.print("Batt val: ");
  Serial.println(val);
  byte battRendered = EEPROM.read(BATT_FLAG);
  if (val < MINBATT) {
    // Check, if lowBatt image has already been painted
    if (battRendered != 1) {
      Serial.println("Rendering batt image");
      // Paint the display with lowbatt image and update eeprom
      EEPROM.write(BATT_FLAG, 1);
      renderBattImage();
    }
    unsigned long int maxSleep = ESP.deepSleepMax();
    Serial.println("Going to sleep to save energy");
    ESP.deepSleep(maxSleep);
    return;
  } else if (battRendered == 1) {
    // Set back the batt flag in EEPROM
    EEPROM.write(BATT_FLAG, 0);
  }

  WiFi.mode(WIFI_STA);

  if ((WiFiMulti.run() != WL_CONNECTED)) {
    Serial.println("WiFi not connected");
    delay(2000);
    return;
  }

  Serial.println("Connected!");

  // Connect to host
  WiFiClient client;
  HTTPClient http;

  char url [80];
  sprintf(url, "http://ink.nux.solutions/render/upbeat/eink?voltage=%d", val);

  http.begin(client, url);

  const char *keys[] = { "Sleep" };
  http.collectHeaders(keys, 1);

  int httpCode = http.GET();

  if (httpCode != HTTP_CODE_OK) {
    Serial.print("GET Request failed: ");
    Serial.println(httpCode);
    delay(10000);
    return;
  }

  String secondsString = http.header("Sleep");
  int n = secondsString.length();
  char secondsChr[n];
  for (int i = 0; i < n; i++) {
    secondsChr[i] = secondsString[i];
  }
  secondsChr[n] = NULL;

  int sleepSeconds = strtol(secondsChr, NULL, 10);

  Serial.print("Sleep header: ");
  Serial.println(sleepSeconds);
  
  // Initialise the display
  EPD_dispInit();

  int len = http.getSize();

  uint8_t buffer[128] = { 0 };

  WiFiClient * stream = &client;

  while (http.connected() && (len > 0 || len == -1)) {
    // read up to 128 byte
    int c = stream->readBytes(buffer, std::min((size_t)len, sizeof(buffer)));
    if (!c) {
      Serial.println("read timeout");
    }

    // write it to Paper display
    sendBufferToPD(buffer, c);

    if (len > 0) {
      len -= c;
    }

    delay(10);
  }

  Serial.println("END");

  http.end();

  client.stop();

  // Wifi can be turned off now
  WiFi.mode(WIFI_OFF);

  Serial.println("SHOW");
  EPD_disp.show();
  Serial.print("SLEEPING NOW Seconds:");
  Serial.println(sleepSeconds);

  delay(sleepSeconds * 1000);
}
