"use strict";

$(document).ready(function(){
  var thermostat = new Thermostat();
  updateEnergyUsage();
  updateCityTemp();
  jQuery('#up').click(function(){
    thermostat.up();
  });
  $('#down').click(function(){
    thermostat.down();
  });
  $('#reset').click(function(){
    thermostat.reset();
  });
  $('.thermo').click(function(){
    updateTemperature();
    updateEnergyUsage();
  });
  $('#powerSavingMode').click(function(){
    thermostat.changePowerSaving();
    updatePowerSaving();
  });
  $('#currentCity').change(function(){
    updateCityTemp();
  });
  function updateTemperature() {
    $('#temp_display').text(thermostat.temperature);
  }
  function updatePowerSaving() {
    $('#psm_display').text(onOrOff());
  }
  function updateEnergyUsage(){
    $('#energy_display').text(thermostat.energyUsage());
    $('#energy_display').attr('class',thermostat.energyUsage());
  }
  function onOrOff() {
    return thermostat.isPowerSaving ? 'ON' : 'OFF';
  }
  function updateCityTemp() {
    var city = $('#currentCity');
    $('#cityDisplay').text($("#currentCity option:selected").text());
    $.get('http://api.openweathermap.org/data/2.5/weather?q='+city.val()+'&appid=a3d9eb01d4de82b9b8d0849ef604dbed',function(data){
      $('#cityTemp').text(Math.round(data.main.temp - 273.15));
    })
  };

});
