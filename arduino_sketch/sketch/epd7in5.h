int EPD_7in5__init() 
{
  EPD_Reset();
  EPD_Send_2(0x01, 0x37, 0x00);            //POWER_SETTING 
  EPD_Send_2(0x00, 0xCF, 0x08);            //PANEL_SETTING
  EPD_Send_3(0x06, 0xC7, 0xCC, 0x28);      //BOOSTER_SOFT_START
  EPD_SendCommand(0x4);                    //POWER_ON
  EPD_WaitUntilIdle();
  EPD_Send_1(0x30, 0x3C);                  //PLL_CONTROL
  EPD_Send_1(0x41, 0x00);                  //TEMPERATURE_CALIBRATION
  EPD_Send_1(0x50, 0x77);                  //VCOM_AND_DATA_INTERVAL_SETTING
  EPD_Send_1(0x60, 0x22);                  //TCON_SETTING
  EPD_Send_4(0x61, 0x02, 0x80, 0x01, 0x80);//TCON_RESOLUTION
  EPD_Send_1(0x82, 0x1E);                  //VCM_DC_SETTING: decide by LUT file
  EPD_Send_1(0xE5, 0x03);                  //FLASH MODE  

  EPD_SendCommand(0x10);//DATA_START_TRANSMISSION_1  
  delay(2);
  return 0;
}
