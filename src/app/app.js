'use strict';

import angular from 'angular';
import { hello } from './hello/hello';

var app = angular.module('app', [
  hello.name
]);

angular.element(document).ready(function () {
  return angular.bootstrap(document.body, [app.name], {
    strictDi: true
  });
});

export default app;
