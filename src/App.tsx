

import FetchingData from './FetchingData'


function App() {

  return (
    <div className="container mx-auto p-10">
      <a href="https://github.com/akremsalhi/react-rest-api"><img loading="lazy" width="149" height="149" src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149" className="attachment-full size-full absolute top-0 right-0" alt="Fork me on GitHub" data-recalc-dims="1"/></a>
      <div className="grid grid-cols-1 gap-y-8">
        <FetchingData/>
      </div>
    </div>
  );
}

export default App;
