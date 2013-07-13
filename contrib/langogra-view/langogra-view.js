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
                    { id: 1, text: "argent", ghost: true },
                    { id: 2, text: "est", ghost: true },
                    { id: 3, text: "ici" },
                    { id: 4, text: "l'", prefix: true, ghost: true },
                    { id: 5, text: "la" },
                    { id: 6, text: "où", ghost: true },
                    { id: 7, text: "quand" },
                    { id: 8, text: "sont" }
                ];
                this.groups = [
                    [
                        { id: 6, text: "où", capital: true }
                    ],
                    [
                        { id: 2, text: "est" }
                    ],
                    [
                        { id: 4, text: "l'", prefix: true, ghost: true },
                        { id: 1, text: "argent" }
                    ],
                    [
                        { id: 0, text: "?" }
                    ]
                ];
            };
            return LangograController;
        })();
        view.LangograController = LangograController;
    })(langogra.view || (langogra.view = {}));
    var view = langogra.view;
})(langogra || (langogra = {}));

var langograApp = angular.module("langogra", []);
langograApp.controller("langograController", langogra.view.LangograController);
//@ sourceMappingURL=langogra-view.js.map
