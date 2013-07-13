/// <reference path="_definitions.d.ts" />

module langogra.view {
  export interface IViewModelScope extends ng.IScope {
    vm: any;
  }

  export interface Token {
    id: number;
    text: string;
    ghost?: boolean;
    capital?: boolean;
    prefix?: boolean;
    suffix?: boolean;
  }

  export class LangograController {
    text: string;
    tokens: Array<Token>;
    groups: Array<Array<Token>>;

    constructor ($scope: IViewModelScope) {
      $scope.vm = this
      this.initViewModel()
    }

    initViewModel() {
      this.text = "Wo ist das Geld (m)?"
      this.tokens = [
        {id: 0, text: "?"},
        {id: 1, text: "argent", ghost: true},
        {id: 2, text: "est", ghost: true},
        {id: 3, text: "ici"},
        {id: 4, text: "l'", prefix: true, ghost: true},
        {id: 5, text: "la"},
        {id: 6, text: "où", ghost: true},
        {id: 7, text: "quand"},
        {id: 8, text: "sont"}
      ]
      this.groups = [
        [
          {id: 6, text: "où", capital: true}
        ],
        [
          {id: 2, text: "est"}
        ],
        [
          {id: 4, text: "l'", prefix: true, ghost: true},
          {id: 1, text: "argent"}
        ],
        [
          {id: 0, text: "?"}
        ]
      ]
    }
  }
}

var langograApp = angular.module("langogra", [])
langograApp.controller("langograController", <Function>langogra.view.LangograController)
