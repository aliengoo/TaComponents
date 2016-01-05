class RegistrationController {

  /* @ngInject */
  constructor($log, $state, registrationService, toastr) {
    this.credentials = {
      username: null, password: null
    };
    this.$state = $state;
    this.$log = $log;
    this.registrationService = registrationService;
    this.toastr = toastr;
    this.loading = false;
  }

  register() {
    this.loading = true;

    this.registrationService.register(this.credentials)
      .then(() => {
        //noinspection JSCheckFunctionSignatures
        this.$state.go("login");
      }, res => {
        this.toastr.error(res.statusText, "Registration Error");
      }).finally(() => {
      this.loading = false;
    });
  }
}

export default RegistrationController;

