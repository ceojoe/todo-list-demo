window.addEventListener('load', function() {
  var TodoListModel = function() {
    this.todos = [];
    this.listeners = [];
    this.nextAvailableId = 0;
    this.addListner = function(listener) {
      this.listeners.push(listener);
    }
    this.removeListner = function(listener) {
      var index = this.listeners.indexOf(listener);
      if (index !== -1) {
        this.listeners.slice(index, 1);
      }
    }
    this.addItem = function(str) {
      console.log('add item');
      var item = {
        id: this.nextAvailableId,
        text: str
      };
      this.todos.push(item);
      var event = {
        type: 'ITEM_ADDED',
        data: {
          item: item
        }
      };
      this.notify(event);
    }
    this.removeItem = function(id) {
      _.find(this.todos, function(item) {
        return item.id === id;
      });
      var event = {
        type: 'ITEM_REMOVED',
        data: {
          id: id
        }
      };
      this.notify(event);
    }
    this.notify = function (event) {
      console.log('notify');
      _.each(this.listeners, function(listener) {
        listener.update(event);
      });
    }
  };

  var TodoListControl = function(model) {
    this.hostElement = document.getElementById('todos');
    this.template = document.getElementById('todo-item-template');
    this.model = model;
    this.update = function(event) {
      console.log('update');
      if (event.type === 'ITEM_ADDED') {
        console.log('item added');
        var itemDiv = document.importNode(this.template.content, true);
        itemDiv.id = 'item-' + event.data.item.id;
        var textSpan = itemDiv.firstChild;
        textSpan.textContent = event.data.item.text;
        this.hostElement.appendChild(itemDiv);
      }
      if (event.type === 'ITEM_REMOVED') {
        console.log('item removed');
        var itemDivId = 'item-' + event.data.id;
        var itemDiv = document.getElementById(itemDivId);
        hostElement.removeChild(itemDiv);
      }
    }
    this.model.addListner(this);
  };

  var model = new TodoListModel()
  var control = new TodoListControl(model);

  var input = document.getElementById('input-new-item');
  input.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
      model.addItem(input.value);
    }
  });

});