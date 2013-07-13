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
        {id: 1, text: "argent"},
        {id: 2, text: "est"},
        {id: 3, text: "ici"},
        {id: 4, text: "l'", prefix: true},
        {id: 5, text: "la"},
        {id: 6, text: "où"},
        {id: 7, text: "quand"},
        {id: 8, text: "sont"}
      ]
      this.groups = []
    }
  }
}

module langogra.dnd {
  export class DraggableDirective implements ng.IDirective {
    restrict: string = "A";

    link(scope, element, attrs) {
      var elementService = new ElementService()
      element.draggable({
        revert: true,
        helper: "clone",
        appendTo: "body",
        scroll: false,
        zIndex: 100,

        drag: function(event, ui) {
          var args = EventArgumentsFactory.build(element, event, ui)
          elementService.onDrag(args)
        },
        start: function(event, ui) {
          var args = EventArgumentsFactory.build(element, event, ui)
          elementService.onDragStart(args)
        },
        stop: function(event, ui) {
          var args = EventArgumentsFactory.build(element, event, ui)
          elementService.onDragStop(args)
        }
      })
    }
  }

  export class ElementService {
    dragArea: JQuery;
    dropArea: JQuery;
    dropState: DropState;

    constructor (dragArea?: JQuery, dropArea?: JQuery) {
      this.dragArea = dragArea
      this.dropArea = dropArea
      this.dropState = DropState.inDragArea()
    }

    onDrag(args: EventArguments) {
      console.log(args.element.text())
    }

    onDragStart(args: EventArguments) {
      args.element.removeClass("btn-primary").addClass("disabled")
    }

    onDragStop(args: EventArguments) {
      args.element.addClass("btn-primary").removeClass("disabled")
    }

    onDrop(args: EventArguments) {}
    onOverTarget(args: EventArguments) {}
    onOutOfTarget(args: EventArguments) {}
  }

  export class DropState {
    isOverTarget: boolean = false;
    isDropped: boolean = false;

    static inDragArea(): DropState {
      return new DropState()
    }
    static inDropArea(): DropState {
      var dropState = new DropState()
      dropState.isOverTarget = true
      return dropState
    }
  }

  export interface EventArguments {
    element: JQuery;
    helperElement?: JQuery;
    position: { top: number; left: number; };
    offset: { top: number; left: number; };
  }

  export class EventArgumentsFactory {
    static build(element, event, ui): EventArguments {
      return {
        element: element,
        helperElement: ui.helper,
        position: ui.position,
        offset: ui.offset
      }
    }
  }
}

var langograApp = angular.module("langogra", [])
langograApp.controller("langograCtrl", <Function>langogra.view.LangograController)
langograApp.directive("draggable", () => new langogra.dnd.DraggableDirective())
