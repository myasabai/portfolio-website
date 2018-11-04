
const model = {
    apiUrl : 'https://www.googleapis.com/books/v1/volumes', 
    keyword : 'javascript',
    currentBook: {},
    books: [],
    startIndex : 0,
    totalAvailableBooks : 0,
    hasMoreBook : true,
    itemPerPage : 10,
    nextStartIndex : function(){
        return model.startIndex + model.itemPerPage;
    }

}

const controller = {
    init: function () {
        this.retrieveBookFromAPI();
        bookView.init();
        bookListView.init();
    },
    retrieveBookFromAPI: function () {
        console.log(model.startIndex);
        fetch(`${model.apiUrl}?q=${model.keyword}&startIndex=${model.startIndex}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (books) {  
                controller.clearBook();             
                model.books = model.books.concat(books.items);
                model.currentBook = books.items[0];

                if(books.totalItems < model.nextStartIndex()){
                    model.hasMoreBook = false;
                }
                else{
                    model.startIndex = model.nextStartIndex();
                }

                bookListView.render();
                bookView.render();
                bookSearchView.init();
                
            });
    },
    getBooks: function () {
        return model.books;
    },
    hasMoreBook : function(){
        return model.hasMoreBook;
    },
    getCurrentBook: function () {
        return model.currentBook;
    },
    setCurrentBook: function (book) {
        model.currentBook = book;
        bookView.render();
    },
    searchBook:function(bkname){
        model.keyword = bkname;
        model.startIndex = 0;
        this.retrieveBookFromAPI();
    },
    clearBook:function(){
        model.books = [];
       // bookListView.clear();
    },
    viewMore:function(){
        if(model.hasMoreBook){
            controller.retrieveBookFromAPI();
        }
        else{
            alert('No more books!');
        }
    }
}

const bookListView = {
    init: function () {
        this.bookListElem = document.getElementById('bookList');

        this.viewmorebtn = document.getElementById('btnViewMore');
        this.viewmorebtn.addEventListener('click',function(){
            controller.viewMore();
        });


    },
    render: function () {
        this.books = controller.getBooks();       
        this.books.forEach(function(book){            
            bookListView.bookListElem.appendChild(bookListView.buildBook(book));
        });        
    },
    buildBook : function(book){
        const bookDiv = document.createElement('div');
        console.log(book);
        bookDiv.classList.add('book');
        bookDiv.innerHTML = `
        <div class="content">
            <img src=${book.volumeInfo.imageLinks.smallThumbnail} alt="${book.volumeInfo.title}">
        </div>
        <div class="title">${book.volumeInfo.title}</div>
        `;
        bookDiv.addEventListener('click',function(){
            controller.setCurrentBook(book);
        });
        return bookDiv;
    },
    // clear:function(){
    //     model.books 
    // }
}

const bookView = {
    init: function(){
        this.viewport = document.getElementById('viewerCanvas');
        google.books.load();
        google.books.setOnLoadCallback(function(){                        
            bookView.render();    
        });
        
    },
    render: function () {
        console.log(controller.getCurrentBook());       
        const viewer = new google.books.DefaultViewer(bookView.viewport);
        const currentBook = controller.getCurrentBook(); 
        viewer.load(currentBook.id);
    },

}

const bookSearchView = {
    init:function(){
        this.textbox = document.getElementById("txtSearch");
        this.btnclick = document.getElementById("btnSearch");

        this.btnclick.addEventListener('click',function(){
            var bookname = bookSearchView.textbox.value;
            console.log(bookname);
            controller.searchBook(bookname);
            bookListView.render();
        });
    },

}


controller.init();
