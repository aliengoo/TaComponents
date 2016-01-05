/* @ngInject */
export default function appRun($rootScope, $log, $state, $q, verifyAccessService, OnVerificationErrorStateName) {

  let _canceller;
  let _lastStateName;

  /**
   * Run when the state changes
   * @param event
   * @param toState
   * @param toParams
   */
  function onStateChangeStart(event, toState, toParams) {
    if (toState.auth) {
      event.preventDefault();

      if (_canceller) {
        _canceller.resolve();
      }

      _canceller = $q.defer();

      const continueToState = function () {
        // don't notify automatically, instead, complete the state change, and then notify manually
        $state.go(toState, toParams, {notify: false}).then(state => {
          $rootScope.$broadcast("$stateChangeSuccess", state, null);
        });
      };

      const onSuccessfulVerification = function () {
        // if the _lastStateName is not the current state name; then continue to state.
        // if the _lastStateName is the current state name, do nothing
        if (_lastStateName !== toState.name) {
          continueToState();
        }
      };

      const onFailedVerification = function () {
        $log.error("Not authorised");

        if (toState.name === OnVerificationErrorStateName) {
          continueToState();
        } else {
          $state.go(OnVerificationErrorStateName);
        }
      };

      const cleanUpVerification = function () {
        // ensure the canceller has been resolved
        if (_canceller) {
          _canceller.resolve();
        }
      };

      // verify the current state change
      verifyAccessService.verify().then(
        onSuccessfulVerification,
        onFailedVerification).finally(
        cleanUpVerification);
    }
  }

  $rootScope.$on("$stateChangeStart", onStateChangeStart);

  $rootScope.$on("$stateChangeSuccess", (event, toState) => {
    _lastStateName = toState.name;
  });
};