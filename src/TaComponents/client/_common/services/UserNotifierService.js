import angular from 'angular';


// NOTE: Animations are broken
// see https://github.com/Foxandxss/angular-toastr/issues/136
export default class UserNotifierService {
  /* @ngInject */
  constructor($log, toastr) {
    this.$log = $log;
    this.toastr = toastr;
  }

  info(message, title) {
    console.log("Notification");
    this.$log.info(`${title}: ${message}`);
    this.toastr.info(message, title);
  }

  error(message, title) {
    this.$log.error(`${title}: ${message}`);
    this.toastr.error(message, title);
  }

  warn() {
    this.$log.warn(`${title}: ${message}`);
    this.toastr.warn(message, title);
  }
}

/* @ngInject */
export function userNotifierServiceConfig(toastrConfig) {
  //noinspection MagicNumberJS
  angular.extend(toastrConfig, {
    positionClass: 'toast-bottom-right',
    preventDuplicates: true,
    progressBar: true,
    timeOut: 3000
  });
}