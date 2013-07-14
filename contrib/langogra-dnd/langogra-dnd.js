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
                var draggable = element;
                element.draggable({
                    revert: true,
                    helper: "clone",
                    appendTo: "body",
                    scroll: false,
                    zIndex: 100,
                    drag: function (event, ui) {
                        var elementService = ElementServiceRegistry.retrieve(draggable);
                        var args = EventArgumentsFactory.build(draggable, event, ui);
                        elementService.onDrag(args);
                    },
                    start: function (event, ui) {
                        var elementService = new ElementService();
                        ElementServiceRegistry.register(draggable, elementService);
                        var args = EventArgumentsFactory.build(draggable, event, ui);
                        elementService.onDragStart(args);
                    },
                    stop: function (event, ui) {
                        var elementService = ElementServiceRegistry.retrieve(draggable);
                        var args = EventArgumentsFactory.build(draggable, event, ui);
                        elementService.onDragStop(args);
                    }
                });
            };
            return DraggableDirective;
        })();
        dnd.DraggableDirective = DraggableDirective;

        var DroppableDirective = (function () {
            function DroppableDirective() {
                this.restrict = "A";
            }
            DroppableDirective.prototype.link = function (scope, element, attrs) {
                element.droppable({
                    tolerance: "intersect",
                    drop: function (event, ui) {
                        var draggable = ui.draggable;
                        var elementService = ElementServiceRegistry.retrieve(draggable);
                        var args = EventArgumentsFactory.build(draggable, event, ui);
                        elementService.onDrop(args);
                    },
                    over: function (event, ui) {
                        var draggable = ui.draggable;
                        var elementService = ElementServiceRegistry.retrieve(draggable);
                        var args = EventArgumentsFactory.build(draggable, event, ui);
                        elementService.onOverTarget(args);
                    },
                    out: function (event, ui) {
                        var draggable = ui.draggable;
                        var elementService = ElementServiceRegistry.retrieve(draggable);
                        var args = EventArgumentsFactory.build(draggable, event, ui);
                        elementService.onOutOfTarget(args);
                    }
                });
            };
            return DroppableDirective;
        })();
        dnd.DroppableDirective = DroppableDirective;

        var ElementService = (function () {
            function ElementService(dragArea, dropArea) {
                this.dragArea = dragArea;
                this.dropArea = dropArea;
                this.dropState = DropState.inDragArea();
            }
            ElementService.prototype.onDrag = function (args) {
                console.log("drag", args.draggableHelper.text());
            };

            ElementService.prototype.onDragStart = function (args) {
                console.log("start", args.draggableHelper.text());
                args.draggable.removeClass("btn-primary").addClass("disabled");
            };

            ElementService.prototype.onDragStop = function (args) {
                console.log("stop", args.draggableHelper.text());
                args.draggable.addClass("btn-primary").removeClass("disabled");
            };

            ElementService.prototype.onDrop = function (args) {
                console.log("drop", args.draggableHelper.text());
            };

            ElementService.prototype.onOverTarget = function (args) {
                console.log("over", args.draggableHelper.text());
            };

            ElementService.prototype.onOutOfTarget = function (args) {
                console.log("out", args.draggableHelper.text());
            };
            return ElementService;
        })();
        dnd.ElementService = ElementService;

        var ElementServiceRegistry = (function () {
            function ElementServiceRegistry() {
            }
            ElementServiceRegistry.register = function (element, elementService) {
                ElementServiceRegistry.elementServices[element.text()] = elementService;
            };
            ElementServiceRegistry.retrieve = function (element) {
                return ElementServiceRegistry.elementServices[element.text()];
            };
            ElementServiceRegistry.elementServices = {};
            return ElementServiceRegistry;
        })();
        dnd.ElementServiceRegistry = ElementServiceRegistry;

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
            EventArgumentsFactory.build = function (draggable, event, ui) {
                return {
                    draggable: draggable,
                    draggableHelper: ui.helper,
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
langograApp.directive("droppable", function () {
    return new langogra.dnd.DroppableDirective();
});
//@ sourceMappingURL=langogra-dnd.js.map
