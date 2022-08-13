import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';

import logo from './images/logo.jpg';
import { NewsCards, Modal } from './components';
import useStyles from './styles';

const App = () => {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: '304566301d0493fa291a8e4bafbd0a072e956eca572e1d8b807a3e2338fdd0dc/stage',
      
      
      onCommand: ({ command, articles, number }) => {
        if (command === 'newsHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'instructions') {
          setIsOpen(true);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      },
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
        <img src="data:image/jpeg;base64,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" className={classes.alanLogo} alt="" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      {!newsArticles.length ? (
        <div className={classes.footer}>
          <Typography variant="body1" component="h2">
            Created by
            <a className={classes.link} href="https://www.linkedin.com/in/kamlesh-kumar-930504196/"> kamlesh kumar</a>__ 
            <a className={classes.link} href="https://github.com/521ramborahul"> 521ramborahul</a>
          </Typography>
          <img className={classes.image} src={logo} height="50px" alt="" />
        </div>
      ) : null}
    </div>
  );
};

export default App;
