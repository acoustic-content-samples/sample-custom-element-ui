/*
 * Copyright IBM Corp. 2018
 */

var app = angular.module('app', [
    'ui.bootstrap',
    'category',
]);

var category = angular.module('category', [ ]);

var CategoryController = function ($scope, $http) {
    this.selectedItem = null;
    this.openPath = [];
    this.ROOT_OPEN_DEPTH = 1;
    this.preserveSelection = false;
    this.parsedData = [];
    $scope.selectedCategories = [];
    this.stopPropagation = false;
    // Set to true if you want to retrieve data from server
    this.fromServer = false;
    $scope.categories = [];
    $scope.status = {
        isopen: false
    };
    this.isPublished = false;

    this.$onInit = function() {
        wchUIExt.requestResizeFrame(100);
        this.getCategories(this.fromServer);
        this.parseData($scope.categories);
        this.getSelectedCategories();
        this.checkIfDisabled();
        this._selectionUpdate();
    };

    this.$onChanges = function(changesObj) {
        this._selectionUpdate();
    };

    this.getSelectedItem = function() {
        return this.selectedItem;
    };

    this._changeRoot = function(item, event) {
        this.openPath.push(item);
        if (event) {
            event.stopPropagation();
        }
    };

    this._selectItem = function(item, event) {
        let stopPropagation = this.stopPropagation;
        if (this.isItemSelectable(item)) {
            if (this.preserveSelection) {
                this.selectedItem = item;
            } else {
                this.openPath = [];
            }
            $scope.status.isopen = false;
            this.onHierarchyItemSelect(item);
        } else {
            stopPropagation = true;
        }
        if (stopPropagation && event) {
            event.stopPropagation();
        }
    };

    this.onHierarchyItemSelect = function(item) {
        let alreadySelectedItems = $scope.selectedCategories.filter(v => v.id === item.id);
        if (alreadySelectedItems.length === 0) {
            $scope.selectedCategories = $scope.selectedCategories.concat($scope.categories.filter(v => v.id === item.id));
            this.updateValues();
        }
    };

    this._goUp = function(event) {
        this.openPath.pop();
        if (event) {
            event.stopPropagation();
        }
    };

    this.isItemSelected = function(item) {
        return this.selectedItem === item;
    };

    this.isOnPath = function(item) {
        let isOnPath = false;
        this.openPath.forEach(element => {
            if (element === item) {
                isOnPath = true;
            }
        });
        return isOnPath;
    };

    this.isCurrentRoot = function(item) {
        if (this.openPath) {
            return this.openPath[this.openPath.length - 1] === item;
        } else {
            return false;
        }
    };

    this.isNoRoot = function() {
        return !this.openPath || this.openPath.length <= 0;
    };

    this.isItemSelectable = function(item) {
        let selectedItemDepth = this._calculateItemDepth(item);
        return !item.children || selectedItemDepth > this.ROOT_OPEN_DEPTH;
    };

    this._selectionUpdate = function() {
        this.openPath = [];
        if (this.parsedData) {
            if (this.selectedId) {
                this._selectById({
                    children: this.parsedData,
                    id: 'ROOT_ID',
                    name: 'ROOT_TITLE'
                }, this.selectedId);
            } else if (this.parsedData.length === 1) {
                this._changeRoot(this.parsedData[0]);
            }
        }
    };

    this._selectById = function(root, id) {
        if (root.id !== 'ROOT_ID') {
            this._changeRoot(root);
        }

        if (root.id === id) {
            if (this.openPath.length >= 1) {
                this._goUp();
            }
            this.selectedItem = root;
            return true;
        } else if (root.children) {
            for (let index = 0; index < root.children.length; index++) {
                let element = root.children[index];
                if (this._selectById(element, id)) {
                    return true;
                }
            }
            this._goUp();
        } else {
            this._goUp();
            return false;
        }
    };

    this._calculateItemDepth = function(item) {
        if (item.parent) {
            return this._calculateItemDepth(item.parent) + 1;
        } else {
            return 1;
        }
    };

    /**
     * Getting all categories from a service
     * Can define local defined JSON or make an API Call to external service (e.g. Websphere Commerce)
     */
    this.getCategories = function(fromServer) {
        if (fromServer) {
            // If from server is set to true, then run code within this statement
            // Fetch the data from the API and use the below format when storing the data
            // Then the data can be parsed using the parseData function
            // The structure is a flat array with children containing a parent field with the id of the parent
        } else {
            $scope.categories = [
                {
                    "id": "1",
                    "name": "Women"
                },
                {
                    "id": "11",
                    "name": "Clothing",
                    "parent": "1"
                },
                {
                    "id": "12",
                    "name": "Bags",
                    "parent": "1"
                },
                {
                    "id": "121",
                    "name": "Backpacks",
                    "parent": "12"
                },
                {
                    "id": "122",
                    "name": "Tote Bags",
                    "parent": "12"
                },
                {
                    "id": "2",
                    "name": "Men"
                },
                {
                    "id": "21",
                    "name": "Shoes",
                    "parent": "2"
                },
                {
                    "id": "3",
                    "name": "Electrical"
                },
                {
                    "id": "4",
                    "name": "Beauty"
                }
            ];
        }
    };

    /**
     * Get a
     * @param rawData
     */
    this.parseData = function(rawData) {
        let idToObjectMap = {};
        let copyItems = angular.copy(rawData);
        let rootItems = [];

        copyItems.sort((a,b) => {
            return a.name.localeCompare(b.name);
        });

        copyItems.forEach(item => {
            let node = this.newNode(item);
            if (!item.parent) {
                rootItems.push(node);
            }
            idToObjectMap[item.id] = node;
        });

        copyItems.forEach(item => {
            if (item.parent && idToObjectMap[item.parent]) {
                if (!idToObjectMap[item.parent].children) {
                    idToObjectMap[item.parent].children = [];
                }
                idToObjectMap[item.parent].children.push(idToObjectMap[item.id]);
                idToObjectMap[item.id].parent = idToObjectMap[item.parent];
            }
        });
        this.parsedData = rootItems;
    };

    this.newNode = function(item) {
        return {
            id: item.id,
            name: item.name
        };
    };

    this.getSelectedCategories = function() {
        wchUIExt.getDefinition().then((definition) => {
            wchUIExt.getElement().then((element) => {
                if (definition.elementType === "group") {
                    if (element.value["category"].values) {
                        let categoryIds = element.value["category"].values;
                        let categories = $scope.categories.filter(item => {
                            return categoryIds.indexOf(item.id) > -1;
                        });
                        $scope.selectedCategories = categories;
                        $scope.$apply();
                    }
                } else {
                    if (element.values) {
                        let categoryIds = element.values;
                        let categories = $scope.categories.filter(item => {
                            return categoryIds.indexOf(item.id) > -1;
                        });
                        $scope.selectedCategories = categories;
                        $scope.$apply();
                    }
                }
            });
        });
    };

    this.checkIfDisabled = function() {
        wchUIExt.getDefinition().then((definition) => {
            this.isPublished = definition.disabled;
            $scope.$apply();
        });
    };

    this.toggleDropdown = function() {
        if ($scope.status.isopen) {
            wchUIExt.requestResizeFrame(200);
        } else {
            wchUIExt.requestResizeFrame(100);
        }
    };

    this.removeTag = function(item) {
        $scope.selectedCategories = $scope.selectedCategories.filter(c => c.id !== item.id);
        this.updateValues();
    };

    this.updateValues = function() {
        let categoryIds = $scope.selectedCategories.map(function(item) {
            return item.id;
        });
        // Set the value to an array of the category Ids
        wchUIExt.getDefinition().then((definition) => {
            console.log(definition);
            if (definition.elementType === "group") {
                wchUIExt.setElement({
                    elementType: "group",
                    value: {
                        "category": {
                            elementType: "text",
                            values: categoryIds
                        }
                    }
                });
            } else {
                wchUIExt.setElement({
                    elementType: "text",
                    values: categoryIds
                });
            }
        });
        wchUIExt.setValid(true);
    }
};

category.controller('categoryController', CategoryController);