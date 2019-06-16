var list = [{
    value : "吃饭",
    checked : true
}, {
    value: "睡觉",
    checked: false
}, {
    value: "打豆豆",
    checked: false
}];
var vm = new Vue({
    el: ".main",
    data : {
        list: list,
        inputValue: "",
        editingtodo : ""
    },
    methods: {
        addTodo(){
            this.list.push({
                value: this.inputValue,
                checked:false
            });
            this.inputValue = "";
        },
        deleteTodo(todo) {
            var index = this.list.indexOf(todo);
            this.list.splice(index,1);
        },
        editTodo(todo) {
            this.editingtodo = todo;
        }
    },
    drectives:{
        focus: {
            updata(el,binding) {
                console.log(111);
            }
        }
    }
});