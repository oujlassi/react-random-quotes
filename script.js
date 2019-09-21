'use strict';

const e = React.createElement;


class RandomQuotesMachine extends React.Component {

  constructor(props) {
    super(props);
    this.state = {authorIndex: 0, 
                  error: null,
                  isLoaded: false,
                  quotesStore: [{author: "", quotes: []}]
                };
    this.handleNewQuoteClick = this.handleNewQuoteClick.bind(this);
  }
  handleNewQuoteClick() {
    this.setState({authorIndex: Math.floor(Math.random() * this.state.quotesStore.length)});
  }
  componentDidMount() {
    fetch("https://raw.githubusercontent.com/oujlassi/json-quotes/master/quotes-by-author.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            quotesStore: result.quotesStore
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

render(){
    let quoteIndex = Math.floor(Math.random() * this.state.quotesStore[this.state.authorIndex].quotes.length);
    let selectedAuthor = this.state.quotesStore[this.state.authorIndex].author;
    let selectedQuote = this.state.quotesStore[this.state.authorIndex].quotes[quoteIndex];
    let href = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="${selectedQuote}"${selectedAuthor}` ;

  const { authorIndex, error, isLoaded, quotesStore } = this.state;
  if (error) {
    return e("div", null, "Error: " + error.message);
  } else if (!isLoaded) {
    return e("div", null, "is loading");
  } else {
    return e(React.Fragment, null, e("span", {id: "quote-left", className:"fa fa-quote-left"}, null),
                                   e("span", {id : "text"}, selectedQuote), 
                                   e("div", {id: "author"}, "-" + selectedAuthor),
                                   e("a", {href: href, target: "_blank"}, 
                                     e("button", {id: "tweet-quote", className: "fab fa-twitter btn btn-info "}, null)
                                    ),
                                     e("button", {id: "new-quote", onClick: this.handleNewQuoteClick, className: "btn btn-info"}, e("span", {className: "fas fa-angle-double-right "},null))
            );
  }

}
}


const domContainer = document.querySelector('#quote-box');
ReactDOM.render(e(RandomQuotesMachine), domContainer);
