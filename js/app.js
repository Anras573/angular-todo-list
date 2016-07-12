var todoListApp = angular.module('todoListApp', []);

todoListApp.controller('TodoController', ['$scope', 'orderByFilter', 'TodoFactory', function($scope, orderBy, TodoFactory) {
  var todoList = this;

  $scope.list = TodoFactory.getList();

  $scope.add = function(){
    if(todoList.text){
      TodoFactory.add({ text: todoList.text, done: false });
      todoList.text = '';
    }
  }

  $scope.delete = function(todo) {
    TodoFactory.delete(todo);
  }
}]);

todoListApp.factory('TodoFactory', function(){
  var list = [
    { text: 'You can add/edit/remove items to a list', done: true },
    { text: 'You can mark items as "done"', done: true },
    { text: 'You can filter the list by "all", "active" and "done"', done: true },
    { text: 'The list is sorted by "done" status (when filtered by "all")', done: true },
    { text: 'The app must use at least one directive written by you (preferably one that manipulates the DOM)', done: true },
    { text: 'OPTIONAL: Instead of sorting by "done" status, implement drag`n`drop sorting of items', done: false },
    { text: 'Deliver the app', done: false }
  ];

  return {
    add: function(todo) {
      list.push(todo);
    },
    getList: function() {
      return list;
    },
    delete: function(todo) {
      var index = list.indexOf(todo);
      list.splice(index, 1);
    }
  };
});

todoListApp.directive('todoItem', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/todo_item.html'
  };
});

todoListApp.directive('addTodo', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/form.html'
  }
});

todoListApp.directive('editTodo', function() {
  function link($scope, $element, $attrs) {

    $element.on('dblclick', toggleEdit);
    $element.on('keyup', function(event) {
      var keyCode = event.which || event.keyCode;

      if(keyCode == 13 && $scope.todo.text){
          toggleEdit();
      }
      event.preventDefault();
    });

    function toggleEdit() {
      var edit_class = 'editing';
      elem = $element[0];

      if (elem.classList) {
        elem.classList.toggle(edit_class);
      } else {
        var classList = elem.className.split(' ');
        var existingIndex = classList.indexOf(edit_class);

        if (existingIndex >= 0){
          classList.splice(existingIndex, 1);
        } else {
          classList.push(edit_class);
        }

        elem.className = classList.join(' ');
      }
    };

  }

  return {
    restrict: 'A',
    link: link
  };
});
