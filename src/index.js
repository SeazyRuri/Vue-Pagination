import pagination from "./vue/pagination.vue"
let list = [];
let l = 12932;
for (let i = 1; i < l; i++) {
    list.push(i);
}
new Vue({
		el: "#app",
		components:{
			pagination
		},
    data: {
        list,
        index: 1,
        pageSize: 10,
    },
    computed: {
        alist: function () {
            let that = this;
            return this.list.filter((e, index) => {
                return (
                    index + 1 >= that.index && index + 1 <= that.index - 1 + that.pageSize
                );
            });
        }
    },
    methods: {
        gotoPage: function (no) {
            this.index = parseInt((no - 1) * this.pageSize + 1)
        }
    }
})