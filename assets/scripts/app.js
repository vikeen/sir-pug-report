var BookList = React.createClass({
    render: function () {
        var bookNodes = this.props.books.map(function (book) {
            return (
                <li key={book.id} className="book-list__book">
                    <dl>
                        <dt>age_group:</dt>
                        <dd>{book.age_group}</dd>
                        <dt>author:</dt>
                        <dd>{book.author}</dd>
                        <dt>contributor:</dt>
                        <dd>{book.contributor}</dd>
                        <dt>contributor_note:</dt>
                        <dd>{book.contributor_note}</dd>
                        <dt>created_date:</dt>
                        <dd>{book.created_date}</dd>
                        <dt>description:</dt>
                        <dd>{book.description}</dd>
                        <dt>price:</dt>
                        <dd>{book.price}</dd>
                        <dt>primary_isbn10:</dt>
                        <dd>{book.primary_isbn10}</dd>
                        <dt>primary_isbn13:</dt>
                        <dd>{book.primary_isbn13}</dd>
                        <dt>publisher:</dt>
                        <dd>{book.publisher}</dd>
                        <dt>rank:</dt>
                        <dd>{book.rank}</dd>
                        <dt>title:</dt>
                        <dd>{book.title}</dd>
                        <dt>updated_date:</dt>
                        <dd>{book.updated_date}</dd>
                    </dl>
                </li>
            );
        });

        return (
            <div className="book-list">
                <ol>{bookNodes}</ol>
            </div>
        );
    }
});

var BookBox = React.createClass({
    getBookLists: function () {
        $.ajax({
            url: "http://api.nytimes.com/svc/books/v2/lists/overview.json?api-key=756ede541c7f7e8e345ede59430e5c40:10:73941104",
            dataType: 'json',
            cache: true,
            success: function (data) {
                var bookLists = data.results.lists.map(function (bookList) {
                    bookList.books = bookList.books.map(function (book) {
                        book.id = bookList.list_id + "-" + book.rank;
                        return book;
                    });
                    return bookList;
                });

                this.setState({bookLists: bookLists});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function () {
        return {bookLists: []};
    },
    componentDidMount: function () {
        this.getBookLists();
    },
    render: function () {
        var bookListsNodes = this.state.bookLists.map(function (bookList) {

            return (
                <li key={bookList.list_id} className="book-list">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h2>{bookList.display_name}</h2>
                        </div>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-xs-6">
                                    <img className="book-list__top-seller-image" alt={bookList.books[0].title} src={bookList.list_image}/>
                                </div>
                                <div className="col-xs-6">
                                    <BookList books={bookList.books}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            );

        });
        return (
            <div className="book-box">
                <h1>Books Lists</h1>
                <ul>
                    {bookListsNodes}
                </ul>
            </div>
        );
    }
});


var Header = React.createClass({
    render: function () {
        return (
            <header>
                <div className="container">
                    <nav className="navbar navbar-default">
                        <div className="navbar-header">
                            <h1>
                                <a className="navbar-brand" href="/">
                                    <img src="/assets/images/sir-pug.jpg" alt="sir pug report logo"/>
                                    <span className="title">Sir Pug Report</span>
                                </a>
                            </h1>
                        </div>
                    </nav>
                </div>
            </header>
        );
    }
});

// Movie Review api key - 8a8dcfcf13610daa3ed1a94557899e85:6:73941104
var App = React.createClass({
    render: function () {
        return (
            <div className="app">
                <Header/>
                <div className="content container" role="main">
                    <BookBox/>
                </div>
            </div>
        );
    }
});
ReactDOM.render(
    <App />,
    document.getElementById('content')
);