import Component from '@ember/component';
import { later } from '@ember/runloop';

export default Component.extend({
  status: 'init',
  on: true,
  init: function() {
    //determine network status upon component launch
    this._super(...arguments);
    this.getNtwkStatus(this);
  },
  getNtwkStatus(component) {
    later(function() {
      try {
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';

        var conn = navigator.connection.type;
        component.set('status', states[conn]);
      }
      catch(err) {
        console.log('error: ' + err);
      }
      if(component.get('on')){
        //keep running
        component.getNtwkStatus(component); //recurse
      }
    }, 100);
  }
});
