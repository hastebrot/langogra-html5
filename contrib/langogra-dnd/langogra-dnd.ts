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
      var draggable = element
      var elementService = new ElementService()
      ElementServiceRegistry.register(draggable, elementService)
      draggable.draggable({
        revert: true,
        helper: "clone",
        appendTo: "body",
        scroll: false,
        zIndex: 100,

        drag: function(event, ui) {
          var args = DragArgumentsFactory.build(draggable, event, ui)
          elementService.onDrag(args)
        },
        start: function(event, ui) {
          var args = DragArgumentsFactory.build(draggable, event, ui)
          elementService.onDragStart(args)
        },
        stop: function(event, ui) {
          var args = DragArgumentsFactory.build(draggable, event, ui)
          elementService.onDragStop(args)
        }
      })
    }
  }

  export class DroppableDirective implements ng.IDirective {
    restrict: string = "A";

    link(scope, element, attrs) {
      var droppable = element
      droppable.droppable({
        tolerance: "intersect",
        //tolerence: "touch",

        drop: function(event, ui) {
          var draggable = ui.draggable
          var elementService = ElementServiceRegistry.retrieve(draggable)
          var args = DragArgumentsFactory.build(draggable, event, ui)
          elementService.onDrop(args)
        },
        over: function(event, ui) {
          var draggable = ui.draggable
          var elementService = ElementServiceRegistry.retrieve(draggable)
          var args = DragArgumentsFactory.build(draggable, event, ui)
          elementService.onOverTarget(args)
        },
        out: function(event, ui) {
          var draggable = ui.draggable
          var elementService = ElementServiceRegistry.retrieve(draggable)
          var args = DragArgumentsFactory.build(draggable, event, ui)
          elementService.onOutOfTarget(args)
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

    onDrag(args: DragArguments) {
      console.log("drag", args.draggableHelper.text())
    }

    onDragStart(args: DragArguments) {
      console.log("start", args.draggableHelper.text())
      args.draggable.removeClass("btn-primary").addClass("disabled")
    }

    onDragStop(args: DragArguments) {
      console.log("stop", args.draggableHelper.text())
      args.draggable.addClass("btn-primary").removeClass("disabled")
    }

    onDrop(args: DragArguments) {
      console.log("drop", args.draggableHelper.text())
    }

    onOverTarget(args: DragArguments) {
      console.log("over", args.draggableHelper.text())
    }

    onOutOfTarget(args: DragArguments) {
      console.log("out", args.draggableHelper.text())
    }
  }

  export class ElementServiceRegistry {
    static register(element: JQuery, elementService: ElementService) {
      element.data("langogra.dnd.ElementService", elementService)
    }
    static retrieve(element: JQuery): ElementService {
      return element.data("langogra.dnd.ElementService")
    }
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

  export interface DragArguments {
    draggable: JQuery;
    draggableHelper?: JQuery;
    position: { top: number; left: number; };
    offset: { top: number; left: number; };
  }

  export class DragArgumentsFactory {
    static build(draggable, event, ui): DragArguments {
      return {
        draggable: draggable,
        draggableHelper: ui.helper,
        position: ui.position,
        offset: ui.offset
      }
    }
  }
}

var langograApp = angular.module("langogra", [])
langograApp.controller("langograCtrl", <Function>langogra.view.LangograController)
langograApp.directive("draggable", () => new langogra.dnd.DraggableDirective())
langograApp.directive("droppable", () => new langogra.dnd.DroppableDirective())
