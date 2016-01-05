import './navbarHeader';
import template from './navbar.html';

/* @ngInject */
export default function navbar() {
  return {
    restrict: 'E',
    template
  };
}