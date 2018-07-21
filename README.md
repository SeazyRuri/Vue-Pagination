# Vue-Pagination
A simple pagination tool based on Vue with webpack
## Usage
index.js

    import pagination from "/path/to/pagination.vue"
    new Vue({
      el:"#app",
      data:{
        index:1,/* The position of the first data in this page among all data (start from the digit 1). */
                /* For example ,you have 10 data per page. The index of the first page is 1, and index  */
                /* of the second page is 11。
        pageSize:10,// The amount of data each page have
        count:100,// The amount of All Your Data 
      }
      methods:{
        gotoPage:function(no){
          //Your code for jumping to page of no
          //No is the page of No
        }
      }
    })

index.html

    ...
    <div>
		<pagination @gotopage="gotoPage" :index="index" :count="count" :page-size="pageSize"></pagination>
	</div>
    ...
    
