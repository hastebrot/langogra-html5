var langogra;
(function (langogra) {
    (function (view) {
        var LangograController = (function () {
            function LangograController($scope) {
                $scope.vm = this;
                this.initViewModel();
            }
            LangograController.prototype.initViewModel = function () {
                this.text = "Wo ist das Geld (m)?";
                this.tokens = [
                    { id: 0, text: "?" },
                    { id: 1, text: "argent" },
                    { id: 2, text: "est" },
                    { id: 3, text: "ici" },
                    { id: 4, text: "l'", prefix: true },
                    { id: 5, text: "la" },
                    { id: 6, text: "où" },
                    { id: 7, text: "quand" },
                    { id: 8, text: "sont" }
                ];
                this.groups = [];
            };
            return LangograController;
        })();
        view.LangograController = LangograController;
    })(langogra.view || (langogra.view = {}));
    var view = langogra.view;
})(langogra || (langogra = {}));

var langogra;
(function (langogra) {
    (function (dnd) {
        var DraggableDirective = (function () {
            function DraggableDirective() {
                this.restrict = "A";
            }
            DraggableDirective.prototype.link = function (scope, element, attrs) {
                var elementService = new ElementService();
                element.draggable({
                    revert: true,
                    helper: "clone",
                    appendTo: "body",
                    scroll: false,
                    zIndex: 100,
                    drag: function (event, ui) {
                        var args = EventArgumentsFactory.build(element, event, ui);
                        elementService.onDrag(args);
                    },
                    start: function (event, ui) {
                        var args = EventArgumentsFactory.build(element, event, ui);
                        elementService.onDragStart(args);
                    },
                    stop: function (event, ui) {
                        var args = EventArgumentsFactory.build(element, event, ui);
                        elementService.onDragStop(args);
                    }
                });
            };
            return DraggableDirective;
        })();
        dnd.DraggableDirective = DraggableDirective;

        var ElementService = (function () {
            function ElementService(dragArea, dropArea) {
                this.dragArea = dragArea;
                this.dropArea = dropArea;
                this.dropState = DropState.inDragArea();
            }
            ElementService.prototype.onDrag = function (args) {
                console.log(args.element.text());
            };

            ElementService.prototype.onDragStart = function (args) {
                args.element.removeClass("btn-primary").addClass("disabled");
            };

            ElementService.prototype.onDragStop = function (args) {
                args.element.addClass("btn-primary").removeClass("disabled");
            };

            ElementService.prototype.onDrop = function (args) {
            };
            ElementService.prototype.onOverTarget = function (args) {
            };
            ElementService.prototype.onOutOfTarget = function (args) {
            };
            return ElementService;
        })();
        dnd.ElementService = ElementService;

        var DropState = (function () {
            function DropState() {
                this.isOverTarget = false;
                this.isDropped = false;
            }
            DropState.inDragArea = function () {
                return new DropState();
            };
            DropState.inDropArea = function () {
                var dropState = new DropState();
                dropState.isOverTarget = true;
                return dropState;
            };
            return DropState;
        })();
        dnd.DropState = DropState;

        var EventArgumentsFactory = (function () {
            function EventArgumentsFactory() {
            }
            EventArgumentsFactory.build = function (element, event, ui) {
                return {
                    element: element,
                    helperElement: ui.helper,
                    position: ui.position,
                    offset: ui.offset
                };
            };
            return EventArgumentsFactory;
        })();
        dnd.EventArgumentsFactory = EventArgumentsFactory;
    })(langogra.dnd || (langogra.dnd = {}));
    var dnd = langogra.dnd;
})(langogra || (langogra = {}));

var langograApp = angular.module("langogra", []);
langograApp.controller("langograCtrl", langogra.view.LangograController);
langograApp.directive("draggable", function () {
    return new langogra.dnd.DraggableDirective();
});
//@ sourceMappingURL=langogra-dnd.js.map
